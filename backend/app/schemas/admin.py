from typing import Any, List

from pydantic import BaseModel


class AdminRecord(BaseModel):
    id: int
    recommended_area: str
    affinity: int
    created_at: str
    model_1_result: Any | None = None
    model_2_result: Any | None = None


class AdminRecordsResponse(BaseModel):
    status: str
    message: str
    records: List[AdminRecord]


class AdminStatsResponse(BaseModel):
    status: str
    total_records: int
    most_recommended_area: str
    average_affinity: int


class ModelMetrics(BaseModel):
    name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float


class ModelAnalyticsResponse(BaseModel):
    status: str
    model_1: ModelMetrics
    model_2: ModelMetrics
    message: str


class ExportResponse(BaseModel):
    status: str
    message: str
    format: str