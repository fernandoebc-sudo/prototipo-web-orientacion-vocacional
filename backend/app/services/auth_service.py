from datetime import datetime
from secrets import choice
from string import ascii_uppercase, digits

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_email,
    hash_password,
    normalize_email,
    verify_password,
)
from app.models.student_access_code import StudentAccessCode
from app.models.user import User
from app.schemas.auth import CreateAdminRequest
from app.services.email_service import send_student_code_email


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


def _build_code_response_item(code: StudentAccessCode):
    return {
        "id": code.id,
        "code": code.code,
        "has_email": code.email_hash is not None,
        "is_active": code.is_active,
        "is_used": code.is_used,
        "created_at": code.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "used_at": code.used_at.strftime("%Y-%m-%d %H:%M:%S")
        if code.used_at
        else None,
        "sent_at": code.sent_at.strftime("%Y-%m-%d %H:%M:%S")
        if code.sent_at
        else None,
    }


def _create_student_access_code_record(db: Session, email: str):
    normalized_email = normalize_email(email)
    email_hash = hash_email(normalized_email)

    existing_available_code = db.scalar(
        select(StudentAccessCode).where(
            StudentAccessCode.email_hash == email_hash,
            StudentAccessCode.is_active == True,
            StudentAccessCode.is_used == False,
        )
    )

    if existing_available_code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un código disponible para este correo",
        )

    code_value = generate_code_value()

    while db.scalar(
        select(StudentAccessCode).where(StudentAccessCode.code == code_value)
    ):
        code_value = generate_code_value()

    access_code = StudentAccessCode(
        code=code_value,
        email_hash=email_hash,
        is_active=True,
        is_used=False,
    )

    db.add(access_code)
    db.commit()
    db.refresh(access_code)

    send_student_code_email(normalized_email, access_code.code)

    access_code.sent_at = datetime.utcnow()
    db.commit()
    db.refresh(access_code)

    return access_code


def create_student_access_code(db: Session, email: str):
    return _create_student_access_code_record(db, email)


def create_student_access_codes_bulk(db: Session, emails: list[str]):
    if len(emails) > 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Solo se permite generar hasta 20 códigos por lote",
        )

    normalized_emails = []
    details = []
    created = 0
    skipped = 0
    failed = 0

    for email in emails:
        normalized_email = normalize_email(email)

        if not normalized_email:
            skipped += 1
            details.append("Correo vacío omitido")
            continue

        if normalized_email in normalized_emails:
            skipped += 1
            details.append(f"{normalized_email}: correo duplicado en el lote")
            continue

        normalized_emails.append(normalized_email)

    for email in normalized_emails:
        try:
            _create_student_access_code_record(db, email)
            created += 1
            details.append(f"{email}: código generado y enviado")
        except HTTPException as error:
            if error.status_code == status.HTTP_400_BAD_REQUEST:
                skipped += 1
                details.append(f"{email}: ya tiene un código disponible")
            else:
                failed += 1
                details.append(f"{email}: no se pudo procesar")
        except Exception:
            failed += 1
            details.append(f"{email}: error inesperado al generar o enviar")

    codes_response = list_student_access_codes(db)

    return {
        "status": "ok",
        "message": "Proceso de generación masiva finalizado",
        "created": created,
        "skipped": skipped,
        "failed": failed,
        "details": details,
        "codes": codes_response["codes"],
    }


def list_student_access_codes(db: Session):
    codes = db.scalars(
        select(StudentAccessCode).order_by(StudentAccessCode.created_at.desc())
    ).all()

    return {
        "status": "ok",
        "message": "Códigos de acceso estudiantil consultados correctamente",
        "codes": [_build_code_response_item(code) for code in codes],
    }


def validate_student_access_code(db: Session, email: str, code_value: str):
    normalized_email = normalize_email(email)
    email_hash = hash_email(normalized_email)

    access_code = db.scalar(
        select(StudentAccessCode).where(
            StudentAccessCode.code == code_value,
            StudentAccessCode.email_hash == email_hash,
        )
    )

    if not access_code:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o código de acceso inválido",
        )

    if not access_code.is_active or access_code.is_used:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El código de acceso no está disponible",
        )

    token = create_access_token(
        {
            "sub": access_code.code,
            "role": "student",
            "email_hash": access_code.email_hash,
        }
    )

    return {
        "status": "ok",
        "access_token": token,
        "token_type": "bearer",
        "role": "student",
        "message": "Acceso de estudiante validado correctamente",
    }


def mark_student_access_code_as_used(db: Session, code_value: str):
    access_code = db.scalar(
        select(StudentAccessCode).where(StudentAccessCode.code == code_value)
    )

    if not access_code:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Código de acceso no encontrado",
        )

    if access_code.is_used:
        return access_code

    access_code.is_used = True
    access_code.used_at = datetime.utcnow()

    db.commit()
    db.refresh(access_code)

    return access_code