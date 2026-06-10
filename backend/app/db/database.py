from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models import Base


engine = create_engine(settings.database_url, pool_pre_ping=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def check_database_connection():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        return True


def create_database_tables():
    Base.metadata.create_all(bind=engine)


def get_database_tables():
    inspector = inspect(engine)
    return inspector.get_table_names()