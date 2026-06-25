from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.base import clone
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    top_k_accuracy_score,
)
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.naive_bayes import BernoulliNB
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from xgboost import XGBClassifier


PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_PATH = (
    PROJECT_ROOT
    / "ml_training"
    / "data"
    / "processed"
    / "dataset_ml_vocai.csv"
)

MODELS_DIR = PROJECT_ROOT / "ml_training" / "outputs" / "models"
METRICS_DIR = PROJECT_ROOT / "ml_training" / "outputs" / "metrics"
CONFUSION_DIR = PROJECT_ROOT / "ml_training" / "outputs" / "confusion_matrices"

MODELS_DIR.mkdir(parents=True, exist_ok=True)
METRICS_DIR.mkdir(parents=True, exist_ok=True)
CONFUSION_DIR.mkdir(parents=True, exist_ok=True)

TARGET_COLUMN = "area_objetivo"
DROP_GENDER_FROM_MODEL = True


def load_dataset():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"No se encontró el dataset procesado en: {DATASET_PATH}. "
            "Primero ejecuta prepare_dataset.py"
        )

    df = pd.read_csv(DATASET_PATH)
    df = df.drop(columns=["orientacion_previa"], errors="ignore")

    if TARGET_COLUMN not in df.columns:
        raise ValueError(f"No existe la columna objetivo: {TARGET_COLUMN}")

    return df


def prepare_features_and_target(df: pd.DataFrame):
    X = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN]

    if DROP_GENDER_FROM_MODEL:
        gender_columns = [
            column for column in X.columns
            if column.startswith("genero_")
        ]
        X = X.drop(columns=gender_columns)

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    joblib.dump(label_encoder, MODELS_DIR / "label_encoder.joblib")
    joblib.dump(list(X.columns), MODELS_DIR / "feature_names.joblib")

    print(f"Columnas utilizadas para entrenamiento: {X.shape[1]}")
    print(f"Clases: {list(label_encoder.classes_)}")
    print(
        "Nombres de variables guardados en: "
        f"{MODELS_DIR / 'feature_names.joblib'}"
    )

    return X, y_encoded, label_encoder


def build_models():
    return {
        "svm": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    SVC(
                        kernel="rbf",
                        class_weight="balanced",
                        probability=True,
                        random_state=42,
                    ),
                ),
            ]
        ),
        "naive_bayes": BernoulliNB(),
        "random_forest": RandomForestClassifier(
            n_estimators=300,
            max_depth=None,
            class_weight="balanced",
            random_state=42,
        ),
        "xgboost": XGBClassifier(
            n_estimators=250,
            max_depth=3,
            learning_rate=0.05,
            subsample=0.9,
            colsample_bytree=0.9,
            objective="multi:softprob",
            eval_metric="mlogloss",
            random_state=42,
        ),
        "mlp": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    MLPClassifier(
                        hidden_layer_sizes=(64, 32),
                        activation="relu",
                        solver="adam",
                        alpha=0.001,
                        max_iter=1200,
                        random_state=42,
                    ),
                ),
            ]
        ),
    }


def get_cv_strategy(y_encoded):
    class_counts = pd.Series(y_encoded).value_counts()
    min_class_count = int(class_counts.min())

    n_splits = min(5, min_class_count)

    if n_splits < 2:
        raise ValueError(
            "No hay suficientes datos por clase para aplicar validación cruzada."
        )

    return StratifiedKFold(
        n_splits=n_splits,
        shuffle=True,
        random_state=42,
    )


def calculate_top_2_accuracy(model, X, y_encoded, cv):
    try:
        probabilities = cross_val_predict(
            clone(model),
            X,
            y_encoded,
            cv=cv,
            method="predict_proba",
        )

        labels = list(range(len(set(y_encoded))))

        return top_k_accuracy_score(
            y_encoded,
            probabilities,
            k=2,
            labels=labels,
        )
    except Exception as error:
        print(f"No se pudo calcular Top-2 Accuracy: {error}")
        return 0.0


