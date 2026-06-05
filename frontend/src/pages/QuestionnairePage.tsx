import {
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Lightbulb,
  LineChart,
  School,
  Sparkles,
  Target,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const steps = [
  {
    title: 'Datos generales',
    description: 'Información básica no identificable.',
    icon: School,
  },
  {
    title: 'Desempeño académico',
    description: 'Percepción del rendimiento escolar.',
    icon: BookOpenCheck,
  },
  {
    title: 'Intereses y habilidades',
    description: 'Afinidad con actividades y capacidades.',
    icon: Lightbulb,
  },
  {
    title: 'Seguridad vocacional',
    description: 'Preferencias y nivel de decisión.',
    icon: Target,
  },
]

const academicItems = [
  'Matemáticas y razonamiento lógico',
  'Comunicación y lenguaje',
  'Ciencias naturales',
  'Ciencias sociales',
]

const interestItems = [
  'Resolver problemas tecnológicos',
  'Ayudar o cuidar a otras personas',
  'Organizar información o recursos',
  'Crear contenido artístico o visual',
  'Analizar datos o patrones',
]

const scaleOptions = ['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto']

function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const CurrentIcon = steps[currentStep].icon

  const progressWidths = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full']

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      return
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl"></div>
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>

      <header className="relative z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                Voc<span className="text-blue-600">AI</span>
              </h1>
              <p className="text-sm text-slate-500">
                Cuestionario académico-vocacional
              </p>
            </div>
          </div>

          <Link
            to="/login-estudiante"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16} />
              Paso {currentStep + 1} de {steps.length}
            </span>

            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">
              Completa tu perfil
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Las respuestas permiten organizar información académica y
              vocacional para generar una recomendación por áreas.
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Avance del cuestionario</span>
                <span>{(currentStep + 1) * 25}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full bg-blue-600 transition-all ${progressWidths[currentStep]}`}
                ></div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index === currentStep
                const isDone = index < currentStep

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-600'
                          : isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={20} /> : <StepIcon size={20} />}
                    </div>

                    <div>
                      <p
                        className={`font-bold ${
                          isActive ? 'text-blue-700' : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 text-emerald-600" size={22} />
              <p className="text-sm leading-6 text-emerald-800">
                No existen respuestas correctas o incorrectas. La información se
                usa solo para orientar el resultado.
              </p>
            </div>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CurrentIcon size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Sección actual
                </p>
                <h2 className="text-2xl font-extrabold text-slate-950">
                  {steps[currentStep].title}
                </h2>
              </div>
            </div>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              Versión compacta
            </span>
          </div>

          <div className="mt-7">
            {currentStep === 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="age"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Edad
                  </label>
                  <select
                    id="age"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  >
                    <option>Selecciona una opción</option>
                    <option>16 años</option>
                    <option>17 años</option>
                    <option>18 años o más</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="institution"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Tipo de institución
                  </label>
                  <select
                    id="institution"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  >
                    <option>Selecciona una opción</option>
                    <option>Pública</option>
                    <option>Privada</option>
                    <option>Fiscomisional</option>
                    <option>Municipal</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="orientation"
                    className="text-sm font-semibold text-slate-700"
                  >
                    ¿Has recibido orientación vocacional previamente?
                  </label>
                  <select
                    id="orientation"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  >
                    <option>Selecciona una opción</option>
                    <option>Sí</option>
                    <option>No</option>
                    <option>No estoy seguro/a</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <p className="text-sm leading-6 text-slate-600">
                  Indica cómo percibes tu desempeño en las siguientes áreas
                  académicas.
                </p>

                <div className="mt-6 space-y-4">
                  {academicItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <p className="font-semibold text-slate-800">{item}</p>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {scaleOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="text-sm leading-6 text-slate-600">
                  Selecciona el nivel de afinidad que tienes con las siguientes
                  actividades.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4">
                  {interestItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <p className="font-semibold text-slate-800">{item}</p>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {scaleOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="main-area"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Área de mayor interés actual
                  </label>
                  <select
                    id="main-area"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  >
                    <option>Selecciona una opción</option>
                    <option>Ingeniería y Tecnología</option>
                    <option>Ciencias de la salud</option>
                    <option>Administrativas y contables</option>
                    <option>Humanísticas y sociales</option>
                    <option>Artísticas</option>
                    <option>Ciencias exactas y agrarias</option>
                    <option>Defensa y seguridad</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="security"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Nivel de seguridad sobre tu elección
                  </label>
                  <select
                    id="security"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  >
                    <option>Selecciona una opción</option>
                    <option>Bajo</option>
                    <option>Medio</option>
                    <option>Alto</option>
                  </select>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                  <div className="flex items-start gap-3">
                    <Layers3 className="mt-1 text-blue-600" size={22} />
                    <p className="text-sm leading-6 text-slate-700">
                      Esta sección permite reconocer la preferencia declarada
                      del estudiante y contrastarla con las variables recogidas
                      en las secciones anteriores.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Siguiente sección
              </button>
            ) : (
              <Link
                to="/resultado"
                className="rounded-2xl bg-emerald-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
              >
                Ver resultado
              </Link>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default QuestionnairePage