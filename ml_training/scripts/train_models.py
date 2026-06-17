from pathlib import Path
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.svm import SVC

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline

from xgboost import XGBClassifier


BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "data" / "processed" / "dataset_ml_vocai.csv"

OUTPUT_DIR = BASE_DIR / "outputs"
MODELS_DIR = OUTPUT_DIR / "models"
METRICS_DIR = OUTPUT_DIR / "metrics"
CONFUSION_DIR = OUTPUT_DIR / "confusion_matrices"

TARGET_COLUMN = "area_objetivo"

# Para una versión más prudente, el género se conserva para análisis descriptivo,
# pero no se usa como entrada principal del modelo.
DROP_GENDER_FROM_MODEL = True


def create_output_dirs():
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    METRICS_DIR.mkdir(parents=True, exist_ok=True)
    CONFUSION_DIR.mkdir(parents=True, exist_ok=True)


def load_dataset():
    df = pd.read_csv(DATASET_PATH)

    if DROP_GENDER_FROM_MODEL:
        gender_cols = [col for col in df.columns if col.startswith("genero_")]
        df = df.drop(columns=gender_cols, errors="ignore")

    X = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN]

    return X, y


def get_models(num_classes: int):
    models = {
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
        "random_forest": RandomForestClassifier(
            n_estimators=200,
            max_depth=5,
            random_state=42,
            class_weight="balanced",
        ),

        "xgboost": XGBClassifier(
            objective="multi:softprob",
            num_class=num_classes,
            n_estimators=120,
            max_depth=3,
            learning_rate=0.05,
            subsample=0.9,
            colsample_bytree=0.9,
            eval_metric="mlogloss",
            random_state=42,
        ),

        "mlp": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    MLPClassifier(
                        hidden_layer_sizes=(32, 16),
                        activation="relu",
                        solver="adam",
                        alpha=0.01,
                        max_iter=1500,
                        random_state=42,
                    ),
                ),
            ]
        ),
    }

    return models


def evaluate_model(model_name, model, X, y_encoded, class_names):
    """
    Evalúa el modelo con validación cruzada estratificada.
    El número de folds se ajusta automáticamente según la clase con menor cantidad de registros.
    """
    min_class_count = pd.Series(y_encoded).value_counts().min()
    n_splits = min(5, min_class_count)

    print(f"Validación cruzada estratificada con {n_splits} folds")

    cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)

    y_pred = cross_val_predict(model, X, y_encoded, cv=cv)

    metrics = {
        "model": model_name,
        "accuracy": accuracy_score(y_encoded, y_pred),
        "precision_macro": precision_score(
            y_encoded, y_pred, average="macro", zero_division=0
        ),
        "recall_macro": recall_score(
            y_encoded, y_pred, average="macro", zero_division=0
        ),
        "f1_macro": f1_score(
            y_encoded, y_pred, average="macro", zero_division=0
        ),
    }

    report = classification_report(
        y_encoded,
        y_pred,
        target_names=class_names,
        zero_division=0,
        output_dict=True,
    )

    cm = confusion_matrix(y_encoded, y_pred)

    return metrics, report, cm


def save_confusion_matrix(model_name, cm, class_names):
    cm_df = pd.DataFrame(cm, index=class_names, columns=class_names)
    cm_csv_path = CONFUSION_DIR / f"confusion_matrix_{model_name}.csv"
    cm_df.to_csv(cm_csv_path, encoding="utf-8-sig")

    plt.figure(figsize=(10, 8))
    plt.imshow(cm)
    plt.title(f"Matriz de confusión - {model_name}")
    plt.xlabel("Clase predicha")
    plt.ylabel("Clase real")
    plt.xticks(ticks=np.arange(len(class_names)), labels=class_names, rotation=90)
    plt.yticks(ticks=np.arange(len(class_names)), labels=class_names)

    for i in range(len(class_names)):
        for j in range(len(class_names)):
            plt.text(j, i, cm[i, j], ha="center", va="center")

    plt.tight_layout()
    png_path = CONFUSION_DIR / f"confusion_matrix_{model_name}.png"
    plt.savefig(png_path, dpi=300)
    plt.close()


def train_and_save_final_model(model_name, model, X, y_encoded):
    """
    Entrena el modelo final con todos los datos disponibles
    y lo guarda para su posterior integración con FastAPI.
    """
    model.fit(X, y_encoded)

    model_path = MODELS_DIR / f"{model_name}_model.joblib"
    joblib.dump(model, model_path)

    return model_path


def save_feature_names(X):
    """
    Guarda los nombres de columnas utilizados durante el entrenamiento.
    Esto será necesario para que FastAPI envíe las variables en el mismo orden.
    """
    feature_names_path = MODELS_DIR / "feature_names.joblib"
    joblib.dump(list(X.columns), feature_names_path)

    return feature_names_path


def main():
    create_output_dirs()

    X, y = load_dataset()

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    class_names = list(label_encoder.classes_)

    joblib.dump(label_encoder, MODELS_DIR / "label_encoder.joblib")
    feature_names_path = save_feature_names(X)

    models = get_models(num_classes=len(class_names))

    all_metrics = []

    print("Columnas utilizadas para entrenamiento:", X.shape[1])
    print("Clases:", class_names)
    print(f"Nombres de variables guardados en: {feature_names_path}")
    print("\nEntrenando y evaluando modelos...\n")

    for model_name, model in models.items():
        print(f"Modelo: {model_name}")

        metrics, report, cm = evaluate_model(
            model_name,
            model,
            X,
            y_encoded,
            class_names,
        )

        all_metrics.append(metrics)

        report_path = METRICS_DIR / f"classification_report_{model_name}.json"
        with open(report_path, "w", encoding="utf-8") as file:
            json.dump(report, file, ensure_ascii=False, indent=4)

        save_confusion_matrix(model_name, cm, class_names)

        model_path = train_and_save_final_model(
            model_name,
            model,
            X,
            y_encoded,
        )

        print(metrics)
        print(f"Modelo guardado en: {model_path}")
        print("-" * 60)

    metrics_df = pd.DataFrame(all_metrics)
    metrics_df = metrics_df.sort_values(by="f1_macro", ascending=False)

    metrics_path = METRICS_DIR / "model_metrics_summary.csv"
    metrics_df.to_csv(metrics_path, index=False, encoding="utf-8-sig")

    print("\nResumen de métricas:")
    print(metrics_df)

    print(f"\nMétricas guardadas en: {metrics_path}")


if __name__ == "__main__":
    main()