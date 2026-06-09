from fastapi import APIRouter

from app.schemas.results import StudentResultResponse

router = APIRouter(prefix="/results", tags=["Resultados"])


@router.get("/student-result", response_model=StudentResultResponse)
def get_student_result():
    return {
        "status": "ok",
        "recommended_area": "Ingeniería y Tecnología",
        "affinity": 84,
        "model_1": {
            "name": "Modelo 1",
            "area": "Ingeniería y Tecnología",
            "affinity": 84
        },
        "model_2": {
            "name": "Modelo 2",
            "area": "Ingeniería y Tecnología",
            "affinity": 79
        },
        "message": "Resultado referencial generado para pruebas de integración"
    }