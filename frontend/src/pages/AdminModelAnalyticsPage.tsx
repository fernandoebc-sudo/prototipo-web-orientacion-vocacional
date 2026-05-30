    import { Link } from 'react-router-dom'

const modelMetrics = [
  {
    metric: 'Accuracy',
    model1: '84%',
    model2: '79%',
    description: 'Proporción general de predicciones correctas.',
  },
  {
    metric: 'Precision macro',
    model1: '82%',
    model2: '77%',
    description: 'Precisión promedio considerando todas las clases.',
  },
  {
    metric: 'Recall macro',
    model1: '81%',
    model2: '75%',
    description: 'Capacidad promedio para identificar cada área correctamente.',
  },
  {
    metric: 'F1-score macro',
    model1: '83%',
    model2: '76%',
    description: 'Equilibrio entre precision y recall por clase.',
  },
]

const confusionRows = [
  {
    area: 'Ingeniería y Tecnología',
    model1: 'Alta coincidencia',
    model2: 'Media coincidencia',
  },
  {
    area: 'Ciencias de la salud',
    model1: 'Media coincidencia',
    model2: 'Alta coincidencia',
  },
  {
    area: 'Humanísticas y sociales',
    model1: 'Media coincidencia',
    model2: 'Media coincidencia',
  },
  {
    area: 'Ciencias exactas y agrarias',
    model1: 'Alta coincidencia',
    model2: 'Media coincidencia',
  },
]

function AdminModelAnalyticsPage() {
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
            className="block rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"
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
                Analítica comparativa de modelos
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
                Mejor desempeño referencial
              </p>
              <h3 className="mt-3 text-3xl font-bold text-blue-600">
                Modelo 1
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Según métricas visuales de ejemplo
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                F1-score macro
              </p>
              <h3 className="mt-3 text-4xl font-bold text-slate-900">83%</h3>
              <p className="mt-2 text-sm text-blue-600">
                Resultado referencial del Modelo 1
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
                Casos con diferencia
              </p>
              <h3 className="mt-3 text-4xl font-bold text-blue-600">18%</h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultados distintos entre modelos
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Comparación de métricas
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Espacio reservado para comparar los modelos una vez
                    entrenados e integrados.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  Valores referenciales
                </span>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Métrica</th>
                      <th className="px-4 py-3 font-semibold">Modelo 1</th>
                      <th className="px-4 py-3 font-semibold">Modelo 2</th>
                      <th className="px-4 py-3 font-semibold">Descripción</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {modelMetrics.map((item) => (
                      <tr key={item.metric}>
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          {item.metric}
                        </td>
                        <td className="px-4 py-4 font-bold text-blue-700">
                          {item.model1}
                        </td>
                        <td className="px-4 py-4 font-bold text-emerald-700">
                          {item.model2}
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <h4 className="font-bold text-blue-700">
                    Interpretación preliminar
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-blue-800">
                    La interfaz contempla la comparación de métricas para apoyar
                    la selección del modelo con mejor desempeño. Los valores
                    actuales son de ejemplo y serán reemplazados durante la
                    integración con el módulo de Machine Learning.
                  </p>
                </div>

                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                  <h4 className="font-bold text-emerald-700">
                    Uso administrativo
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-emerald-800">
                    Esta vista permitirá al administrador revisar el rendimiento
                    de los modelos, identificar diferencias y analizar la
                    consistencia de las recomendaciones generadas.
                  </p>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Coincidencia por áreas
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Vista preliminar de comportamiento por área recomendada.
                </p>

                <div className="mt-6 space-y-4">
                  {confusionRows.map((item) => (
                    <div
                      key={item.area}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="font-semibold text-slate-900">
                        {item.area}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-blue-50 p-3">
                          <p className="font-medium text-blue-700">Modelo 1</p>
                          <p className="mt-1 text-blue-800">{item.model1}</p>
                        </div>

                        <div className="rounded-xl bg-emerald-50 p-3">
                          <p className="font-medium text-emerald-700">
                            Modelo 2
                          </p>
                          <p className="mt-1 text-emerald-800">
                            {item.model2}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">
                  Matriz de confusión
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  En una etapa posterior, esta sección mostrará la matriz de
                  confusión generada a partir de las clases reales y las clases
                  predichas por cada modelo.
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-3 font-bold ${
                        index % 5 === 0
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {index % 5 === 0 ? '✓' : '-'}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminModelAnalyticsPage