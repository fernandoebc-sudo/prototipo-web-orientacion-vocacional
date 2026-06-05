import {
  BarChart3,
  BrainCircuit,
  GraduationCap,
  LineChart,
  LogIn,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl"></div>
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>

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
                Prototipo web de orientación vocacional
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-3 md:flex">
            <Link
              to="/login-estudiante"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Estudiante
            </Link>

            <Link
              to="/login-admin"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Administrador
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <Sparkles size={16} />
            Recomendación académica por áreas
          </span>

          <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
            Orientación vocacional apoyada en{' '}
            <span className="text-blue-600">Machine Learning</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            VocAI permite que el estudiante responda un cuestionario
            académico-vocacional y reciba una recomendación por área,
            acompañada de un nivel de afinidad y una explicación breve.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/login-estudiante"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <GraduationCap size={22} />
              Ingresar como estudiante
            </Link>

            <Link
              to="/login-admin"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-200 bg-white px-6 py-4 font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              <ShieldCheck size={22} />
              Acceso administrador
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <Target className="mx-auto text-blue-600" size={26} />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Perfil académico
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <LineChart className="mx-auto text-emerald-600" size={26} />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Afinidad
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <BrainCircuit className="mx-auto text-blue-600" size={26} />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Modelo 1 y 2
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <BarChart3 className="mx-auto text-emerald-600" size={26} />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Analítica
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <LineChart size={24} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Vista previa del resultado
              </p>
              <h3 className="text-xl font-bold text-slate-950">
                Recomendación generada
              </h3>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50 p-6">
            <p className="text-sm font-semibold text-slate-500">
              Área recomendada
            </p>

            <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-3xl font-extrabold text-slate-950">
                  Ingeniería y Tecnología
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Afinidad con solución de problemas, análisis lógico y uso de
                  herramientas digitales.
                </p>
              </div>

              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[10px] border-emerald-500 bg-white shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-slate-950">84%</p>
                  <p className="text-xs font-medium text-slate-500">
                    Afinidad
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-950">Modelo 1</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Recomendación por afinidad académica-vocacional
                  </p>
                </div>

                <span className="rounded-2xl bg-white px-5 py-3 text-xl font-extrabold text-blue-700 shadow-sm">
                  84%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-[84%] rounded-full bg-blue-600"></div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-950">Modelo 2</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Comparación referencial del segundo modelo
                  </p>
                </div>

                <span className="rounded-2xl bg-white px-5 py-3 text-xl font-extrabold text-emerald-700 shadow-sm">
                  79%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-[79%] rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <LogIn className="mt-1 text-slate-500" size={20} />
            <p className="text-sm leading-6 text-slate-600">
              Los porcentajes representan un nivel estimado de afinidad. El
              resultado funciona como apoyo y no reemplaza el acompañamiento de
              un orientador.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage