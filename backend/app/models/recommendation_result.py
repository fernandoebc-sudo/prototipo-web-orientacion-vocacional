from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class RecommendationResult(Base):
    __tablename__ = "recommendation_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    questionnaire_response_id: Mapped[int] = mapped_column(
        ForeignKey("questionnaire_responses.id"),
        nullable=False,
    )

    recommended_area: Mapped[str] = mapped_column(String(120), nullable=False)
    affinity: Mapped[int] = mapped_column(Integer, nullable=False)

    model_1_result: Mapped[dict] = mapped_column(JSON, nullable=False)
    model_2_result: Mapped[dict] = mapped_column(JSON, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    questionnaire_response = relationship(
        "QuestionnaireResponse",
        back_populates="recommendation_result",
    )