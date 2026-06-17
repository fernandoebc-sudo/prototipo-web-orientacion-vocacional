from pathlib import Path
import warnings

import pandas as pd

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import BernoulliNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier

from xgboost import XGBClassifier


warnings.filterwarnings("ignore")


BASE_DIR = Path(__file__).resolve().parents[1]

DATASET_PATH = BASE_DIR / "data" / "processed" / "dataset_ml_vocai.csv"
OUTPUT_DIR = BASE_DIR / "outputs" / "metrics"
OUTPUT_PATH = OUTPUT_DIR / "model_comparison_extra.csv"

TARGET_COLUMN = "area_objetivo"

# Para mantener coherencia con el entrenamiento oficial:
# el género no se usa como entrada principal del modelo.
DROP_GENDER_FROM_MODEL = True


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
        "logistic_regression": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    LogisticRegression(
                        max_iter=2000,
                        class_weight="balanced",
                        random_state=42,
                    ),
                ),
            ]
        ),

        "naive_bayes": BernoulliNB(),

        "knn": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    KNeighborsClassifier(
                        n_neighbors=5,
                    ),
                ),
            ]
        ),

        "svm": Pipeline(
            steps=[
                ("scaler", StandardScaler()),
                (
                    "model",
                    SVC(
                        kernel="rbf",
                        class_weight="balanced",
                        random_state=42,
                    ),
                ),
            ]
        ),

        "decision_tree": DecisionTreeClassifier(
            max_depth=5,
            class_weight="balanced",
            random_state=42,
        ),

        "random_forest": RandomForestClassifier(
            n_estimators=200,
            max_depth=5,
            class_weight="balanced",
            random_state=42,
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


def evaluate_model(model_name, model, X, y_encoded):
    min_class_count = pd.Series(y_encoded).value_counts().min()
    n_splits = min(5, min_class_count)

    cv = StratifiedKFold(
        n_splits=n_splits,
        shuffle=True,
        random_state=42,
    )

    y_pred = cross_val_predict(
        model,
        X,
        y_encoded,
        cv=cv,
    )

    metrics = {
        "model": model_name,
        "cv_folds": n_splits,
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
    }

    return metrics


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    X, y = load_dataset()

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    class_names = list(label_encoder.classes_)
    models = get_models(num_classes=len(class_names))

    print("Comparación exploratoria de modelos")
    print("Columnas utilizadas:", X.shape[1])
    print("Registros utilizados:", X.shape[0])
    print("Clases:", class_names)
    print("-" * 70)

    results = []

    for model_name, model in models.items():
        print(f"Evaluando: {model_name}")

        metrics = evaluate_model(
            model_name=model_name,
            model=model,
            X=X,
            y_encoded=y_encoded,
        )

        results.append(metrics)
        print(metrics)
        print("-" * 70)

    results_df = pd.DataFrame(results)
    results_df = results_df.sort_values(by="f1_macro", ascending=False)

    results_df.to_csv(
        OUTPUT_PATH,
        index=False,
        encoding="utf-8-sig",
    )

    print("\nResumen comparativo:")
    print(results_df)

    print(f"\nArchivo guardado en: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()