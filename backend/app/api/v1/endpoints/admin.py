from fastapi import APIRouter

from app.schemas.admin import (
    AdminRecordsResponse,
    AdminStatsResponse,
    ExportResponse,
    ModelAnalyticsResponse,
)
from app.services.admin_service import (
    get_reference_export,
    get_reference_model_analytics,
    get_reference_records,
    get_reference_stats,
)

router = APIRouter(prefix="/admin", tags=["Administración"])


@router.get("/records", response_model=AdminRecordsResponse)
def get_records():
    return get_reference_records()


@router.get("/stats", response_model=AdminStatsResponse)
def get_stats():
    return get_reference_stats()


@router.get("/model-analytics", response_model=ModelAnalyticsResponse)
def get_model_analytics():
    return get_reference_model_analytics()


@router.get("/export", response_model=ExportResponse)
def export_data():
    return get_reference_export()