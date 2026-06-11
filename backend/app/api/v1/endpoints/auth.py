from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.db.database import get_db
from app.schemas.auth import (
    AdminLoginRequest,
    CreateAdminRequest,
    StudentAccessCodesResponse,
    StudentLoginRequest,
    TokenResponse,
)
from app.services.auth_service import (
    authenticate_admin,
    create_initial_admin,
    create_student_access_code,
    list_student_access_codes,
    validate_student_access_code,
)

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/create-admin")
def create_admin(
    data: CreateAdminRequest,
    db: Session = Depends(get_db),
):
    return create_initial_admin(db, data)


@router.post("/admin-login", response_model=TokenResponse)
def admin_login(
    data: AdminLoginRequest,
    db: Session = Depends(get_db),
):
    return authenticate_admin(db, data.username, data.password)


@router.post("/student-login", response_model=TokenResponse)
def student_login(
    data: StudentLoginRequest,
    db: Session = Depends(get_db),
):
    return validate_student_access_code(db, data.code)


@router.post("/student-codes", response_model=StudentAccessCodesResponse)
def generate_student_code(
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    create_student_access_code(db)
    return list_student_access_codes(db)


@router.get("/student-codes", response_model=StudentAccessCodesResponse)
def get_student_codes(
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    return list_student_access_codes(db)