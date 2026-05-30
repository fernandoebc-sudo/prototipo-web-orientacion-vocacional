import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">OrientaTech</h1>
            <p className="text-sm text-slate-500">
              Prototipo web de orientación vocacional
            </p>
          </div>

          <Link
            to="/login-admin"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Acceso administrador
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Recomendación académica por áreas
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Orientación vocacional apoyada en Machine Learning
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Este prototipo permite que el estudiante responda un cuestionario
            académico-vocacional y reciba una recomendación por área, acompañada
            de un porcentaje de afinidad y una explicación breve.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login-estudiante"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ingresar como estudiante
            </Link>

            <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
              Ver información del sistema
            </button>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            El sistema funciona como herramienta de apoyo y no reemplaza el
            acompañamiento de un orientador o docente.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Vista previa del resultado
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  Ingeniería y Tecnología
                </h3>
              </div>

              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
                84%
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Modelo 1
                  </span>
                  <span className="font-semibold text-blue-700">84%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[84%] rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">Modelo 2</span>
                  <span className="font-semibold text-emerald-600">79%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[79%] rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm leading-6 text-slate-600">
                Tus respuestas muestran afinidad con actividades relacionadas
                con resolución de problemas, uso de tecnología, análisis lógico
                y diseño de soluciones.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-xs text-slate-500">Modelos ML</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">7</p>
              <p className="text-xs text-slate-500">Áreas</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Analítica</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage