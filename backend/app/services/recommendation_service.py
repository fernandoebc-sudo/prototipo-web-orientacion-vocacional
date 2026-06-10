from sqlalchemy.orm import Session

from app.models.questionnaire_response import QuestionnaireResponse
from app.models.recommendation_result import RecommendationResult
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


def save_recommendation_result(
    db: Session,
    data: QuestionnaireSubmitRequest,
):
    """
    Guarda las respuestas del cuestionario y el resultado referencial generado.
    """

    recommendation = generate_reference_recommendation(data)

    questionnaire_response = QuestionnaireResponse(
        answers=data.model_dump()
    )

    db.add(questionnaire_response)
    db.commit()
    db.refresh(questionnaire_response)

    recommendation_result = RecommendationResult(
        questionnaire_response_id=questionnaire_response.id,
        recommended_area=recommendation["recommended_area"],
        affinity=recommendation["affinity"],
        model_1_result=recommendation["model_1"],
        model_2_result=recommendation["model_2"],
    )

    db.add(recommendation_result)
    db.commit()
    db.refresh(recommendation_result)

    return {
        **recommendation,
        "questionnaire_response_id": questionnaire_response.id,
        "recommendation_result_id": recommendation_result.id,
    }