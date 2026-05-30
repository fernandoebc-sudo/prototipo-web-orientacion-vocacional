import { Link } from 'react-router-dom'

const areaStats = [
  { area: 'Ingeniería y Tecnología', value: 35, color: 'bg-blue-600' },
  { area: 'Ciencias de la salud', value: 22, color: 'bg-emerald-500' },
  { area: 'Humanísticas y sociales', value: 18, color: 'bg-slate-500' },
  { area: 'Administrativas y contables', value: 12, color: 'bg-blue-400' },
  { area: 'Artísticas', value: 7, color: 'bg-emerald-400' },
  { area: 'Ciencias exactas y agrarias', value: 4, color: 'bg-slate-400' },
  { area: 'Defensa y seguridad', value: 2, color: 'bg-blue-300' },
]

const institutionStats = [
  { type: 'Pública', value: 58 },
  { type: 'Privada', value: 25 },
  { type: 'Fiscomisional', value: 12 },
  { type: 'Municipal', value: 5 },
]

function AdminStatsPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950 px-5 py-6 text-white lg:block">
        <div>
          <h1 className="text-xl font-bold">OrientaTech</h1>
          <p className="mt-1 text-sm text-slate-400">Panel administrativo</p>
        </div>

        <nav className="mt-10 space-y-3">
          <Link
            to="/admin/dashboard"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Resumen general
          </Link>

          <Link
            to="/admin/registros"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Registros
          </Link>

          <Link
            to="/admin/estadisticas"
            className="block rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"
          >
            Estadísticas
          </Link>

          <Link
            to="/admin/analitica-modelos"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Analítica de modelos
          </Link>

          <Link
            to="/admin/exportacion"
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Exportación
          </Link>
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
                Estadísticas generales
              </h2>
            </div>

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Volver al resumen
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Cuestionarios procesados
              </p>
              <h3 className="mt-3 text-4xl font-bold text-slate-900">120</h3>
              <p className="mt-2 text-sm text-slate-500">Registros de ejemplo</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Área más frecuente
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Ingeniería y Tecnología
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Mayor porcentaje referencial
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Coincidencia entre modelos
              </p>
              <h3 className="mt-3 text-4xl font-bold text-emerald-600">82%</h3>
              <p className="mt-2 text-sm text-slate-500">
                Coincidencia general estimada
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Diferencias entre modelos
              </p>
              <h3 className="mt-3 text-4xl font-bold text-blue-600">18%</h3>
              <p className="mt-2 text-sm text-slate-500">
                Casos con resultados distintos
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Distribución de áreas recomendadas
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Vista agregada de las áreas académicas con mayor presencia en
                  los resultados generados.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {areaStats.map((item) => (
                  <div key={item.area}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {item.area}
                      </span>
                      <span className="font-bold text-slate-900">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Tipo de institución
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Distribución referencial de registros por institución.
                </p>

                <div className="mt-6 space-y-5">
                  {institutionStats.map((item) => (
                    <div key={item.type}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          {item.type}
                        </span>
                        <span className="font-bold text-slate-900">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <h3 className="font-bold text-blue-700">
                  Uso de la información
                </h3>
                <p className="mt-2 text-sm leading-6 text-blue-800">
                  Esta vista permitirá revisar tendencias generales del
                  prototipo. Los valores actuales son referenciales y serán
                  reemplazados por datos reales cuando se conecte la base de
                  datos.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminStatsPage