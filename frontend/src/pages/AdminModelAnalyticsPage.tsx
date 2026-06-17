import {
  Activity,
  AlertCircle,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  GitCompare,
  Grid3X3,
  LineChart,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import {
  getAdminModelAnalytics,
  type AdminModelAnalyticsResponse,
  type AdminAreaSummaryItem,
} from '../services/api'

function formatPercentage(value: number | undefined | null) {
  if (value === undefined || value === null) {
    return '0%'
  }

  const normalizedValue = value <= 1 ? value * 100 : value
  const roundedValue = Number(normalizedValue.toFixed(2))

  return `${roundedValue}%`
}

function getPerformanceLabel(value: number | undefined | null) {
  const normalizedValue = value ?? 0

  if (normalizedValue >= 0.75 || normalizedValue >= 75) {
    return 'Alta'
  }

  if (normalizedValue >= 0.5 || normalizedValue >= 50) {
    return 'Media'
  }

  if (normalizedValue > 0) {
    return 'Baja'
  }

  return 'Sin datos'
}

function getPerformanceClass(value: number | undefined | null) {
  const normalizedValue = value ?? 0

  if (normalizedValue >= 0.75 || normalizedValue >= 75) {
    return 'bg-blue-50 text-blue-700'
  }

  if (normalizedValue >= 0.5 || normalizedValue >= 50) {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (normalizedValue > 0) {
    return 'bg-amber-50 text-amber-700'
  }

  return 'bg-slate-100 text-slate-600'
}

function buildAreaItems(
  areas: AdminAreaSummaryItem[],
): AdminAreaSummaryItem[] {
  if (areas.length > 0) {
    return areas
  }

  return [
    {
      area: 'Sin registros disponibles',
      total: 0,
      average_affinity: 0,
    },
  ]
}

function AdminModelAnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<AdminModelAnalyticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const response = await getAdminModelAnalytics()

        setAnalytics(response)
      } catch {
        setErrorMessage(
          'No se pudo cargar la analítica de modelos. Verifica que el backend esté activo y que la sesión administrativa siga vigente.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const bestModelLabel = analytics?.best_model?.label ?? 'Modelo principal'
  const bestModelName = analytics?.best_model?.name ?? 'Sin datos'
  const bestModelF1 = formatPercentage(analytics?.best_model?.f1_macro)

  const agreementPercentage = analytics?.agreement_percentage ?? 0
  const disagreementPercentage = analytics?.disagreement_percentage ?? 0

  const model1Name = analytics?.model_1?.name ?? 'Modelo 1'
  const model2Name = analytics?.model_2?.name ?? 'Modelo 2'

  const areaItems = buildAreaItems(analytics?.area_summary ?? [])

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <AdminSidebar />

      <section className="lg:pl-72">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <Sparkles size={16} />
                Administración del prototipo
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
                Analítica comparativa de modelos
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Vista para revisar el comportamiento de los modelos integrados
                mediante métricas de evaluación y registros almacenados.
              </p>
            </div>

            <Link
              to="/admin/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Volver al resumen
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          {isLoading && (
            <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <Loader2 className="mx-auto animate-spin text-blue-600" size={42} />
                <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                  Cargando analítica de modelos
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Consultando métricas y registros administrativos.
                </p>
              </div>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-6 text-red-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-extrabold">No se pudo cargar la vista</h3>
                  <p className="mt-2 text-sm leading-6">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !errorMessage && analytics && (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <BrainCircuit size={26} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-500">
                    Mejor desempeño
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-blue-600">
                    {bestModelLabel}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {bestModelName}
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Target size={26} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-500">
                    F1-score macro
                  </p>
                  <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                    {bestModelF1}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Mejor valor entre los modelos integrados
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <GitCompare size={26} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-500">
                    Coincidencia entre modelos
                  </p>
                  <h3 className="mt-2 text-4xl font-extrabold text-blue-600">
                    {agreementPercentage}%
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Sobre {analytics.evaluated_records} registros evaluados
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <TrendingUp size={26} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-500">
                    Casos con diferencia
                  </p>
                  <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                    {disagreementPercentage}%
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Resultados distintos entre modelos
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-600">
                        Comparación de rendimiento
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                        Métricas de evaluación
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        Métricas obtenidas durante el entrenamiento y utilizadas
                        para comparar el comportamiento de los modelos
                        integrados al prototipo.
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                      <Activity size={16} />
                      Métricas reales
                    </span>
                  </div>

                  <div className="mt-7 overflow-x-auto rounded-3xl border border-slate-200">
                    <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          <th className="px-4 py-4 font-bold">Métrica</th>
                          <th className="px-4 py-4 font-bold">
                            Modelo 1 ({model1Name})
                          </th>
                          <th className="px-4 py-4 font-bold">
                            Modelo 2 ({model2Name})
                          </th>
                          <th className="px-4 py-4 font-bold">Descripción</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200">
                        {analytics.metrics.map((item) => (
                          <tr key={item.metric} className="hover:bg-slate-50">
                            <td className="px-4 py-4 font-extrabold text-slate-950">
                              {item.metric}
                            </td>
                            <td className="px-4 py-4 font-extrabold text-blue-700">
                              {formatPercentage(item.model_1)}
                            </td>
                            <td className="px-4 py-4 font-extrabold text-emerald-700">
                              {formatPercentage(item.model_2)}
                            </td>
                            <td className="px-4 py-4 text-slate-600">
                              {item.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                      <div className="flex items-start gap-3">
                        <BrainCircuit className="mt-1 text-blue-600" size={22} />
                        <div>
                          <h4 className="font-extrabold text-blue-800">
                            Interpretación del rendimiento
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-slate-700">
                            El F1-score macro permite observar el equilibrio
                            promedio del modelo entre las diferentes áreas
                            académicas consideradas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-1 text-emerald-600"
                          size={22}
                        />
                        <div>
                          <h4 className="font-extrabold text-emerald-800">
                            Uso administrativo
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-slate-700">
                            Esta vista permite revisar diferencias entre modelos
                            y consistencia de recomendaciones generadas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="space-y-6">
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <LineChart size={26} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          Resultados por área
                        </p>
                        <h3 className="text-xl font-extrabold text-slate-950">
                          Registros almacenados
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {areaItems.map((item) => (
                        <div
                          key={item.area}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <p className="font-bold text-slate-950">{item.area}</p>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <div
                              className={`rounded-2xl p-3 ${getPerformanceClass(
                                item.average_affinity,
                              )}`}
                            >
                              <p className="text-xs font-semibold">
                                Afinidad promedio
                              </p>
                              <p className="mt-1 text-lg font-extrabold">
                                {formatPercentage(item.average_affinity)}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-white p-3 text-slate-700">
                              <p className="text-xs font-semibold">
                                Total registros
                              </p>
                              <p className="mt-1 text-lg font-extrabold">
                                {item.total}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 text-xs font-semibold text-slate-500">
                            Nivel estimado:{' '}
                            {getPerformanceLabel(item.average_affinity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Grid3X3 className="text-blue-600" size={26} />
                      <h3 className="font-extrabold text-slate-950">
                        Matriz de confusión
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Esta sección queda reservada para mostrar los aciertos y
                      errores por clase cuando se integre la matriz de confusión
                      generada durante el entrenamiento final.
                    </p>

                    <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs">
                      {Array.from({ length: 16 }).map((_, index) => (
                        <div
                          key={index}
                          className={`rounded-xl p-3 font-bold ${
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

                  <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="mt-1 text-blue-600" size={22} />
                      <p className="text-sm leading-6 text-slate-700">
                        Los valores mostrados provienen del endpoint
                        administrativo de analítica de modelos y de los
                        registros almacenados por el prototipo.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default AdminModelAnalyticsPage