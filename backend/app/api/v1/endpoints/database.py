from fastapi import APIRouter, HTTPException

from app.db.database import check_database_connection

router = APIRouter(prefix="/database", tags=["Base de datos"])


@router.get("/health")
def database_health_check():
    try:
        check_database_connection()
        return {
            "status": "ok",
            "message": "Conexión a la base de datos establecida correctamente"
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"No se pudo conectar a la base de datos: {str(error)}"
        )