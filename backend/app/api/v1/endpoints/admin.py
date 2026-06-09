from fastapi import APIRouter

from app.schemas.admin import (
    AdminRecordsResponse,
    AdminStatsResponse,
    ExportResponse,
    ModelAnalyticsResponse,
)

router = APIRouter(prefix="/admin", tags=["Administración"])


@router.get("/records", response_model=AdminRecordsResponse)
def get_records():
    return {
        "status": "ok",
        "message": "Registros referenciales de cuestionarios procesados",
        "records": [
            {
                "id": 1,
                "recommended_area": "Ingeniería y Tecnología",
                "affinity": 84,
                "created_at": "2026-06-07"
            },
            {
                "id": 2,
                "recommended_area": "Ciencias de la Salud",
                "affinity": 78,
                "created_at": "2026-06-07"
            }
        ]
    }


@router.get("/stats", response_model=AdminStatsResponse)
def get_stats():
    return {
        "status": "ok",
        "total_records": 120,
        "most_recommended_area": "Ingeniería y Tecnología",
        "average_affinity": 82
    }


@router.get("/model-analytics", response_model=ModelAnalyticsResponse)
def get_model_analytics():
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


@router.get("/export", response_model=ExportResponse)
def export_data():
    return {
        "status": "ok",
        "message": "Exportación referencial de datos no identificables preparada",
        "format": "CSV"
    }