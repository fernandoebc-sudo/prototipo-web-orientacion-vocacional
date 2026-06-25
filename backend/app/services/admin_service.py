from pathlib import Path
import csv
import json
from typing import Any

from sqlalchemy import desc, func, select
from sqlalchemy.orm import Session

from app.models.recommendation_result import RecommendationResult


BASE_DIR = Path(__file__).resolve().parents[3]
BACKEND_DIR = Path(__file__).resolve().parents[2]

METRICS_PATH = (
    BASE_DIR
    / "ml_training"
    / "outputs"
    / "metrics"
    / "model_metrics_summary.csv"
)

METADATA_PATH = (
    BACKEND_DIR
    / "app"
    / "ml"
    / "models"
    / "model_metadata.json"
)


def get_database_records(db: Session):
    results = db.scalars(
        select(RecommendationResult)
        .order_by(RecommendationResult.created_at.desc())
    ).all()

    return {
        "status": "ok",
        "message": "Registros obtenidos desde la base de datos",
        "records": [
            {
                "id": result.id,
                "recommended_area": result.recommended_area,
                "affinity": result.affinity,
                "created_at": result.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "model_1_result": result.model_1_result,
                "model_2_result": result.model_2_result,
            }
            for result in results
        ],
    }


def get_database_stats(db: Session):
    total_records = db.scalar(
        select(func.count(RecommendationResult.id))
    ) or 0

    average_affinity = db.scalar(
        select(func.avg(RecommendationResult.affinity))
    ) or 0

    most_recommended_area_row = db.execute(
        select(
            RecommendationResult.recommended_area,
            func.count(RecommendationResult.id).label("total"),
        )
        .group_by(RecommendationResult.recommended_area)
        .order_by(desc("total"))
        .limit(1)
    ).first()

    most_recommended_area = (
        most_recommended_area_row[0]
        if most_recommended_area_row
        else "Sin registros"
    )

    return {
        "status": "ok",
        "total_records": total_records,
        "most_recommended_area": most_recommended_area,
        "average_affinity": round(float(average_affinity)),
    }


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _normalize_model_name(value: str) -> str:
    return (
        value.strip()
        .lower()
        .replace(" ", "_")
        .replace("-", "_")
        .replace("(", "")
        .replace(")", "")
    )


def _read_model_metadata() -> dict[str, str]:
    default_metadata = {
        "model_1_name": "naive_bayes",
        "model_2_name": "svm",
    }

    if not METADATA_PATH.exists():
        return default_metadata

    try:
        with METADATA_PATH.open("r", encoding="utf-8") as file:
            metadata = json.load(file)
    except (json.JSONDecodeError, OSError):
        return default_metadata

    model_1 = (
        metadata.get("model_1")
        or metadata.get("model_1_name")
        or metadata.get("selected_model_1")
        or default_metadata["model_1_name"]
    )

    model_2 = (
        metadata.get("model_2")
        or metadata.get("model_2_name")
        or metadata.get("selected_model_2")
        or default_metadata["model_2_name"]
    )

    if isinstance(model_1, dict):
        model_1 = model_1.get("name", default_metadata["model_1_name"])

    if isinstance(model_2, dict):
        model_2 = model_2.get("name", default_metadata["model_2_name"])

    return {
        "model_1_name": str(model_1),
        "model_2_name": str(model_2),
    }


