import unicodedata
from typing import Any, Dict, List


def normalize_text(value: Any) -> str:
    if value is None:
        return ""

    text = str(value).lower().strip()

    text = unicodedata.normalize("NFD", text)
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")

    for char in [".", ",", ";", ":", "\n", "\r", "/", "-", "_"]:
        text = text.replace(char, " ")

    text = " ".join(text.split())

    return text


def extract_text_values(value: Any) -> List[str]:
    """
    Extrae textos desde diccionarios, listas o valores simples.
    También considera claves con valor True, útil si el frontend envía opciones como booleanos.
    """
    values = []

    if isinstance(value, dict):
        for key, item in value.items():
            if isinstance(item, bool):
                if item:
                    values.append(str(key))
            else:
                values.extend(extract_text_values(item))

    elif isinstance(value, list):
        for item in value:
            values.extend(extract_text_values(item))

    elif value is not None:
        values.append(str(value))

    return values


def contains_any(texts: List[str], patterns: List[str]) -> int:
    normalized_text = " ".join(normalize_text(text) for text in texts)

    for pattern in patterns:
        if normalize_text(pattern) in normalized_text:
            return 1

    return 0


def encode_questionnaire_answers(data) -> Dict[str, int]:
    """
    Convierte las respuestas recibidas desde el cuestionario en variables compatibles
    con el modelo entrenado.
    """
    payload = data.model_dump()

    general_texts = extract_text_values(payload.get("general_data", {}))
    academic_texts = extract_text_values(payload.get("academic_performance", {}))
    interest_skill_texts = extract_text_values(payload.get("interests_skills", {}))
    vocational_texts = extract_text_values(payload.get("vocational_security", {}))

    all_texts = general_texts + academic_texts + interest_skill_texts + vocational_texts

    encoded = {}

    # Desempeño académico
    encoded["desempeno_matematicas_razonamiento_logico"] = contains_any(
        academic_texts or all_texts,
        ["matematicas y razonamiento logico", "matematicas", "razonamiento logico"],
    )
    encoded["desempeno_fisica_quimica_biologia"] = contains_any(
        academic_texts or all_texts,
        ["fisica quimica biologia", "fisica", "quimica", "biologia"],
    )
    encoded["desempeno_lengua_lectura_comunicacion"] = contains_any(
        academic_texts or all_texts,
        ["lengua lectura comunicacion", "lengua", "lectura", "comunicacion"],
    )
    encoded["desempeno_ciencias_sociales_historia"] = contains_any(
        academic_texts or all_texts,
        ["ciencias sociales historia", "ciencias sociales", "historia"],
    )
    encoded["desempeno_informatica_tecnologia_programacion"] = contains_any(
        academic_texts or all_texts,
        ["informatica tecnologia programacion", "informatica", "programacion"],
    )
    encoded["desempeno_arte_diseno_creatividad"] = contains_any(
        academic_texts or all_texts,
        ["arte diseno creatividad", "arte", "diseno", "creatividad"],
    )
    encoded["desempeno_actividades_practicas_experimentos"] = contains_any(
        academic_texts or all_texts,
        ["actividades practicas experimentos", "actividades practicas", "experimentos"],
    )

    # Intereses
    encoded["intereses_organizar_proyectos_recursos_emprendimientos"] = contains_any(
        interest_skill_texts or all_texts,
        ["organizar proyectos recursos emprendimientos", "organizar proyectos", "emprendimientos"],
    )
    encoded["intereses_ensenar_orientar_comunicar"] = contains_any(
        interest_skill_texts or all_texts,
        ["ensenar orientar comunicar", "ensenar", "orientar", "comunicar"],
    )
    encoded["intereses_crear_disenos_contenidos_artisticas"] = contains_any(
        interest_skill_texts or all_texts,
        ["crear disenos contenidos artisticos", "crear disenos", "contenidos artisticos"],
    )
    encoded["intereses_salud_bienestar"] = contains_any(
        interest_skill_texts or all_texts,
        ["salud bienestar", "salud", "bienestar"],
    )
    encoded["intereses_disenar_construir_soluciones"] = contains_any(
        interest_skill_texts or all_texts,
        ["disenar construir soluciones", "construir soluciones"],
    )
    encoded["intereses_tecnologia_herramientas_digitales"] = contains_any(
        interest_skill_texts or all_texts,
        ["tecnologia herramientas digitales", "herramientas digitales"],
    )
    encoded["intereses_seguridad_prevencion_emergencias"] = contains_any(
        interest_skill_texts or all_texts,
        ["seguridad prevencion emergencias", "prevencion emergencias"],
    )
    encoded["intereses_investigar_datos_naturaleza"] = contains_any(
        interest_skill_texts or all_texts,
        ["investigar datos naturaleza", "investigar datos", "naturaleza"],
    )

    # Habilidades
    encoded["habilidades_organizar_planificar"] = contains_any(
        interest_skill_texts or all_texts,
        ["organizar planificar", "planificar"],
    )
    encoded["habilidades_comunicar_ideas"] = contains_any(
        interest_skill_texts or all_texts,
        ["comunicar ideas"],
    )
    encoded["habilidades_crear_ideas_disenos"] = contains_any(
        interest_skill_texts or all_texts,
        ["crear ideas disenos", "crear ideas"],
    )
    encoded["habilidades_escuchar_ayudar_apoyar"] = contains_any(
        interest_skill_texts or all_texts,
        ["escuchar ayudar apoyar", "escuchar", "apoyar"],
    )
    encoded["habilidades_resolver_problemas_tecnicos"] = contains_any(
        interest_skill_texts or all_texts,
        ["resolver problemas tecnicos", "problemas tecnicos"],
    )
    encoded["habilidades_usar_herramientas_digitales"] = contains_any(
        interest_skill_texts or all_texts,
        ["usar herramientas digitales"],
    )
    encoded["habilidades_seguir_normas_responsabilidad"] = contains_any(
        interest_skill_texts or all_texts,
        ["seguir normas responsabilidad", "seguir normas", "responsabilidad"],
    )
    encoded["habilidades_observar_analizar"] = contains_any(
        interest_skill_texts or all_texts,
        ["observar analizar", "analizar"],
    )

    # Preferencias
    encoded["preferencias_resolver_ejercicios_calculos"] = contains_any(
        interest_skill_texts or all_texts,
        ["resolver ejercicios calculos", "ejercicios calculos", "calculos"],
    )
    encoded["preferencias_ayudar_acompanar"] = contains_any(
        interest_skill_texts or all_texts,
        ["ayudar acompanar", "acompanar"],
    )
    encoded["preferencias_crear_dibujos_disenos_videos"] = contains_any(
        interest_skill_texts or all_texts,
        ["crear dibujos disenos videos", "dibujos", "videos"],
    )
    encoded["preferencias_investigar_analizar"] = contains_any(
        interest_skill_texts or all_texts,
        ["investigar analizar"],
    )
    encoded["preferencias_organizar_tareas_materiales"] = contains_any(
        interest_skill_texts or all_texts,
        ["organizar tareas materiales", "tareas materiales"],
    )
    encoded["preferencias_computadoras_aplicaciones"] = contains_any(
        interest_skill_texts or all_texts,
        ["computadoras aplicaciones", "computadoras", "aplicaciones"],
    )
    encoded["preferencias_actividades_practicas_experimentos"] = contains_any(
        interest_skill_texts or all_texts,
        ["actividades practicas experimentos", "actividades practicas", "experimentos"],
    )
    encoded["preferencias_instrucciones_normas"] = contains_any(
        interest_skill_texts or all_texts,
        ["instrucciones normas", "instrucciones", "normas"],
    )

    # Orientación vocacional previa
    general_data = payload.get("general_data", {})

    orientation_value = (
        general_data.get("vocational_orientation_previous")
        or general_data.get("orientacion_previa")
        or general_data.get("orientation")
        or ""
    )

    orientation_text = normalize_text(orientation_value)

    encoded["orientacion_previa_Sí"] = 1 if orientation_text == "si" else 0
    encoded["orientacion_previa_No"] = 1 if orientation_text == "no" else 0
    encoded["orientacion_previa_Tal vez"] = 1 if orientation_text == "tal vez" else 0

    return encoded