from app.schemas.questionnaire import QuestionnaireSubmitRequest


def generate_reference_recommendation(data: QuestionnaireSubmitRequest):
    """
    Genera una recomendación referencial para pruebas del backend.

    Esta función será reemplazada posteriormente por la lógica de Machine Learning
    con los modelos XGBoost y MLP.
    """

    recommended_area = "Ingeniería y Tecnología"
    affinity = 84

    return {
        "status": "ok",
        "recommended_area": recommended_area,
        "affinity": affinity,
        "model_1": {
            "name": "Modelo 1",
            "area": recommended_area,
            "affinity": affinity
        },
        "model_2": {
            "name": "Modelo 2",
            "area": recommended_area,
            "affinity": 79
        },
        "message": "Resultado referencial generado a partir de las respuestas recibidas"
    }


def get_reference_student_result():
    """
    Devuelve un resultado referencial para pruebas de visualización.
    """

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