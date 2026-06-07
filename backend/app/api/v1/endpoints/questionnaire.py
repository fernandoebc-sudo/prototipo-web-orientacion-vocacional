from fastapi import APIRouter

router = APIRouter(prefix="/questionnaire", tags=["Cuestionario"])


@router.get("/questions")
def get_questions():
    return {
        "status": "ok",
        "message": "Preguntas referenciales del cuestionario académico-vocacional",
        "sections": [
            {
                "name": "Datos generales",
                "items": [
                    "Tipo de institución",
                    "Participación previa en orientación vocacional"
                ]
            },
            {
                "name": "Desempeño académico",
                "items": [
                    "Matemáticas o Física",
                    "Comunicación y Lengua",
                    "Ciencias Naturales"
                ]
            },
            {
                "name": "Intereses y habilidades",
                "items": [
                    "Resolver problemas técnicos",
                    "Ayudar o cuidar a otras personas",
                    "Crear contenido artístico"
                ]
            },
            {
                "name": "Seguridad vocacional",
                "items": [
                    "Área de interés actual",
                    "Nivel de seguridad sobre la elección"
                ]
            }
        ]
    }


@router.post("/submit")
def submit_questionnaire():
    return {
        "status": "ok",
        "message": "Respuestas recibidas de forma referencial",
        "next_step": "Generar recomendación académica por área"
    }