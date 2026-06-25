from pathlib import Path
import pandas as pd
import unicodedata

BASE_DIR = Path(__file__).resolve().parents[1]

RAW_DATA_PATH = BASE_DIR / "data" / "raw" / "respuestas_vocai.xlsx"
PROCESSED_DIR = BASE_DIR / "data" / "processed"
OUTPUT_DATASET_PATH = PROCESSED_DIR / "dataset_ml_vocai.csv"


COLUMN_MAP = {
    "Marca temporal": "timestamp",

    "1. ¿Aceptas participar voluntariamente en esta encuesta con fines académicos?": "consentimiento",

    "2. ¿Actualmente cursas tercero de bachillerato?": "tercero_bachillerato",

    "3. ¿Tu institución educativa está ubicada en Guayaquil?": "institucion_guayaquil",

    "4. Género": "genero",

    "5. Tipo de institución educativa": "tipo_institucion",

    "6. ¿Has participado antes en charlas, test o actividades de orientación vocacional?": "orientacion_previa",

    "7. ¿En qué materias o áreas consideras que tienes mejor desempeño académico? Marca de 1 a 3 opciones que se relacionen contigo.": "desempeno",

    "8. ¿Qué tipo de actividades te generan mayor interés? Marca de 1 a 3 opciones que se relacionen contigo.": "intereses",

    "9. ¿Qué habilidades consideras que se relacionan más contigo? Marca de 1 a 3 opciones que se relacionen contigo.": "habilidades",

    "10. ¿Qué tipo de actividades prefieres realizar? Marca de 1 a 3 opciones que se relacionen contigo.": "preferencias",

    "11. ¿Qué área académica te interesa actualmente?": "area_objetivo",

    "12. ¿Qué tan seguro/a te sientes de esa elección?": "seguridad_eleccion",

    "13. Si tuvieras que elegir una segunda área de interés, ¿cuál sería?": "segunda_area",
}


SINGLE_CHOICE_COLUMNS = [
    "genero",
]


MULTI_CHOICE_OPTIONS = {
    "desempeno": {
        "Matemáticas y razonamiento lógico.": "desempeno_matematicas_razonamiento_logico",
        "Física, química o biología.": "desempeno_fisica_quimica_biologia",
        "Lengua, lectura y comunicación.": "desempeno_lengua_lectura_comunicacion",
        "Ciencias sociales e historia.": "desempeno_ciencias_sociales_historia",
        "Informática, tecnología o programación.": "desempeno_informatica_tecnologia_programacion",
        "Arte, diseño o creatividad.": "desempeno_arte_diseno_creatividad",
        "Actividades prácticas, experimentos o trabajos fuera del aula.": "desempeno_actividades_practicas_experimentos",
    },

    "intereses": {
        "Organizar proyectos, recursos o emprendimientos.": "intereses_organizar_proyectos_recursos_emprendimientos",
        "Enseñar, orientar o comunicar ideas.": "intereses_ensenar_orientar_comunicar",
        "Crear diseños, contenidos o expresiones artísticas.": "intereses_crear_disenos_contenidos_artisticas",
        "Cuidar la salud y bienestar de las personas.": "intereses_salud_bienestar",
        "Diseñar, construir o mejorar soluciones prácticas.": "intereses_disenar_construir_soluciones",
        "Resolver problemas con tecnología o herramientas digitales.": "intereses_tecnologia_herramientas_digitales",
        "Participar en seguridad, prevención o emergencias.": "intereses_seguridad_prevencion_emergencias",
        "Investigar datos, naturaleza o fenómenos científicos.": "intereses_investigar_datos_naturaleza",
    },

    "habilidades": {
        "Organizar y planificar actividades.": "habilidades_organizar_planificar",
        "Comunicar ideas con claridad.": "habilidades_comunicar_ideas",
        "Crear ideas, diseños o soluciones nuevas.": "habilidades_crear_ideas_disenos",
        "Escuchar, ayudar o apoyar a otras personas.": "habilidades_escuchar_ayudar_apoyar",
        "Resolver problemas técnicos.": "habilidades_resolver_problemas_tecnicos",
        "Usar herramientas digitales.": "habilidades_usar_herramientas_digitales",
        "Seguir normas e instrucciones con responsabilidad.": "habilidades_seguir_normas_responsabilidad",
        "Observar detalles y analizar información.": "habilidades_observar_analizar",
    },

    "preferencias": {
        "Resolver ejercicios, problemas, cálculos o retos.": "preferencias_resolver_ejercicios_calculos",
        "Ayudar o acompañar a otras personas.": "preferencias_ayudar_acompanar",
        "Crear dibujos, diseños, videos o ideas nuevas.": "preferencias_crear_dibujos_disenos_videos",
        "Buscar información, investigar o analizar temas.": "preferencias_investigar_analizar",
        "Organizar tareas, materiales o actividades.": "preferencias_organizar_tareas_materiales",
        "Usar computadoras, aplicaciones o herramientas tecnológicas.": "preferencias_computadoras_aplicaciones",
        "Hacer actividades prácticas, experimentos o trabajos fuera del aula.": "preferencias_actividades_practicas_experimentos",
        "Seguir instrucciones, normas o procedimientos.": "preferencias_instrucciones_normas",
    },
}


