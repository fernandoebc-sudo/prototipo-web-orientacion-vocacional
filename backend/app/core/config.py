from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BASE_DIR / ".env"


class Settings(BaseSettings):
    app_name: str = "VocAI API"
    app_version: str = "1.0.0"

    database_url: str

    secret_key: str = "vocai_secret_key_development"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    email_hash_secret: str = "vocai_email_hash_secret_development_2026"

    email_host: str = "smtp.gmail.com"
    email_port: int = 587
    email_username: str = ""
    email_app_password: str = ""
    email_from_name: str = "VocAI"

    recaptcha_secret_key: str = ""
    recaptcha_score_threshold: float = 0.5

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()