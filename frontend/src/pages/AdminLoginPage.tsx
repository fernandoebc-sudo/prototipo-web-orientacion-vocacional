import { Link } from 'react-router-dom'

function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          <Link
            to="/"
            className="inline-flex text-sm font-medium text-emerald-300 hover:text-emerald-200"
          >
            ← Volver al inicio
          </Link>

          <span className="mt-8 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
            Panel administrativo
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Gestión y analítica del prototipo
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            El administrador puede revisar registros, resultados generados y la
            comparación entre los modelos XGBoost y MLP integrados al sistema.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-bold text-white">
              Funciones administrativas
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-400"></div>
                <p className="text-slate-300">
                  Consulta de cuestionarios y resultados registrados.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-3 w-3 rounded-full bg-blue-400"></div>
                <p className="text-slate-300">
                  Visualización de analítica comparativa de modelos.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-400"></div>
                <p className="text-slate-300">
                  Exportación de datos para revisión técnica posterior.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-8 text-slate-800 shadow-2xl">
          <div className="mb-8 rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm font-medium text-emerald-700">
              Acceso restringido
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Iniciar sesión como administrador
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Ingresa tus credenciales para acceder al panel interno del sistema.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Usuario
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="********"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Ingresar al panel
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            El acceso administrativo permite gestionar registros y revisar la
            analítica de los modelos.
          </p>
        </div>
      </section>
    </main>
  )
}

export default AdminLoginPage