def _read_metrics_summary() -> list[dict[str, Any]]:
    if not METRICS_PATH.exists():
        return []

    try:
        with METRICS_PATH.open("r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)
            return [dict(row) for row in reader]
    except OSError:
        return []


def _get_row_model_name(row: dict[str, Any]) -> str:
    possible_keys = [
        "model",
        "modelo",
        "model_name",
        "name",
        "classifier",
        "algorithm",
    ]

    for key in possible_keys:
        if key in row and row[key]:
            return str(row[key])

    for value in row.values():
        text_value = str(value).strip()
        if text_value and not text_value.replace(".", "", 1).isdigit():
            return text_value

    return ""


def _find_model_metrics(
    metrics_rows: list[dict[str, Any]],
    model_name: str,
) -> dict[str, Any] | None:
    normalized_target = _normalize_model_name(model_name)

    aliases = {
        "naive_bayes": [
            "naive_bayes",
            "nb",
            "gaussian_nb",
            "gaussiannb",
            "multinomial_nb",
            "bernoulli_nb",
        ],
        "svm": [
            "svm",
            "svc",
            "support_vector_machine",
            "support_vector",
        ],
        "xgboost": [
            "xgboost",
            "xgb",
            "xgboost_classifier",
        ],
        "random_forest": [
            "random_forest",
            "rf",
            "randomforest",
        ],
        "mlp": [
            "mlp",
            "neural_network",
            "red_neuronal",
        ],
    }

    target_aliases = aliases.get(normalized_target, [normalized_target])

    for row in metrics_rows:
        row_model_name = _get_row_model_name(row)
        normalized_row_name = _normalize_model_name(row_model_name)

        if normalized_row_name == normalized_target:
            return row

        if normalized_row_name in target_aliases:
            return row

        for alias in target_aliases:
            if alias in normalized_row_name:
                return row

    return None


def _get_metric_value(row: dict[str, Any] | None, aliases: list[str]) -> float:
    if not row:
        return 0.0

    normalized_aliases = [
        alias.strip().lower().replace(" ", "_").replace("-", "_")
        for alias in aliases
    ]

    for key, value in row.items():
        normalized_key = key.strip().lower().replace(" ", "_").replace("-", "_")

        if normalized_key in normalized_aliases:
            return _safe_float(value)

    return 0.0


def _build_model_payload(
    label: str,
    model_name: str,
    row: dict[str, Any] | None,
) -> dict[str, Any]:
    return {
        "label": label,
        "name": model_name,
        "accuracy": _get_metric_value(
            row,
            [
                "accuracy",
                "acc",
                "exactitud",
            ],
        ),
        "precision_macro": _get_metric_value(
            row,
            [
                "precision_macro",
                "precision",
                "precision macro",
                "macro_precision",
                "precision_macro_avg",
            ],
        ),
        "recall_macro": _get_metric_value(
            row,
            [
                "recall_macro",
                "recall",
                "recall macro",
                "macro_recall",
                "recall_macro_avg",
            ],
        ),
        "f1_macro": _get_metric_value(
            row,
            [
                "f1_macro",
                "f1_score",
                "f1-score macro",
                "f1 macro",
                "macro_f1",
                "f1",
            ],
        ),
    }


def _extract_area_from_model_result(value: Any) -> str | None:
    if value is None:
        return None

    parsed_value = value

    if isinstance(value, str):
        try:
            parsed_value = json.loads(value)
        except json.JSONDecodeError:
            return None

    if isinstance(parsed_value, dict):
        area = (
            parsed_value.get("area")
            or parsed_value.get("predicted_area")
            or parsed_value.get("recommended_area")
        )

        if area:
            return str(area)

    return None


def _get_model_agreement_stats(results: list[RecommendationResult]) -> dict[str, int]:
    evaluated_records = 0
    agreement_records = 0

    for result in results:
        model_1_area = _extract_area_from_model_result(
            getattr(result, "model_1_result", None)
        )
        model_2_area = _extract_area_from_model_result(
            getattr(result, "model_2_result", None)
        )

        if not model_1_area or not model_2_area:
            continue

        evaluated_records += 1

        if model_1_area == model_2_area:
            agreement_records += 1

    if evaluated_records == 0:
        return {
            "evaluated_records": 0,
            "agreement_percentage": 0,
            "disagreement_percentage": 0,
        }

    agreement_percentage = round((agreement_records / evaluated_records) * 100)
    disagreement_percentage = 100 - agreement_percentage

    return {
        "evaluated_records": evaluated_records,
        "agreement_percentage": agreement_percentage,
        "disagreement_percentage": disagreement_percentage,
    }


def _get_area_summary(db: Session) -> list[dict[str, Any]]:
    rows = db.execute(
        select(
            RecommendationResult.recommended_area,
            func.count(RecommendationResult.id).label("total"),
            func.avg(RecommendationResult.affinity).label("average_affinity"),
        )
        .group_by(RecommendationResult.recommended_area)
        .order_by(desc("total"))
    ).all()

    return [
        {
            "area": row[0],
            "total": int(row[1] or 0),
            "average_affinity": round(float(row[2] or 0), 2),
        }
        for row in rows
    ]


def get_model_analytics_data(db: Session):
    metadata = _read_model_metadata()
    metrics_rows = _read_metrics_summary()

    model_1_name = metadata["model_1_name"]
    model_2_name = metadata["model_2_name"]

    model_1_row = _find_model_metrics(metrics_rows, model_1_name)
    model_2_row = _find_model_metrics(metrics_rows, model_2_name)

    model_1 = _build_model_payload("Modelo 1", model_1_name, model_1_row)
    model_2 = _build_model_payload("Modelo 2", model_2_name, model_2_row)

    results = db.scalars(
        select(RecommendationResult)
        .order_by(RecommendationResult.created_at.desc())
    ).all()

    agreement_stats = _get_model_agreement_stats(results)
    area_summary = _get_area_summary(db)

    best_model = model_1

    if model_2["f1_macro"] > model_1["f1_macro"]:
        best_model = model_2

    return {
        "status": "ok",
        "message": "Analítica de modelos obtenida a partir de métricas de entrenamiento y registros almacenados.",
        "metrics_source": str(METRICS_PATH),
        "metrics_file_exists": METRICS_PATH.exists(),
        "metrics_rows_loaded": len(metrics_rows),
        "model_1": model_1,
        "model_2": model_2,
        "best_model": best_model,
        "evaluated_records": agreement_stats["evaluated_records"],
        "agreement_percentage": agreement_stats["agreement_percentage"],
        "disagreement_percentage": agreement_stats["disagreement_percentage"],
        "area_summary": area_summary,
        "metrics": [
            {
                "metric": "Accuracy",
                "model_1": model_1["accuracy"],
                "model_2": model_2["accuracy"],
                "description": "Predicciones correctas frente al total evaluado.",
            },
            {
                "metric": "Precision macro",
                "model_1": model_1["precision_macro"],
                "model_2": model_2["precision_macro"],
                "description": "Precisión promedio considerando todas las áreas.",
            },
            {
                "metric": "Recall macro",
                "model_1": model_1["recall_macro"],
                "model_2": model_2["recall_macro"],
                "description": "Capacidad promedio para identificar cada área.",
            },
            {
                "metric": "F1-score macro",
                "model_1": model_1["f1_macro"],
                "model_2": model_2["f1_macro"],
                "description": "Equilibrio promedio entre precisión y recall.",
            },
        ],
    }


def get_reference_export():
    return {
        "status": "ok",
        "message": "Exportación referencial de datos no identificables preparada",
        "format": "CSV",
    }