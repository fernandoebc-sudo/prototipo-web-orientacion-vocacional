from sqlalchemy.orm import Session

from app.models.questionnaire_response import QuestionnaireResponse
from app.models.recommendation_result import RecommendationResult
from app.schemas.questionnaire import QuestionnaireSubmitRequest
from app.ml.encoder import encode_questionnaire_answers
from app.ml.predictor import predict_vocai
from app.services.auth_service import mark_student_access_code_as_used

def generate_ml_recommendation(data: QuestionnaireSubmitRequest):
    """
    Genera una recomendación académica por área usando los modelos de Machine Learning
    integrados al backend.
    """
    encoded_answers = encode_questionnaire_answers(data)
    prediction = predict_vocai(encoded_answers)

    return {
        "status": "ok",
        "recommended_area": prediction["recommended_area"],
        "affinity": prediction["affinity"],
        "secondary_areas": prediction["secondary_areas"],
        "model_1": {
            "name": prediction["model_1"]["model_name"],
            "area": prediction["model_1"]["predicted_area"],
            "affinity": prediction["model_1"]["affinity"],
        },
        "model_2": {
            "name": prediction["model_2"]["model_name"],
            "area": prediction["model_2"]["predicted_area"],
            "affinity": prediction["model_2"]["affinity"],
        },
        "interpretation": prediction["interpretation"],
        "message": "Resultado generado a partir de los modelos de Machine Learning integrados.",
    }


def get_reference_student_result():
    """
    Devuelve un resultado referencial para pruebas de visualización.
    Se mantiene solo como respaldo para pantallas que aún no consulten un registro real.
    """
    return {
        "status": "ok",
        "recommended_area": "Ingeniería y Tecnología",
        "affinity": 84,
        "model_1": {
            "name": "Modelo 1",
            "area": "Ingeniería y Tecnología",
            "affinity": 84,
        },
        "model_2": {
            "name": "Modelo 2",
            "area": "Ingeniería y Tecnología",
            "affinity": 79,
        },
        "message": "Resultado referencial generado para pruebas de integración",
    }


def save_recommendation_result(
    db: Session,
    data: QuestionnaireSubmitRequest,
    student_code: str | None = None,
):
    """
    Guarda las respuestas del cuestionario y el resultado generado por los modelos ML.
    """

    recommendation = generate_ml_recommendation(data)

    questionnaire_response = QuestionnaireResponse(
        answers=data.model_dump()
    )

    db.add(questionnaire_response)
    db.commit()
    db.refresh(questionnaire_response)

    recommendation_result = RecommendationResult(
        questionnaire_response_id=questionnaire_response.id,
        recommended_area=recommendation["recommended_area"],
        affinity=round(float(recommendation["affinity"])),
        model_1_result=recommendation["model_1"],
        model_2_result=recommendation["model_2"],
    )

    db.add(recommendation_result)
    db.commit()
    db.refresh(recommendation_result)

    if student_code:
        mark_student_access_code_as_used(db, student_code)
        
    return {
        **recommendation,
        "questionnaire_response_id": questionnaire_response.id,
        "recommendation_result_id": recommendation_result.id,
    }