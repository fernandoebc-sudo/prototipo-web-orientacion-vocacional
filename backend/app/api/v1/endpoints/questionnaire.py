from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.questionnaire import (
    QuestionnaireResponse,
    QuestionnaireSubmitRequest,
    QuestionnaireSubmitResponse,
)
from app.services.recommendation_service import save_recommendation_result


router = APIRouter(prefix="/questionnaire", tags=["Cuestionario"])


@router.get("/questions", response_model=QuestionnaireResponse)
def get_questions():
    return {
        "status": "ok",
        "message": "Preguntas referenciales del cuestionario académico-vocacional",
        "sections": [
            {
                "name": "Datos generales",
                "items": [
                    "Participación previa en orientación vocacional",
                ],
            },
            {
                "name": "Desempeño académico",
                "items": [
                    "Matemáticas y razonamiento lógico",
                    "Física, química o biología",
                    "Lengua, lectura o comunicación",
                    "Ciencias sociales o historia",
                    "Informática, tecnología o programación",
                    "Arte, diseño o creatividad",
                    "Actividades prácticas o experimentos",
                ],
            },
            {
                "name": "Intereses, habilidades y preferencias",
                "items": [
                    "Intereses académicos y vocacionales",
                    "Habilidades percibidas",
                    "Actividades preferidas",
                ],
            },
        ],
    }


@router.post("/submit", response_model=QuestionnaireSubmitResponse)
def submit_questionnaire(
    data: QuestionnaireSubmitRequest,
    db: Session = Depends(get_db),
):
    return save_recommendation_result(db=db, data=data)