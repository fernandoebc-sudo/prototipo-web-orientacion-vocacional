import {
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  LineChart,
  RefreshCw,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { StudentResult } from '../services/api'

function getStoredResult(): StudentResult | null {
  const storedResult = sessionStorage.getItem('vocai_result')

  if (!storedResult) {
    return null
  }

  try {
    return JSON.parse(storedResult) as StudentResult
  } catch (error) {
    return null
  }
}

function ResultPage() {
  const result = getStoredResult()

  if (!result) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 text-slate-900">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>

        <div className="relative z-10 max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BrainCircuit size={32} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-950">
            No hay un resultado disponible
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            Para visualizar una recomendación, primero debes completar el
            cuestionario.
          </p>

          <Link
            to="/cuestionario"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            <RefreshCw size={21} />
            Ir al cuestionario
          </Link>
        </div>
      </main>
    )
  }

  const roundedAffinity = Math.round(result.affinity)
  const affinityText = `${roundedAffinity}%`
  const model1AffinityText = `${Math.round(result.model_1.affinity)}%`
  const model2AffinityText = `${Math.round(result.model_2.affinity)}%`
  const secondaryAreas = result.secondary_areas ?? []

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl"></div>
      <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>

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
                Resultado académico por áreas
              </p>
            </div>
          </div>

          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 size={16} />
              Resultado generado y almacenado
            </span>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_0.35fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Área recomendada
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">
                  {result.recommended_area}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Tus respuestas fueron procesadas por el prototipo
                  y registradas en la base de datos. El resultado mostrado
                  corresponde a una recomendación académica por área.
                </p>
              </div>

              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-emerald-500 bg-white shadow-xl shadow-emerald-100">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-slate-950">
                    {affinityText}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Afinidad
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-1 shrink-0 text-blue-600" size={22} />
                <p className="text-sm leading-6 text-slate-700">
                  Este resultado funciona como una guía inicial para apoyar la
                  orientación académica. No reemplaza el acompañamiento de un
                  orientador, tutor o profesional educativo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-slate-200/70">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <BrainCircuit size={26} />
                </div>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  {model1AffinityText}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                {result.model_1.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Recomendación principal: {result.model_1.area}.
              </p>

              <progress
                value={Math.round(result.model_1.affinity)}
                max={100}
                aria-label={`Afinidad de ${result.model_1.name}`}
                className="mt-5 h-3 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-blue-100 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-600"
              />
            </div>

            <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-slate-200/70">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <LineChart size={26} />
                </div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                  {model2AffinityText}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                {result.model_2.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Recomendación principal: {result.model_2.area}.
              </p>

              <progress
                value={Math.round(result.model_2.affinity)}
                max={100}
                aria-label={`Afinidad de ${result.model_2.name}`}
                className="mt-5 h-3 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-emerald-100 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-emerald-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/cuestionario"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-200 bg-white px-6 py-4 font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              <RefreshCw size={21} />
              Realizar otra evaluación
            </Link>

            <a
              href="https://forms.gle/j4mzp4Vrp2bgzpdX7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-white px-6 py-4 font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              <Sparkles size={21} />
              Responder encuesta breve
            </a>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BarChart3 size={26} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Áreas secundarias
                </p>
                <h3 className="text-xl font-extrabold text-slate-950">
                  Afinidades complementarias
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {secondaryAreas.length > 0 ? (
                secondaryAreas.map((area) => (
                  <div key={area.area}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold text-slate-700">
                        {area.area}
                      </span>
                      <span className="font-bold text-slate-900">
                        {Math.round(area.affinity)}%
                      </span>
                    </div>

                    <progress
                      value={Math.round(area.affinity)}
                      max={100}
                      aria-label={`Afinidad secundaria de ${area.area}`}
                      className="h-3 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-500"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  No se identificaron áreas secundarias con una afinidad
                  suficientemente cercana al resultado principal.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex items-start gap-3">
              <Target className="mt-1 shrink-0 text-emerald-600" size={24} />
              <div>
                <h3 className="font-extrabold text-emerald-800">
                  Interpretación sugerida
                </h3>
                <p className="mt-3 text-sm leading-6 text-emerald-800">
                  La recomendación debe entenderse como apoyo para iniciar una
                  conversación de orientación. El estudiante puede revisar el
                  resultado junto con docentes, tutores u orientadores.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={26} />
              <h3 className="font-extrabold text-slate-950">
                Próximo paso recomendado
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Revisar información sobre áreas académicas afines, contrastar el
              resultado con intereses personales y solicitar acompañamiento de
              orientación cuando sea necesario.
            </p>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 shrink-0 text-blue-600" size={22} />
              <p className="text-sm leading-6 text-slate-700">
                Registro de resultado:{' '}
                <span className="font-bold">
                  #{result.recommendation_result_id}
                </span>
                . Los valores mostrados corresponden al resultado generado por
                los modelos integrados a partir de las respuestas registradas.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default ResultPage