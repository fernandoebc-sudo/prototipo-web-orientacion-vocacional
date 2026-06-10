from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.questionnaire import QuestionnaireSubmitRequest
from app.schemas.results import StoredStudentResultResponse, StudentResultResponse
from app.services.recommendation_service import (
    get_reference_student_result,
    save_recommendation_result,
)

router = APIRouter(prefix="/results", tags=["Resultados"])


@router.get("/student-result", response_model=StudentResultResponse)
def get_student_result():
    return get_reference_student_result()


@router.post("/recommendation", response_model=StoredStudentResultResponse)
def generate_recommendation(
    data: QuestionnaireSubmitRequest,
    db: Session = Depends(get_db),
):
    return save_recommendation_result(db, data)