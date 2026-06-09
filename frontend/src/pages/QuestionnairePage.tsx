import {
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  School,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const steps = [
  {
    title: 'Datos generales',
    description: 'Consentimiento e información básica no identificable.',
    icon: School,
  },
  {
    title: 'Desempeño e intereses',
    description: 'Áreas de mejor desempeño e intereses principales.',
    icon: BookOpenCheck,
  },
  {
    title: 'Habilidades y preferencias',
    description: 'Habilidades personales y actividades preferidas.',
    icon: Lightbulb,
  },
]

const progressWidths = ['w-1/3', 'w-2/3', 'w-full']

const genderOptions = [
  'Masculino',
  'Femenino',
  'Prefiero no decirlo',
  'Otro',
]

const orientationOptions = [
  'Sí',
  'No',
  'No estoy seguro/a',
]

const academicPerformanceOptions = [
  'Matemáticas y razonamiento lógico',
  'Física, química o biología',
  'Lengua, lectura y comunicación',
  'Ciencias sociales e historia',
  'Informática, tecnología o programación',
  'Arte, diseño o creatividad',
  'Actividades prácticas, experimentos o trabajo fuera del aula',
]

const interestOptions = [
  'Organizar proyectos, recursos o emprendimientos',
  'Enseñar, orientar o comunicar ideas',
  'Crear diseños, contenidos o expresiones artísticas',
  'Cuidar la salud y bienestar de las personas',
  'Resolver problemas con tecnología o herramientas digitales',
  'Participar en seguridad, prevención o emergencias',
  'Investigar datos, naturaleza o fenómenos científicos',
]

const skillOptions = [
  'Organización y planificación',
  'Comunicación',
  'Creatividad',
  'Empatía o apoyo a otras personas',
  'Solución de problemas técnicos',
  'Uso de herramientas digitales',
  'Autocontrol y seguimiento de normas',
  'Análisis de datos u observación',
]

const preferredActivityOptions = [
  'Resolver ejercicios, problemas o retos',
  'Ayudar o acompañar a otras personas',
  'Crear dibujos, diseños, videos o ideas nuevas',
  'Buscar información, investigar o analizar temas',
  'Organizar tareas, materiales o actividades',
  'Usar computadoras, aplicaciones o herramientas tecnológicas',
  'Hacer actividades prácticas, experimentos o trabajos fuera del aula',
  'Seguir instrucciones, normas o procedimientos',
]

type MultiSelectField =
  | 'academicPerformance'
  | 'interests'
  | 'skills'
  | 'preferredActivities'

function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    consent: '',
    gender: '',
    orientation: '',
    academicPerformance: [] as string[],
    interests: [] as string[],
    skills: [] as string[],
    preferredActivities: [] as string[],
  })

  const CurrentIcon = steps[currentStep].icon
  const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100)

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const selectSingleAnswer = (field: 'consent' | 'gender' | 'orientation', value: string) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [field]: value,
    }))
  }

  const toggleMultiAnswer = (field: MultiSelectField, value: string) => {
    setAnswers((previousAnswers) => {
      const currentValues = previousAnswers[field]

      if (currentValues.includes(value)) {
        return {
          ...previousAnswers,
          [field]: currentValues.filter((item) => item !== value),
        }
      }

      if (currentValues.length >= 3) {
        return previousAnswers
      }

      return {
        ...previousAnswers,
        [field]: [...currentValues, value],
      }
    })
  }

  const getSingleOptionClass = (selected: boolean) =>
    `rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
      selected
        ? 'border-blue-300 bg-blue-50 text-blue-700'
        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50'
    }`

  const getMultiOptionClass = (selected: boolean) =>
    `rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
      selected
        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50'
    }`

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
                <span>{progressPercentage}%</span>
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
                utiliza únicamente con fines académicos y no solicita datos
                directamente identificables.
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
              <div className="space-y-7">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    ¿Aceptas participar voluntariamente?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    La participación es voluntaria y la información será utilizada
                    únicamente con fines académicos.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {['Sí, acepto participar', 'No acepto participar'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectSingleAnswer('consent', option)}
                        className={getSingleOptionClass(answers.consent === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">Género</h3>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {genderOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectSingleAnswer('gender', option)}
                        className={getSingleOptionClass(answers.gender === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    ¿Has recibido orientación vocacional o profesional?
                  </h3>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {orientationOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectSingleAnswer('orientation', option)}
                        className={getSingleOptionClass(answers.orientation === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-7">
                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ¿En qué asignaturas o áreas consideras que tienes mejor desempeño?
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Selecciona máximo 3 opciones.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
                      {answers.academicPerformance.length}/3 seleccionadas
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {academicPerformanceOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiAnswer('academicPerformance', option)}
                        className={getMultiOptionClass(
                          answers.academicPerformance.includes(option),
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ¿Qué tipo de actividades te generan mayor interés?
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Selecciona máximo 3 opciones.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
                      {answers.interests.length}/3 seleccionadas
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {interestOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiAnswer('interests', option)}
                        className={getMultiOptionClass(answers.interests.includes(option))}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-7">
                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ¿Qué habilidades consideras que se relacionan más contigo?
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Selecciona máximo 3 opciones.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
                      {answers.skills.length}/3 seleccionadas
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {skillOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiAnswer('skills', option)}
                        className={getMultiOptionClass(answers.skills.includes(option))}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ¿Qué tipo de actividades prefieres realizar?
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Selecciona máximo 3 opciones.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
                      {answers.preferredActivities.length}/3 seleccionadas
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {preferredActivityOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiAnswer('preferredActivities', option)}
                        className={getMultiOptionClass(
                          answers.preferredActivities.includes(option),
                        )}
                      >
                        {option}
                      </button>
                    ))}
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