TARGET_COLUMN = "area_objetivo"


def normalize_text(value):
    if pd.isna(value):
        return ""
    return str(value).strip()

def normalize_for_match(value):
    """
    Normaliza texto para comparar opciones del formulario aunque existan
    diferencias de tildes, puntos, mayúsculas o espacios.
    """
    if pd.isna(value):
        return ""

    text = str(value).lower().strip()

    text = unicodedata.normalize("NFD", text)
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")

    for char in [".", ";", ":", "\n", "\r"]:
        text = text.replace(char, " ")

    text = " ".join(text.split())

    return text

def normalize_column_names(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = df.columns.str.strip()

    missing_columns = [col for col in COLUMN_MAP.keys() if col not in df.columns]
    if missing_columns:
        raise ValueError(
            "No se encontraron estas columnas esperadas en el Excel:\n"
            + "\n".join(missing_columns)
        )

    return df.rename(columns=COLUMN_MAP)


def filter_valid_responses(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = df[col].apply(normalize_text)

    df = df[
        (df["consentimiento"] == "Sí")
        & (df["tercero_bachillerato"] == "Sí")
        & (df["institucion_guayaquil"] == "Sí")
        & (df[TARGET_COLUMN] != "")
        & (df[TARGET_COLUMN] != "Aún no estoy seguro/a")
    ]

    return df.reset_index(drop=True)


def encode_single_choice(df: pd.DataFrame, columns: list[str]) -> pd.DataFrame:
    return pd.get_dummies(df, columns=columns, prefix=columns, dtype=int)


def encode_multi_choice_by_known_options(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    for source_col, options in MULTI_CHOICE_OPTIONS.items():
        normalized_source = df[source_col].apply(normalize_for_match)

        for option_text, output_col in options.items():
            normalized_option = normalize_for_match(option_text)

            df[output_col] = normalized_source.apply(
                lambda value: int(normalized_option in value)
            )

        df = df.drop(columns=[source_col])

    return df


def prepare_dataset() -> pd.DataFrame:
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    df = pd.read_excel(RAW_DATA_PATH)

    print(f"Respuestas originales: {len(df)}")

    df = normalize_column_names(df)
    df = filter_valid_responses(df)

    print(f"Respuestas válidas para entrenamiento inicial: {len(df)}")

    columns_to_drop = [
        "timestamp",              # Campo automático generado por Google Forms.
        "consentimiento",         # Solo filtro.
        "tercero_bachillerato",   # Solo filtro.
        "institucion_guayaquil",  # Solo filtro.
        "tipo_institucion",       # No se usa como entrada principal del modelo.
        "seguridad_eleccion",     # Apoyo descriptivo.
        "segunda_area",           # Apoyo descriptivo.
    ]

    df_model = df.drop(columns=columns_to_drop, errors="ignore")

    df_model = encode_multi_choice_by_known_options(df_model)
    df_model = encode_single_choice(df_model, SINGLE_CHOICE_COLUMNS)

    target = df_model.pop(TARGET_COLUMN)
    df_model[TARGET_COLUMN] = target

    df_model.to_csv(OUTPUT_DATASET_PATH, index=False, encoding="utf-8-sig")

    print(f"Dataset procesado guardado en: {OUTPUT_DATASET_PATH}")
    print(f"Columnas finales: {df_model.shape[1]}")

    print("\nDistribución de clases:")
    print(df_model[TARGET_COLUMN].value_counts())

    print("\nPrimeras columnas generadas:")
    print(df_model.columns.tolist())

    return df_model


if __name__ == "__main__":
    prepare_dataset()