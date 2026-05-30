import { Link } from 'react-router-dom'

function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950 px-5 py-6 text-white lg:block">
        <div>
          <h1 className="text-xl font-bold">OrientaTech</h1>
          <p className="mt-1 text-sm text-slate-400">Panel administrativo</p>
        </div>

        <nav className="mt-10 space-y-3">
          <button className="w-full rounded-2xl bg-emerald-500/10 px-4 py-3 text-left text-sm font-semibold text-emerald-300">
            Resumen general
          </button>

            <Link
            to="/admin/registros"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
            Registros
            </Link>

            <Link
            to="/admin/estadisticas"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
            Estadísticas
            </Link>

          <button className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5">
            Analítica de modelos
          </button>

          <button className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5">
            Exportación
          </button>
        </nav>

        <div className="absolute bottom-6 left-5 right-5">
          <Link
            to="/"
            className="block rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-300 transition hover:bg-white/5"
          >
            Cerrar sesión
          </Link>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Administración del prototipo
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Resumen general
              </h2>
            </div>

            <Link
              to="/"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Volver al inicio
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Cuestionarios completados
              </p>
              <h3 className="mt-3 text-4xl font-bold text-slate-900">120</h3>
              <p className="mt-2 text-sm text-emerald-600">
                Datos referenciales para vista inicial
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Área más recomendada
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Ingeniería y Tecnología
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Según registros de ejemplo
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Coincidencia entre modelos
              </p>
              <h3 className="mt-3 text-4xl font-bold text-blue-600">82%</h3>
              <p className="mt-2 text-sm text-slate-500">
                Comparación inicial estimada
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Registros exportables
              </p>
              <h3 className="mt-3 text-4xl font-bold text-emerald-600">CSV</h3>
              <p className="mt-2 text-sm text-slate-500">
                Preparado para análisis posterior
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Analítica comparativa de modelos
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Vista preliminar para comparar el comportamiento de Modelo 1
                    y Modelo 2.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  Datos de ejemplo
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      Modelo 1 - coincidencia estimada
                    </span>
                    <span className="font-bold text-blue-700">84%</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[84%] rounded-full bg-blue-600"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      Modelo 2 - coincidencia estimada
                    </span>
                    <span className="font-bold text-emerald-700">79%</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[79%] rounded-full bg-emerald-500"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Indicador</th>
                      <th className="px-4 py-3 font-semibold">Modelo 1</th>
                      <th className="px-4 py-3 font-semibold">Modelo 2</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-slate-600">
                        Recomendaciones generadas
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        120
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        120
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 text-slate-600">
                        Área más frecuente
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        Ingeniería y Tecnología
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        Ingeniería y Tecnología
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3 text-slate-600">
                        Coincidencia con resultado general
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-700">
                        84%
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">
                        79%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Distribución de áreas
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Áreas recomendadas con mayor frecuencia.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        Ingeniería y Tecnología
                      </span>
                      <span className="font-bold text-slate-900">35%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[35%] rounded-full bg-blue-600"></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        Ciencias de la salud
                      </span>
                      <span className="font-bold text-slate-900">22%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[22%] rounded-full bg-emerald-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        Humanísticas y sociales
                      </span>
                      <span className="font-bold text-slate-900">18%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[18%] rounded-full bg-slate-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <h3 className="font-bold text-emerald-700">
                  Nota de desarrollo
                </h3>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  Los valores mostrados son referenciales. En una etapa posterior,
                  esta sección se conectará con la base de datos y las métricas de
                  los modelos entrenados.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboardPage