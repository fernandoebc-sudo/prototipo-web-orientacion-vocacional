import { useState } from 'react'
import { Link } from 'react-router-dom'

const academicAreas = [
  'Matemáticas o Física',
  'Comunicación y lenguaje',
  'Ciencias sociales',
  'Ciencias naturales',
  'Informática o Tecnología',
  'Arte o creatividad',
  'Actividades prácticas o campo',
]

const interestAreas = [
  'Administración y proyectos',
  'Orientar o enseñar',
  'Arte y creatividad',
  'Salud y bienestar',
  'Tecnología y solución técnica',
  'Seguridad y emergencias',
  'Ciencia, datos y ambiente',
]

const skills = [
  'Organización',
  'Comunicación',
  'Creatividad',
  'Empatía',
  'Solución técnica',
  'Uso de herramientas digitales',
  'Autocontrol',
  'Análisis de datos u observación',
]

const preferredActivities = [
  'Resolver problemas',
  'Ayudar a personas',
  'Crear cosas nuevas',
  'Investigar o analizar información',
  'Organizar tareas o recursos',
  'Usar tecnología',
  'Trabajar en campo o laboratorio',
  'Seguir normas y procedimientos',
]

const steps = [
  'Datos generales',
  'Desempeño académico',
  'Intereses y habilidades',
  'Seguridad vocacional',
]

function ScaleRow({
  label,
  options,
  name,
}: {
  label: string
  options: string[]
  name: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="font-medium text-slate-800">{label}</p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-center text-sm text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <input type="radio" name={name} className="sr-only" />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const progress = ((currentStep + 1) / steps.length) * 100

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">OrientaTech</h1>
            <p className="text-sm text-slate-500">
              Cuestionario académico-vocacional
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Salir
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Paso {currentStep + 1} de {steps.length}
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            {steps[currentStep]}
          </h2>

          <p className="mt-3 max-w-3xl text-slate-600">
            Responde según tus intereses, habilidades y preferencias actuales.
            No existen respuestas correctas o incorrectas.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
            <span>Progreso del cuestionario</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            {currentStep === 0 && (
              <div className="space-y-7">
                <div>
                  <label
                    htmlFor="edad"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Edad
                  </label>
                  <select
                    id="edad"
                    name="edad"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Selecciona una opción</option>
                    <option>16 años</option>
                    <option>17 años</option>
                    <option>18 años o más</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tipoInstitucion"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Tipo de institución educativa
                  </label>
                  <select
                    id="tipoInstitucion"
                    name="tipoInstitucion"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Selecciona una opción</option>
                    <option>Pública</option>
                    <option>Privada</option>
                    <option>Fiscomisional</option>
                    <option>Municipal</option>
                    <option>Otra</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    ¿Has participado antes en charlas, test o actividades de
                    orientación vocacional?
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {['Sí', 'No', 'Tal vez'].map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-4 transition hover:bg-slate-50"
                      >
                        <input type="radio" name="orientacionPrevia" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-5">
                <p className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                  Indica cómo consideras tu desempeño en las siguientes áreas
                  académicas.
                </p>

                {academicAreas.map((area, index) => (
                  <ScaleRow
                    key={area}
                    label={area}
                    name={`academic-${index}`}
                    options={['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto']}
                  />
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Nivel de interés en actividades
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Selecciona tu nivel de interés en cada tipo de actividad.
                  </p>

                  <div className="mt-5 space-y-5">
                    {interestAreas.map((area, index) => (
                      <ScaleRow
                        key={area}
                        label={area}
                        name={`interest-${index}`}
                        options={[
                          'Ninguno',
                          'Poco',
                          'Medio',
                          'Alto',
                          'Mucho',
                        ]}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    Habilidades personales
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Indica qué tan identificadas sientes estas habilidades
                    contigo.
                  </p>

                  <div className="mt-5 space-y-5">
                    {skills.map((skill, index) => (
                      <ScaleRow
                        key={skill}
                        label={skill}
                        name={`skill-${index}`}
                        options={['Nada', 'Poco', 'Medio', 'Bastante', 'Mucho']}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    Actividades preferidas
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Puedes seleccionar más de una opción.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {preferredActivities.map((activity) => (
                      <label
                        key={activity}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-4 transition hover:bg-slate-50"
                      >
                        <input type="checkbox" />
                        <span>{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-7">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <h3 className="font-bold text-emerald-700">
                    Último paso antes del resultado
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-800">
                    Esta información ayuda a contextualizar el resultado y el
                    mensaje de orientación que recibirá el estudiante.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    ¿Qué tan seguro/a te sientes sobre tu futura elección
                    académica?
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-5">
                    {[
                      'Muy inseguro/a',
                      'Inseguro/a',
                      'Neutral',
                      'Seguro/a',
                      'Muy seguro/a',
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 p-4 text-center text-sm transition hover:bg-slate-50"
                      >
                        <input
                          type="radio"
                          name="seguridadVocacional"
                          className="sr-only"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-900">
                    ¿Qué ocurrirá después?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Las respuestas serán procesadas por dos modelos de Machine
                    Learning. Luego se mostrará una recomendación académica por
                    áreas, junto con el porcentaje de afinidad y una explicación
                    breve.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 0}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Siguiente sección
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Generar recomendación
                </button>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Secciones del cuestionario
              </h3>

              <div className="mt-5 space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`w-full rounded-2xl p-4 text-left text-sm font-medium transition ${
                      currentStep === index
                        ? 'bg-blue-50 text-blue-700'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {index + 1}. {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="font-bold text-emerald-700">Nota</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                El prototipo no recomienda carreras específicas. Su finalidad es
                orientar al estudiante hacia áreas académicas generales.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default QuestionnairePage