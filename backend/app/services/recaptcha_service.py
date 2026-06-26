import json
from urllib.parse import urlencode
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

from fastapi import HTTPException, status

from app.core.config import settings


def verify_recaptcha_token(token: str, expected_action: str = "student_login") -> None:
    """
    Verifica el token de reCAPTCHA v3 con Google.
    Si la verificación falla, lanza HTTPException.
    """

    if not settings.recaptcha_secret_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="La clave secreta de reCAPTCHA no está configurada.",
        )

    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El token de reCAPTCHA es obligatorio.",
        )

    payload = urlencode(
        {
            "secret": settings.recaptcha_secret_key,
            "response": token,
        }
    ).encode("utf-8")

    request = Request(
        "https://www.google.com/recaptcha/api/siteverify",
        data=payload,
        method="POST",
    )

    try:
        with urlopen(request, timeout=10) as response:
            response_body = response.read().decode("utf-8")
            recaptcha_response = json.loads(response_body)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="No se pudo verificar reCAPTCHA en este momento.",
        )

    success = recaptcha_response.get("success", False)
    score = float(recaptcha_response.get("score", 0.0))
    action = recaptcha_response.get("action", "")

    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La verificación de reCAPTCHA no fue exitosa.",
        )

    if action != expected_action:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La acción de reCAPTCHA no coincide con el inicio de sesión.",
        )

    if score < settings.recaptcha_score_threshold:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La verificación de reCAPTCHA obtuvo un puntaje bajo.",
        )