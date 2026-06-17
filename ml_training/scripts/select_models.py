from pathlib import Path
import shutil
import json


BASE_DIR = Path(__file__).resolve().parents[1]

TRAINED_MODELS_DIR = BASE_DIR / "outputs" / "models"
BACKEND_MODELS_DIR = BASE_DIR.parent / "backend" / "app" / "ml" / "models"

# Cambia estos nombres cuando quieras reemplazar los modelos del prototipo.
MODEL_1_NAME = "svm"
MODEL_2_NAME = "xgboost"


def copy_model(source_name: str, target_name: str):
    source_path = TRAINED_MODELS_DIR / f"{source_name}_model.joblib"
    target_path = BACKEND_MODELS_DIR / f"{target_name}.joblib"

    if not source_path.exists():
        raise FileNotFoundError(f"No se encontró el modelo: {source_path}")

    shutil.copy2(source_path, target_path)
    print(f"{source_name} copiado como {target_name}.joblib")


def main():
    BACKEND_MODELS_DIR.mkdir(parents=True, exist_ok=True)

    copy_model(MODEL_1_NAME, "model_1")
    copy_model(MODEL_2_NAME, "model_2")

    shutil.copy2(
        TRAINED_MODELS_DIR / "label_encoder.joblib",
        BACKEND_MODELS_DIR / "label_encoder.joblib",
    )

    shutil.copy2(
        TRAINED_MODELS_DIR / "feature_names.joblib",
        BACKEND_MODELS_DIR / "feature_names.joblib",
    )

    metadata = {
        "model_1_name": MODEL_1_NAME,
        "model_2_name": MODEL_2_NAME,
    }

    metadata_path = BACKEND_MODELS_DIR / "model_metadata.json"
    with open(metadata_path, "w", encoding="utf-8") as file:
        json.dump(metadata, file, ensure_ascii=False, indent=4)

    print("Archivos auxiliares copiados correctamente.")
    print(f"Metadata guardada en: {metadata_path}")


if __name__ == "__main__":
    main()