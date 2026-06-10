import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Download,
  GraduationCap,
  LineChart,
  Sparkles,
  Users,
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

function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  const [records, setRecords] = useState<AdminRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsResponse, recordsResponse] = await Promise.all([
          getAdminStats(),
          getAdminRecords(),
        ])

        setStats(statsResponse)
        setRecords(recordsResponse.records)
      } catch (error) {
        setErrorMessage(
          'No se pudo cargar la información del panel. Verifica que el backend esté activo.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
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
                Resumen general
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Vista administrativa para revisar registros, estadísticas,
                comparación de modelos y opciones de exportación.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-600" size={24} />
                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Estado del prototipo
                  </p>
                  <p className="text-sm text-emerald-700">
                    {isLoading
                      ? 'Cargando información'
                      : 'Conectado al backend'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
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
                <ClipboardList size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Cuestionarios procesados
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                {isLoading ? '...' : totalRecords}
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
                Área más recomendada
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                {isLoading ? 'Cargando...' : mostRecommendedArea}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultado agregado desde la base de datos
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BrainCircuit size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Afinidad promedio
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-blue-600">
                {isLoading ? '...' : `${averageAffinity}%`}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Promedio calculado con registros reales
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Download size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Datos exportables
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                CSV
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Registros no identificables
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
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
                    Representación agregada de las áreas académicas con mayor
                    presencia en los resultados almacenados.
                  </p>
                </div>

                <Link
                  to="/admin/estadisticas"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                >
                  <BarChart3 size={18} />
                  Ver estadísticas
                </Link>
              </div>

              <div className="mt-7 space-y-5">
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
                      {isLoading
                        ? 'Cargando distribución de áreas...'
                        : 'Todavía no existen registros para mostrar distribución por áreas.'}
                    </p>
                  </div>
                )}
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
                      Comparación inicial
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      Analítica de modelos
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-950">Modelo 1</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Resultado referencial
                        </p>
                      </div>
                      <span className="text-2xl font-extrabold text-blue-700">
                        84%
                      </span>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-950">Modelo 2</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Resultado referencial
                        </p>
                      </div>
                      <span className="text-2xl font-extrabold text-emerald-700">
                        79%
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/admin/analitica-modelos"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  <BrainCircuit size={18} />
                  Revisar analítica
                </Link>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex items-start gap-3">
                  <Users className="mt-1 text-emerald-600" size={24} />
                  <div>
                    <h3 className="font-extrabold text-emerald-800">
                      Uso administrativo
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-emerald-800">
                      La información mostrada permite revisar registros y
                      estadísticas generales del prototipo sin utilizar datos
                      directamente identificables de los estudiantes.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Accesos rápidos
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  Módulos administrativos
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Link
                  to="/admin/registros"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Registros
                </Link>

                <Link
                  to="/admin/estadisticas"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Estadísticas
                </Link>

                <Link
                  to="/admin/exportacion"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Exportación
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboardPage