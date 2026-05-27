import { Link } from 'react-router-dom'

function StudentLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-medium text-blue-700">Acceso estudiante</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Iniciar sesión
        </h1>

        <p className="mt-3 text-slate-600">
          Ingresa tus credenciales para responder el cuestionario
          académico-vocacional.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Usuario o correo
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="estudiante@correo.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="********"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Ingresar al cuestionario
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default StudentLoginPage