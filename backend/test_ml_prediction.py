from app.ml.predictor import predict_vocai, FEATURE_NAMES


def main():
    # Respuesta simulada.
    # Se colocan todas las variables en 0 y luego se activan algunas.
    encoded_answers = {feature: 0 for feature in FEATURE_NAMES}

    # Ejemplo de perfil con afinidad hacia tecnología / ingeniería.
    example_features = [
        "desempeno_matematicas_razonamiento_logico",
        "desempeno_informatica_tecnologia_programacion",
        "intereses_tecnologia_herramientas_digitales",
        "intereses_disenar_construir_soluciones",
        "habilidades_resolver_problemas_tecnicos",
        "habilidades_usar_herramientas_digitales",
        "preferencias_computadoras_aplicaciones",
        "preferencias_resolver_ejercicios_calculos",
        "orientacion_previa_Sí",
    ]

    for feature in example_features:
        if feature in encoded_answers:
            encoded_answers[feature] = 1

    result = predict_vocai(encoded_answers)

    print("\nResultado principal:")
    print("Área recomendada:", result["recommended_area"])
    print("Afinidad:", result["affinity"])

    print("\nÁreas complementarias:")
    for area in result["secondary_areas"]:
        print(area)

    print("\nModelo 1:")
    print(result["model_1"]["model_name"])
    print(result["model_1"]["predicted_area"])
    print(result["model_1"]["affinity"])

    print("\nModelo 2:")
    print(result["model_2"]["model_name"])
    print(result["model_2"]["predicted_area"])
    print(result["model_2"]["affinity"])

    print("\nInterpretación:")
    print(result["interpretation"])


if __name__ == "__main__":
    main()