from fastapi import APIRouter

router = APIRouter(prefix="/api/v1", tags=["Prueba"])


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend de VocAI funcionando correctamente"
    }


@router.get("/info")
def api_info():
    return {
        "project": "VocAI",
        "description": "API base para el prototipo web de orientación vocacional-académica",
        "current_stage": "Estructura inicial del backend"
    }