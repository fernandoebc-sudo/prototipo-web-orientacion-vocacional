from fastapi import APIRouter

router = APIRouter(prefix="/results", tags=["Resultados"])


@router.get("/student-result")
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