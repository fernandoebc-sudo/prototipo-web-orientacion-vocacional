import {
  BarChart3,
  BrainCircuit,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import studentIllustration from '../assets/student-vocai-illustration.png'

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
                Conectando tu potencial con el mañana
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

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1fr_0.85fr] lg:py-20">
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
            académico y reciba una recomendación por área,
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
                Análisis
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-blue-100 blur-3xl"></div>
          <div className="absolute -bottom-10 left-4 h-44 w-44 rounded-full bg-emerald-100 blur-3xl"></div>

          <img
            src={studentIllustration}
            alt="Ilustración de estudiante respondiendo un cuestionario académico-vocacional"
            className="relative z-10 mx-auto max-h-[610px] w-full max-w-[590px] object-contain drop-shadow-xl"
          />

          <div className="relative z-20 -mt-10 w-full max-w-[500px] rounded-3xl border border-blue-100 bg-white/90 p-5 shadow-xl shadow-slate-200/70 backdrop-blur">
            <p className="text-sm font-semibold text-blue-700">
              Cuestionario académico vocacional
            </p>

            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              Explora áreas de acuerdo a tu perfil
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              El sistema organiza las respuestas del estudiante para apoyar la
              recomendación académica.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage