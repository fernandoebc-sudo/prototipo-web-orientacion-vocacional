from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
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
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder, StandardScaler


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

    return X, y_encoded, label_encoder


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
            model,
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


def build_mlp_candidates():
    candidates = []

    hidden_layer_options = [
        (16,),
        (32,),
        (64,),
        (32, 16),
        (64, 32),
        (128, 64),
        (64, 32, 16),
    ]

    alpha_options = [
        0.0001,
        0.001,
        0.01,
    ]

    activation_options = [
        "relu",
        "tanh",
    ]

    learning_rate_options = [
        0.001,
        0.0005,
    ]

    for hidden_layers in hidden_layer_options:
        for alpha in alpha_options:
            for activation in activation_options:
                for learning_rate in learning_rate_options:
                    candidate_name = (
                        f"mlp_layers_{'_'.join(str(layer) for layer in hidden_layers)}"
                        f"_alpha_{str(alpha).replace('.', '_')}"
                        f"_{activation}"
                        f"_lr_{str(learning_rate).replace('.', '_')}"
                    )

                    model = Pipeline(
                        steps=[
                            ("scaler", StandardScaler()),
                            (
                                "model",
                                MLPClassifier(
                                    hidden_layer_sizes=hidden_layers,
                                    activation=activation,
                                    solver="adam",
                                    alpha=alpha,
                                    learning_rate_init=learning_rate,
                                    max_iter=1500,
                                    early_stopping=True,
                                    validation_fraction=0.15,
                                    n_iter_no_change=25,
                                    random_state=42,
                                ),
                            ),
                        ]
                    )

                    candidates.append(
                        {
                            "name": candidate_name,
                            "hidden_layers": hidden_layers,
                            "alpha": alpha,
                            "activation": activation,
                            "learning_rate_init": learning_rate,
                            "model": model,
                        }
                    )

    return candidates


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

    output_path = CONFUSION_DIR / f"confusion_matrix_best_mlp_tuned.png"
    plt.savefig(output_path, dpi=180)
    plt.close()

    print(f"Matriz de confusión guardada en: {output_path}")


def evaluate_candidate(candidate, X, y_encoded, cv):
    model = candidate["model"]

    y_pred = cross_val_predict(
        model,
        X,
        y_encoded,
        cv=cv,
    )

    top_2_accuracy = calculate_top_2_accuracy(
        model,
        X,
        y_encoded,
        cv,
    )

    metrics = {
        "model": candidate["name"],
        "hidden_layers": str(candidate["hidden_layers"]),
        "alpha": candidate["alpha"],
        "activation": candidate["activation"],
        "learning_rate_init": candidate["learning_rate_init"],
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

    return metrics, y_pred


def main():
    df = load_dataset()
    X, y_encoded, label_encoder = prepare_features_and_target(df)
    cv = get_cv_strategy(y_encoded)

    print("Búsqueda experimental de configuraciones MLP")
    print(f"Registros utilizados: {len(X)}")
    print(f"Columnas utilizadas: {X.shape[1]}")
    print(f"Clases: {list(label_encoder.classes_)}")
    print(f"Validación cruzada estratificada con {cv.get_n_splits()} folds")
    print("-" * 70)

    candidates = build_mlp_candidates()
    results = []

    best_metrics = None
    best_candidate = None
    best_y_pred = None

    for index, candidate in enumerate(candidates, start=1):
        print(f"Evaluando {index}/{len(candidates)}: {candidate['name']}")

        metrics, y_pred = evaluate_candidate(
            candidate=candidate,
            X=X,
            y_encoded=y_encoded,
            cv=cv,
        )

        print(
            {
                "accuracy": metrics["accuracy"],
                "f1_macro": metrics["f1_macro"],
                "top_2_accuracy": metrics["top_2_accuracy"],
            }
        )

        results.append(metrics)

        if best_metrics is None:
            best_metrics = metrics
            best_candidate = candidate
            best_y_pred = y_pred
            continue

        current_score = (
            metrics["f1_macro"],
            metrics["top_2_accuracy"],
            metrics["accuracy"],
        )

        best_score = (
            best_metrics["f1_macro"],
            best_metrics["top_2_accuracy"],
            best_metrics["accuracy"],
        )

        if current_score > best_score:
            best_metrics = metrics
            best_candidate = candidate
            best_y_pred = y_pred

    results_df = pd.DataFrame(results)
    results_df = results_df.sort_values(
        by=["f1_macro", "top_2_accuracy", "accuracy"],
        ascending=False,
    )

    results_path = METRICS_DIR / "mlp_tuning_results.csv"
    results_df.to_csv(results_path, index=False, encoding="utf-8-sig")

    print("\nMejores configuraciones MLP:")
    print(results_df.head(10))
    print(f"\nResultados guardados en: {results_path}")

    if best_candidate is None or best_metrics is None or best_y_pred is None:
        print("No se encontró una configuración válida.")
        return

    print("\nMejor configuración encontrada:")
    print(best_metrics)

    report = classification_report(
        y_encoded,
        best_y_pred,
        target_names=label_encoder.classes_,
        output_dict=True,
        zero_division=0,
    )

    report_path = METRICS_DIR / "classification_report_best_mlp_tuned.json"

    with report_path.open("w", encoding="utf-8") as file:
        json.dump(report, file, ensure_ascii=False, indent=2)

    save_confusion_matrix(
        model_name="best_mlp_tuned",
        y_true=y_encoded,
        y_pred=best_y_pred,
        class_names=label_encoder.classes_,
    )

    final_model = best_candidate["model"]
    final_model.fit(X, y_encoded)

    best_model_path = MODELS_DIR / "mlp_tuned_model.joblib"
    joblib.dump(final_model, best_model_path)

    metadata = {
        "model": "mlp_tuned",
        "hidden_layers": best_candidate["hidden_layers"],
        "alpha": best_candidate["alpha"],
        "activation": best_candidate["activation"],
        "learning_rate_init": best_candidate["learning_rate_init"],
        "metrics": best_metrics,
    }

    metadata_path = METRICS_DIR / "mlp_tuning_best_config.json"

    with metadata_path.open("w", encoding="utf-8") as file:
        json.dump(metadata, file, ensure_ascii=False, indent=2)

    print(f"Mejor MLP guardado en: {best_model_path}")
    print(f"Configuración guardada en: {metadata_path}")


if __name__ == "__main__":
    main()