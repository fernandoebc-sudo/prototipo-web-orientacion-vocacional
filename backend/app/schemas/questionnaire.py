from pydantic import BaseModel
from typing import Dict, List


class QuestionnaireSection(BaseModel):
    name: str
    items: List[str]


class QuestionnaireResponse(BaseModel):
    status: str
    message: str
    sections: List[QuestionnaireSection]


class QuestionnaireSubmitRequest(BaseModel):
    general_data: Dict[str, str]
    academic_performance: Dict[str, int]
    interests_skills: Dict[str, int]
    vocational_security: Dict[str, str]


class QuestionnaireSubmitResponse(BaseModel):
    status: str
    message: str
    next_step: str