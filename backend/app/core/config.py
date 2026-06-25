from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "VocAI API"
    app_version: str = "0.1.0"
    app_env: str = "development"
    database_url: str

    secret_key: str = "vocai_secret_key_development_2026"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 120

    email_hash_secret: str = "vocai_email_hash_secret_development_2026"

    email_host: str = "smtp.gmail.com"
    email_port: int = 587
    email_username: str = ""
    email_app_password: str = ""
    email_from_name: str = "VocAI"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()