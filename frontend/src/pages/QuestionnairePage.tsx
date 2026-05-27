import { Link } from 'react-router-dom'

function QuestionnairePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">OrientaTech</h1>
            <p className="text-sm text-slate-500">
              Cuestionario académico-vocacional
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Salir
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Paso 1 de 5
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Datos generales mínimos
          </h2>

          <p className="mt-3 max-w-3xl text-slate-600">
            Esta sección recopila información básica no identificable para
            contextualizar el perfil del estudiante dentro del prototipo.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
            <span>Progreso del cuestionario</span>
            <span>20%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[20%] rounded-full bg-blue-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-7">
                <div>
                <label
                    htmlFor="edad"
                    className="text-sm font-semibold text-slate-700"
                >
                    Edad
                </label>
                <select
                    id="edad"
                    name="edad"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                    <option>Selecciona una opción</option>
                    <option>15 años</option>
                    <option>16 años</option>
                    <option>17 años</option>
                    <option>18 años o más</option>
                </select>
                </div>
            <div>
            <label
                htmlFor="tipoInstitucion"
                className="text-sm font-semibold text-slate-700"
            >
                Tipo de institución educativa
            </label>
            <select
                id="tipoInstitucion"
                name="tipoInstitucion"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
                <option>Selecciona una opción</option>
                <option>Pública</option>
                <option>Privada</option>
                <option>Fiscomisional</option>
                <option>Municipal</option>
                <option>Otra</option>
            </select>
            </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  ¿Has recibido antes orientación vocacional?
                </label>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-4 transition hover:bg-slate-50">
                    <input type="radio" name="orientacion" />
                    <span>Sí</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-4 transition hover:bg-slate-50">
                    <input type="radio" name="orientacion" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Anterior
                </button>

                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Siguiente sección
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Secciones del cuestionario
              </h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
                  1. Datos generales
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  2. Rendimiento académico
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  3. Intereses vocacionales
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  4. Habilidades y preferencias
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  5. Seguridad vocacional
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <h3 className="font-bold text-emerald-700">Nota</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Las respuestas serán utilizadas para generar una recomendación
                académica por áreas. El resultado será orientativo y no
                reemplazará el acompañamiento de un orientador.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default QuestionnairePage