def save_confusion_matrix(model_name, y_true, y_pred, class_names):
    matrix = confusion_matrix(y_true, y_pred)

    plt.figure(figsize=(13, 9))
    plt.imshow(matrix)
    plt.title(f"Matriz de confusión - {model_name}")
    plt.xlabel("Clase predicha")
    plt.ylabel("Clase real")
    plt.xticks(
        ticks=range(len(class_names)),
        labels=class_names,
        rotation=90,
    )
    plt.yticks(
        ticks=range(len(class_names)),
        labels=class_names,
    )

    for row_index in range(matrix.shape[0]):
        for column_index in range(matrix.shape[1]):
            plt.text(
                column_index,
                row_index,
                str(matrix[row_index, column_index]),
                ha="center",
                va="center",
                color="black",
            )

    plt.tight_layout()

    output_path = CONFUSION_DIR / f"confusion_matrix_{model_name}.png"
    plt.savefig(output_path, dpi=180)
    plt.close()

    print(f"Matriz de confusión guardada en: {output_path}")


def evaluate_model(model_name, model, X, y_encoded, label_encoder, cv):
    print(f"Modelo: {model_name}")
    print(f"Validación cruzada estratificada con {cv.get_n_splits()} folds")

    y_pred = cross_val_predict(
        clone(model),
        X,
        y_encoded,
        cv=cv,
    )

    top_2_accuracy = calculate_top_2_accuracy(model, X, y_encoded, cv)

    metrics = {
        "model": model_name,
        "accuracy": accuracy_score(y_encoded, y_pred),
        "precision_macro": precision_score(
            y_encoded,
            y_pred,
            average="macro",
            zero_division=0,
        ),
        "recall_macro": recall_score(
            y_encoded,
            y_pred,
            average="macro",
            zero_division=0,
        ),
        "f1_macro": f1_score(
            y_encoded,
            y_pred,
            average="macro",
            zero_division=0,
        ),
        "top_2_accuracy": top_2_accuracy,
    }

    print(metrics)

    report = classification_report(
        y_encoded,
        y_pred,
        target_names=label_encoder.classes_,
        output_dict=True,
        zero_division=0,
    )

    report_path = METRICS_DIR / f"classification_report_{model_name}.json"

    with report_path.open("w", encoding="utf-8") as file:
        json.dump(report, file, ensure_ascii=False, indent=2)

    save_confusion_matrix(
        model_name=model_name,
        y_true=y_encoded,
        y_pred=y_pred,
        class_names=label_encoder.classes_,
    )

    final_model = clone(model)
    final_model.fit(X, y_encoded)

    model_path = MODELS_DIR / f"{model_name}_model.joblib"
    joblib.dump(final_model, model_path)

    print(f"Modelo guardado en: {model_path}")
    print("-" * 60)

    return metrics


def main():
    df = load_dataset()
    X, y_encoded, label_encoder = prepare_features_and_target(df)

    cv = get_cv_strategy(y_encoded)
    models = build_models()

    metrics_results = []

    print("\nEntrenando y evaluando modelos...\n")

    for model_name, model in models.items():
        metrics = evaluate_model(
            model_name=model_name,
            model=model,
            X=X,
            y_encoded=y_encoded,
            label_encoder=label_encoder,
            cv=cv,
        )
        metrics_results.append(metrics)

    metrics_df = pd.DataFrame(metrics_results)
    metrics_df = metrics_df.sort_values(
        by=["f1_macro", "top_2_accuracy", "accuracy"],
        ascending=False,
    )

    metrics_path = METRICS_DIR / "model_metrics_summary.csv"
    metrics_df.to_csv(metrics_path, index=False, encoding="utf-8-sig")

    print("\nResumen de métricas:")
    print(metrics_df)
    print(f"\nMétricas guardadas en: {metrics_path}")


if __name__ == "__main__":
    main()