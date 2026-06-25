import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  GraduationCap,
  LineChart,
  PieChart,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import {
  getAdminRecords,
  getAdminStats,
  type AdminRecord,
  type AdminStatsResponse,
} from '../services/api'

const getPercentageWidthClass = (percentage: number) => {
  if (percentage >= 100) return 'w-full'
  if (percentage >= 90) return 'w-[90%]'
  if (percentage >= 80) return 'w-[80%]'
  if (percentage >= 70) return 'w-[70%]'
  if (percentage >= 60) return 'w-[60%]'
  if (percentage >= 50) return 'w-[50%]'
  if (percentage >= 40) return 'w-[40%]'
  if (percentage >= 30) return 'w-[30%]'
  if (percentage >= 20) return 'w-[20%]'
  if (percentage >= 10) return 'w-[10%]'

  return 'w-[5%]'
}

function AdminStatsPage() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  const [records, setRecords] = useState<AdminRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadStats() {
      try {
        const [statsResponse, recordsResponse] = await Promise.all([
          getAdminStats(),
          getAdminRecords(),
        ])

        setStats(statsResponse)
        setRecords(recordsResponse.records)
      } catch (error) {
        setErrorMessage(
          'No se pudieron cargar las estadísticas. Verifica que el backend esté activo.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  const areaStats = useMemo(() => {
    if (records.length === 0) {
      return []
    }

    const groupedAreas = records.reduce<Record<string, number>>((accumulator, record) => {
      accumulator[record.recommended_area] =
        (accumulator[record.recommended_area] || 0) + 1

      return accumulator
    }, {})

    return Object.entries(groupedAreas)
      .map(([area, total]) => ({
        area,
        total,
        percentage: Math.round((total / records.length) * 100),
      }))
      .sort((firstArea, secondArea) => secondArea.total - firstArea.total)
  }, [records])

  const highestAffinity = records.length
    ? Math.max(...records.map((record) => record.affinity))
    : 0

  const lowestAffinity = records.length
    ? Math.min(...records.map((record) => record.affinity))
    : 0

  const totalRecords = stats?.total_records ?? 0
  const mostRecommendedArea = stats?.most_recommended_area ?? 'Sin registros'
  const averageAffinity = stats?.average_affinity ?? 0

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
                Estadísticas generales
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Vista agregada de resultados almacenados en PostgreSQL a partir
                de los cuestionarios procesados por el backend.
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
            <div className="mb-6 rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                Cargando estadísticas desde el backend...
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BarChart3 size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Cuestionarios procesados
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                {totalRecords}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Total consultado desde PostgreSQL
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <GraduationCap size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Área más frecuente
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                {mostRecommendedArea}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultado agregado desde la base de datos
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CheckCircle2 size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Afinidad promedio
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-blue-600">
                {averageAffinity}%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Promedio calculado con registros reales
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Rango de afinidad
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                {lowestAffinity}% - {highestAffinity}%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Valores mínimo y máximo registrados
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Distribución por áreas
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Áreas recomendadas
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Representación agregada de las áreas académicas presentes en
                    los resultados almacenados por el prototipo.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <PieChart size={26} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {areaStats.length > 0 ? (
                  areaStats.map((item) => (
                    <div key={item.area}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-semibold text-slate-700">
                          {item.area}
                        </span>
                        <span className="font-bold text-slate-950">
                          {item.percentage}% · {item.total} registros
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full bg-blue-600 ${getPercentageWidthClass(
                            item.percentage,
                          )}`}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-600">
                      Todavía no existen registros para generar estadísticas por
                      área.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Building2 size={26} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Datos disponibles
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      Alcance estadístico
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Registros analizados
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">
                      {records.length}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Área con mayor frecuencia
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-slate-950">
                      {mostRecommendedArea}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Promedio de afinidad
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                      {averageAffinity}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="mt-1 text-blue-600" size={24} />
                  <div>
                    <h3 className="font-extrabold text-blue-800">
                      Uso de la información
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Esta vista permite revisar tendencias generales del
                      prototipo a partir de los resultados guardados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <LineChart className="text-blue-600" size={26} />
                  <h3 className="font-extrabold text-slate-950">
                    Lectura rápida
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Las estadísticas apoyan la revisión administrativa de patrones
                  generales, como el total de cuestionarios procesados, el área
                  más recomendada y el promedio de afinidad.
                </p>
              </div>

              {records.length === 0 && !isLoading && (
                <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="mt-1 text-amber-600"
                      size={24}
                    />
                    <p className="text-sm leading-6 text-amber-800">
                      No existen registros almacenados. Completa un cuestionario
                      desde el módulo del estudiante para generar estadísticas.
                    </p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminStatsPage