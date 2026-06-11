from datetime import datetime
from secrets import choice
from string import ascii_uppercase, digits

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.student_access_code import StudentAccessCode
from app.models.user import User
from app.schemas.auth import CreateAdminRequest


def create_initial_admin(db: Session, data: CreateAdminRequest):
    existing_admin = db.scalar(
        select(User).where(User.role == "admin")
    )

    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un administrador registrado",
        )

    admin = User(
        username=data.username,
        hashed_password=hash_password(data.password),
        role="admin",
        is_active=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {
        "status": "ok",
        "message": "Administrador inicial creado correctamente",
    }


def authenticate_admin(db: Session, username: str, password: str):
    user = db.scalar(
        select(User).where(User.username == username)
    )

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo",
        )

    token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
        }
    )

    return {
        "status": "ok",
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "message": "Inicio de sesión de administrador correcto",
    }


def generate_code_value() -> str:
    characters = ascii_uppercase + digits
    first_part = "".join(choice(characters) for _ in range(4))
    second_part = "".join(choice(characters) for _ in range(4))

    return f"VOC-{first_part}-{second_part}"


def create_student_access_code(db: Session):
    code_value = generate_code_value()

    while db.scalar(select(StudentAccessCode).where(StudentAccessCode.code == code_value)):
        code_value = generate_code_value()

    access_code = StudentAccessCode(
        code=code_value,
        is_active=True,
        is_used=False,
    )

    db.add(access_code)
    db.commit()
    db.refresh(access_code)

    return access_code


def list_student_access_codes(db: Session):
    codes = db.scalars(
        select(StudentAccessCode).order_by(StudentAccessCode.created_at.desc())
    ).all()

    return {
        "status": "ok",
        "message": "Códigos de acceso estudiantil consultados correctamente",
        "codes": [
            {
                "id": code.id,
                "code": code.code,
                "is_active": code.is_active,
                "is_used": code.is_used,
                "created_at": code.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "used_at": code.used_at.strftime("%Y-%m-%d %H:%M:%S")
                if code.used_at
                else None,
            }
            for code in codes
        ],
    }


def validate_student_access_code(db: Session, code_value: str):
    access_code = db.scalar(
        select(StudentAccessCode).where(StudentAccessCode.code == code_value)
    )

    if not access_code:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código de acceso inválido",
        )

    if not access_code.is_active or access_code.is_used:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El código de acceso no está disponible",
        )

    access_code.is_used = True
    access_code.used_at = datetime.utcnow()

    db.commit()
    db.refresh(access_code)

    token = create_access_token(
        {
            "sub": access_code.code,
            "role": "student",
        }
    )

    return {
        "status": "ok",
        "access_token": token,
        "token_type": "bearer",
        "role": "student",
        "message": "Acceso de estudiante validado correctamente",
    }