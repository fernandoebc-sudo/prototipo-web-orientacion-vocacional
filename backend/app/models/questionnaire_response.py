from datetime import datetime

from sqlalchemy import DateTime, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class QuestionnaireResponse(Base):
    __tablename__ = "questionnaire_responses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    answers: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    recommendation_result = relationship(
        "RecommendationResult",
        back_populates="questionnaire_response",
        uselist=False,
    )