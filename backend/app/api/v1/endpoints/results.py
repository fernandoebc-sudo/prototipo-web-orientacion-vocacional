from fastapi import APIRouter

from app.schemas.questionnaire import QuestionnaireSubmitRequest
from app.schemas.results import StudentResultResponse
from app.services.recommendation_service import (
    generate_reference_recommendation,
    get_reference_student_result,
)

router = APIRouter(prefix="/results", tags=["Resultados"])


@router.get("/student-result", response_model=StudentResultResponse)
def get_student_result():
    return get_reference_student_result()


@router.post("/recommendation", response_model=StudentResultResponse)
def generate_recommendation(data: QuestionnaireSubmitRequest):
    return generate_reference_recommendation(data)