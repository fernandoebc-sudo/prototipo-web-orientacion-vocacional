import { Link } from 'react-router-dom'

const exportOptions = [
  {
    title: 'Registros de cuestionarios',
    description:
      'Incluye datos generales, respuestas procesadas y resultado general generado por el prototipo.',
    format: 'CSV',
  },
  {
    title: 'Resultados por modelos',
    description:
      'Incluye la recomendación generada por Modelo 1, Modelo 2, porcentaje de afinidad y estado de coincidencia.',
    format: 'CSV',
  },
  {
    title: 'Métricas de modelos',
    description:
      'Incluye métricas comparativas como accuracy, precision, recall y F1-score cuando los modelos sean integrados.',
    format: 'PDF / CSV',
  },
]

function AdminExportPage() {
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
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
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
            className="block rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"
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
                Exportación de datos
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
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  Datos para análisis posterior
                </span>

                <h3 className="mt-5 text-3xl font-bold text-slate-900">
                  Descarga de registros y resultados
                </h3>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Esta sección permitirá al administrador exportar información
                  generada por el prototipo para revisión técnica, análisis de
                  resultados o entrenamiento posterior de modelos. En esta etapa,
                  los botones representan la funcionalidad prevista.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Registros</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">120</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Formatos</p>
                    <p className="mt-2 text-3xl font-bold text-blue-600">CSV</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Estado</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                      Listo
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <h4 className="font-bold text-emerald-700">
                  Consideración sobre datos
                </h4>
                <p className="mt-3 text-sm leading-6 text-emerald-800">
                  La exportación deberá respetar el tratamiento confidencial de
                  la información. El prototipo no debe incluir nombres, cédulas,
                  teléfonos ni datos que identifiquen directamente al estudiante.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-emerald-800">
                  La información exportada se usará únicamente con fines
                  académicos, técnicos y de evaluación del prototipo.
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {exportOptions.map((option) => (
                <div
                  key={option.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-bold text-slate-900">
                      {option.title}
                    </h4>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                      {option.format}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {option.description}
                  </p>

                  <button className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Exportar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h4 className="font-bold text-blue-700">Nota de desarrollo</h4>
              <p className="mt-2 text-sm leading-6 text-blue-800">
                En esta etapa, la exportación se representa de forma visual. La
                funcionalidad real se implementará posteriormente mediante el
                backend, la base de datos y los endpoints correspondientes.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminExportPage