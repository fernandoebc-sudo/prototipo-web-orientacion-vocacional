from fastapi import APIRouter

from app.api.v1.endpoints import admin, auth, questionnaire, results

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(questionnaire.router)
api_router.include_router(results.router)
api_router.include_router(admin.router)