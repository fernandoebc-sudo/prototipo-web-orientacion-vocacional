from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.db.database import get_db
from app.schemas.admin import (
    AdminRecordsResponse,
    AdminStatsResponse,
)
from app.services.admin_service import (
    get_database_records,
    get_database_stats,
    get_reference_export,
    get_reference_model_analytics,
)


router = APIRouter(prefix="/admin", tags=["Administración"])


@router.get("/records", response_model=AdminRecordsResponse)
def get_records(
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    return get_database_records(db)


@router.get("/stats", response_model=AdminStatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    return get_database_stats(db)


@router.get("/model-analytics")
def get_model_analytics(
    admin: dict = Depends(require_admin),
):
    return get_reference_model_analytics()


@router.get("/export")
def get_export_options(
    admin: dict = Depends(require_admin),
):
    return get_reference_export()