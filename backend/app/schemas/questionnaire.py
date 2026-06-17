from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class QuestionnaireSection(BaseModel):
    name: str
    items: List[str]


class QuestionnaireResponse(BaseModel):
    status: str
    message: str
    sections: List[QuestionnaireSection]


class QuestionnaireSubmitRequest(BaseModel):
    general_data: Dict[str, Any]
    academic_performance: Dict[str, Any]
    interests_skills: Dict[str, Any]
    vocational_security: Dict[str, Any]


class QuestionnaireSubmitResponse(BaseModel):
    status: str
    message: str

    recommended_area: Optional[str] = None
    affinity: Optional[float] = None
    secondary_areas: Optional[List[Dict[str, Any]]] = None
    interpretation: Optional[str] = None

    model_1: Optional[Dict[str, Any]] = None
    model_2: Optional[Dict[str, Any]] = None

    questionnaire_response_id: Optional[int] = None
    recommendation_result_id: Optional[int] = None

    next_step: Optional[str] = None