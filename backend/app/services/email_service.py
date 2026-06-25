import smtplib
from email.message import EmailMessage

from fastapi import HTTPException, status

from app.core.config import settings


def send_student_code_email(to_email: str, code: str) -> None:
    if not settings.email_username or not settings.email_app_password:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se configuró el correo emisor del sistema",
        )

    message = EmailMessage()
    message["Subject"] = "Código de acceso - VocAI"
    message["From"] = f"{settings.email_from_name} <{settings.email_username}>"
    message["To"] = to_email

    message.set_content(
        f"""
Hola.

Se ha generado un código de acceso para responder el cuestionario académico-vocacional del prototipo VocAI.

Código de acceso: {code}

Ingresa al sistema utilizando este correo institucional y el código indicado.

Este mensaje fue generado automáticamente para fines académicos.
"""
    )

    try:
        with smtplib.SMTP(settings.email_host, settings.email_port) as server:
            server.starttls()
            server.login(settings.email_username, settings.email_app_password)
            server.send_message(message)
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo enviar el correo: {str(error)}",
        )