from pathlib import Path
import json
import numpy as np
import pandas as pd
import joblib


BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

MODEL_1_PATH = MODELS_DIR / "model_1.joblib"
MODEL_2_PATH = MODELS_DIR / "model_2.joblib"
LABEL_ENCODER_PATH = MODELS_DIR / "label_encoder.joblib"
FEATURE_NAMES_PATH = MODELS_DIR / "feature_names.joblib"
METADATA_PATH = MODELS_DIR / "model_metadata.json"


def load_ml_resources():
    """
    Carga los modelos y archivos auxiliares necesarios para generar predicciones.
    """
    model_1 = joblib.load(MODEL_1_PATH)
    model_2 = joblib.load(MODEL_2_PATH)
    label_encoder = joblib.load(LABEL_ENCODER_PATH)
    feature_names = joblib.load(FEATURE_NAMES_PATH)

    if METADATA_PATH.exists():
        with open(METADATA_PATH, "r", encoding="utf-8") as file:
            metadata = json.load(file)
    else:
        metadata = {
            "model_1_name": "modelo_1",
            "model_2_name": "modelo_2",
        }

    return model_1, model_2, label_encoder, feature_names, metadata


MODEL_1, MODEL_2, LABEL_ENCODER, FEATURE_NAMES, METADATA = load_ml_resources()


def build_feature_dataframe(encoded_answers: dict) -> pd.DataFrame:
    """
    Construye un DataFrame con el mismo orden de columnas usado durante el entrenamiento.

    encoded_answers debe tener como claves los nombres de las variables del modelo.
    Si alguna variable no llega desde el formulario, se coloca 0 por defecto.
    """
    row = {}

    for feature in FEATURE_NAMES:
        value = encoded_answers.get(feature, 0)
        row[feature] = int(value)

    return pd.DataFrame([row], columns=FEATURE_NAMES)


def get_model_probabilities(model, X: pd.DataFrame) -> np.ndarray:
    """
    Obtiene probabilidades del modelo.
    Los modelos seleccionados deben tener predict_proba.
    """
    if hasattr(model, "predict_proba"):
        return model.predict_proba(X)[0]

    raise ValueError("El modelo seleccionado no permite obtener probabilidades.")


def format_model_prediction(model_name: str, probabilities: np.ndarray) -> dict:
    """
    Convierte las probabilidades del modelo en un resultado legible.
    """
    best_index = int(np.argmax(probabilities))
    predicted_area = LABEL_ENCODER.inverse_transform([best_index])[0]
    affinity = round(float(probabilities[best_index]) * 100, 2)

    all_areas = []

    for index, probability in enumerate(probabilities):
        area = LABEL_ENCODER.inverse_transform([index])[0]
        all_areas.append(
            {
                "area": area,
                "affinity": round(float(probability) * 100, 2),
            }
        )

    all_areas = sorted(
        all_areas,
        key=lambda item: item["affinity"],
        reverse=True,
    )

    return {
        "model_name": model_name,
        "predicted_area": predicted_area,
        "affinity": affinity,
        "all_areas": all_areas,
    }


def get_secondary_areas(main_prediction: dict) -> list:
    """
    Obtiene áreas complementarias a partir del Modelo 1.

    Regla:
    - máximo 2 áreas secundarias;
    - afinidad mínima de 40%;
    - diferencia máxima de 25 puntos frente al área principal.
    """
    main_area = main_prediction["predicted_area"]
    main_affinity = main_prediction["affinity"]

    secondary_areas = []

    for item in main_prediction["all_areas"]:
        area = item["area"]
        affinity = item["affinity"]

        if area == main_area:
            continue

        difference = main_affinity - affinity

        if affinity >= 40 and difference <= 25:
            secondary_areas.append(item)

        if len(secondary_areas) == 2:
            break

    return secondary_areas


def build_interpretation(main_area: str, affinity: float, secondary_areas: list) -> str:
    """
    Genera un mensaje breve y prudente para mostrar al estudiante.
    """
    if secondary_areas:
        secondary_names = ", ".join([item["area"] for item in secondary_areas])
        return (
            f"Según las respuestas registradas, el área con mayor afinidad es "
            f"{main_area}, con un nivel estimado de {affinity}%. "
            f"También se identifican afinidades complementarias con {secondary_names}. "
            f"Este resultado es orientativo y debe entenderse como un apoyo para la toma "
            f"de decisiones académicas."
        )

    return (
        f"Según las respuestas registradas, el área con mayor afinidad es "
        f"{main_area}, con un nivel estimado de {affinity}%. "
        f"Este resultado es orientativo y debe entenderse como un apoyo para la toma "
        f"de decisiones académicas."
    )


def predict_vocai(encoded_answers: dict) -> dict:
    X = build_feature_dataframe(encoded_answers)

    probabilities_model_1 = get_model_probabilities(MODEL_1, X)
    probabilities_model_2 = get_model_probabilities(MODEL_2, X)

    prediction_model_1 = format_model_prediction(
        METADATA.get("model_1_name", "modelo_1"),
        probabilities_model_1,
    )

    prediction_model_2 = format_model_prediction(
        METADATA.get("model_2_name", "modelo_2"),
        probabilities_model_2,
    )

    main_area = prediction_model_1["predicted_area"]
    main_affinity = prediction_model_1["affinity"]

    secondary_areas = get_secondary_areas(prediction_model_1)

    interpretation = build_interpretation(
        main_area=main_area,
        affinity=main_affinity,
        secondary_areas=secondary_areas,
    )

    return {
        "recommended_area": main_area,
        "affinity": main_affinity,
        "secondary_areas": secondary_areas,
        "interpretation": interpretation,
        "model_1": prediction_model_1,
        "model_2": prediction_model_2,
    }