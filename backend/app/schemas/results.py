from pydantic import BaseModel


class ModelPrediction(BaseModel):
    name: str
    area: str
    affinity: int


class StudentResultResponse(BaseModel):
    status: str
    recommended_area: str
    affinity: int
    model_1: ModelPrediction
    model_2: ModelPrediction
    message: str


class StoredStudentResultResponse(StudentResultResponse):
    questionnaire_response_id: int
    recommendation_result_id: int