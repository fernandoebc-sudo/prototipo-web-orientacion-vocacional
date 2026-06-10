from sqlalchemy import desc, func, select
from sqlalchemy.orm import Session

from app.models.recommendation_result import RecommendationResult


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
            }
            for result in results
        ]
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
            func.count(RecommendationResult.id).label("total")
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


def get_reference_model_analytics():
    return {
        "status": "ok",
        "model_1": {
            "name": "Modelo 1",
            "accuracy": 0.84,
            "precision": 0.83,
            "recall": 0.82,
            "f1_score": 0.83
        },
        "model_2": {
            "name": "Modelo 2",
            "accuracy": 0.79,
            "precision": 0.78,
            "recall": 0.76,
            "f1_score": 0.77
        },
        "message": "Métricas referenciales para pruebas del panel administrativo"
    }


def get_reference_export():
    return {
        "status": "ok",
        "message": "Exportación referencial de datos no identificables preparada",
        "format": "CSV"
    }