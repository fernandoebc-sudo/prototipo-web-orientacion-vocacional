import { Link } from 'react-router-dom'

function StudentLoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          <Link
            to="/"
            className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            ← Volver al inicio
          </Link>

          <span className="mt-8 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Acceso para estudiantes
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Ingresa para iniciar tu orientación académica
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Accede al cuestionario académico-vocacional y recibe una recomendación
            por áreas basada en tus intereses, habilidades y desempeño percibido.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-blue-700">1</p>
              <p className="mt-1 text-sm text-slate-600">Responde el cuestionario</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-blue-700">2</p>
              <p className="mt-1 text-sm text-slate-600">Procesa tu perfil</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">3</p>
              <p className="mt-1 text-sm text-slate-600">Muestra tu resultado</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-8 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-700">
              Cuestionario académico-vocacional
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Inicio de sesión
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Usa tus credenciales asignadas para acceder al cuestionario. Esta
              información permite mantener un registro seguro de tus respuestas.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Usuario o correo
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                placeholder="estudiante@correo.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                placeholder="********"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ingresar al cuestionario
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            El resultado será una guía inicial y no reemplaza el acompañamiento
            de un orientador o docente.
          </p>
        </div>
      </section>
    </main>
  )
}

export default StudentLoginPage