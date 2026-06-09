from fastapi import APIRouter

from app.schemas.auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/student-login", response_model=LoginResponse)
def student_login(data: LoginRequest):
    return {
        "status": "ok",
        "role": "student",
        "message": "Inicio de sesión de estudiante validado de forma referencial"
    }


@router.post("/admin-login", response_model=LoginResponse)
def admin_login(data: LoginRequest):
    return {
        "status": "ok",
        "role": "admin",
        "message": "Inicio de sesión de administrador validado de forma referencial"
    }