from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/student-login")
def student_login():
    return {
        "status": "ok",
        "role": "student",
        "message": "Inicio de sesión de estudiante validado de forma referencial"
    }


@router.post("/admin-login")
def admin_login():
    return {
        "status": "ok",
        "role": "admin",
        "message": "Inicio de sesión de administrador validado de forma referencial"
    }