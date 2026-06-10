from fastapi import APIRouter, HTTPException

from app.db.database import (
    check_database_connection,
    create_database_tables,
    get_database_tables,
)

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


@router.post("/create-tables")
def create_tables():
    try:
        create_database_tables()
        return {
            "status": "ok",
            "message": "Tablas creadas o verificadas correctamente",
            "tables": get_database_tables()
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"No se pudieron crear las tablas: {str(error)}"
        )


@router.get("/tables")
def list_tables():
    try:
        return {
            "status": "ok",
            "tables": get_database_tables()
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"No se pudieron consultar las tablas: {str(error)}"
        )