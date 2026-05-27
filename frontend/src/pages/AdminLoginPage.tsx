import { Link } from 'react-router-dom'

function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6">
      <section className="w-full max-w-md rounded-3xl border border-slate-700 bg-white p-8 shadow-xl">
        <p className="text-sm font-medium text-emerald-600">
          Acceso administrador
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Panel administrativo
        </h1>

        <p className="mt-3 text-slate-600">
          Ingresa tus credenciales para revisar registros, resultados y analítica
          comparativa de modelos.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Usuario
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              placeholder="********"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Ingresar al panel
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default AdminLoginPage