import {
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Download,
  GraduationCap,
  Lightbulb,
  LineChart,
  RefreshCw,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const secondaryAreas = [
  {
    name: 'Ciencias exactas y agrarias',
    value: '72%',
    width: 'w-[72%]',
    color: 'bg-blue-500',
  },
  {
    name: 'Administrativas y contables',
    value: '64%',
    width: 'w-[64%]',
    color: 'bg-emerald-500',
  },
  {
    name: 'Humanísticas y sociales',
    value: '58%',
    width: 'w-[58%]',
    color: 'bg-slate-500',
  },
]

function ResultPage() {
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
              Resultado referencial generado
            </span>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_0.35fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Área recomendada
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">
                  Ingeniería y Tecnología
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Tus respuestas muestran afinidad con actividades relacionadas
                  con tecnología, solución de problemas, análisis lógico y diseño
                  de soluciones.
                </p>
              </div>

              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-emerald-500 bg-white shadow-xl shadow-emerald-100">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-slate-950">84%</p>
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
                  84%
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                Modelo 1
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Recomendación principal: Ingeniería y Tecnología.
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-[84%] rounded-full bg-blue-600"></div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-slate-200/70">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <LineChart size={26} />
                </div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                  79%
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                Modelo 2
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Recomendación principal: Ingeniería y Tecnología.
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-[79%] rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cuestionario"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-200 bg-white px-6 py-4 font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              <RefreshCw size={21} />
              Realizar otra evaluación
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <Download size={21} />
              Guardar resultado
            </button>
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
              {secondaryAreas.map((area) => (
                <div key={area.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      {area.name}
                    </span>
                    <span className="font-bold text-slate-900">
                      {area.value}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${area.color} ${area.width}`}
                    ></div>
                  </div>
                </div>
              ))}
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
                Los valores mostrados son referenciales para la versión inicial
                del prototipo y serán reemplazados por resultados generados a
                partir de los modelos integrados.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default ResultPage