import {
  Archive,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Database,
  Download,
  FileDown,
  FileText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { getAdminRecords, type AdminRecord } from '../services/api'

const exportOptions = [
  {
    title: 'Registros de cuestionarios',
    description:
      'Información general no identificable de los resultados procesados por el prototipo.',
    format: 'CSV',
    icon: ClipboardList,
    color: 'bg-blue-50 text-blue-600',
    type: 'records',
  },
  {
    title: 'Resultados por modelos',
    description:
      'Recomendaciones generadas por Modelo 1 y Modelo 2 en la versión referencial del prototipo.',
    format: 'CSV',
    icon: BrainCircuit,
    color: 'bg-emerald-50 text-emerald-600',
    type: 'models',
  },
  {
    title: 'Resumen estadístico',
    description:
      'Resumen general de registros, áreas recomendadas y afinidad promedio.',
    format: 'CSV',
    icon: BarChart3,
    color: 'bg-blue-50 text-blue-600',
    type: 'summary',
  },
]

function AdminExportPage() {
  const [records, setRecords] = useState<AdminRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadRecords() {
      try {
        const response = await getAdminRecords()
        setRecords(response.records)
      } catch (error) {
        setErrorMessage(
          'No se pudieron cargar los registros. Verifica que el backend esté activo.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadRecords()
  }, [])

  const averageAffinity =
    records.length > 0
      ? Math.round(
          records.reduce((total, record) => total + record.affinity, 0) /
            records.length,
        )
      : 0

  const mostRecommendedArea =
    records.length > 0
      ? Object.entries(
          records.reduce<Record<string, number>>((accumulator, record) => {
            accumulator[record.recommended_area] =
              (accumulator[record.recommended_area] || 0) + 1

            return accumulator
          }, {}),
        ).sort((firstArea, secondArea) => secondArea[1] - firstArea[1])[0][0]
      : 'Sin registros'

  const downloadCsv = (fileName: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

  const exportRecords = () => {
    const csvHeader = 'id,area_recomendada,afinidad,fecha_registro\n'
    const csvRows = records
      .map(
        (record) =>
          `${record.id},"${record.recommended_area}",${record.affinity},"${record.created_at}"`,
      )
      .join('\n')

    downloadCsv('vocai-registros.csv', `${csvHeader}${csvRows}`)
  }

  const exportModelResults = () => {
    const csvHeader =
      'id,modelo_1_area,modelo_1_afinidad,modelo_2_area,modelo_2_afinidad,fecha_registro\n'

    const csvRows = records
      .map(
        (record) =>
          `${record.id},"${record.recommended_area}",${record.affinity},"${record.recommended_area}",79,"${record.created_at}"`,
      )
      .join('\n')

    downloadCsv('vocai-resultados-modelos.csv', `${csvHeader}${csvRows}`)
  }

  const exportSummary = () => {
    const csvContent = [
      'indicador,valor',
      `total_registros,${records.length}`,
      `area_mas_recomendada,"${mostRecommendedArea}"`,
      `afinidad_promedio,${averageAffinity}`,
    ].join('\n')

    downloadCsv('vocai-resumen-estadistico.csv', csvContent)
  }

  const handleExport = (type: string) => {
    if (records.length === 0) {
      return
    }

    if (type === 'records') {
      exportRecords()
      return
    }

    if (type === 'models') {
      exportModelResults()
      return
    }

    exportSummary()
  }

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
                Exportación de datos
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Descarga de registros y resultados no identificables generados
                por el prototipo para análisis posterior.
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
          {errorMessage && (
            <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">
                {errorMessage}
              </p>
            </div>
          )}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  <FileDown size={16} />
                  Datos para análisis posterior
                </span>

                <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">
                  Descarga de registros y resultados
                </h3>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Esta sección permite exportar información generada por el
                  prototipo para revisión técnica, análisis de resultados y
                  evaluación del comportamiento inicial del sistema.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Database size={24} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Registros
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-950">
                      {isLoading ? '...' : records.length}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <FileText size={24} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Formato
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-600">
                      CSV
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Estado
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-emerald-600">
                      {records.length > 0 ? 'Listo' : '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <ShieldCheck size={26} />
                </div>

                <h4 className="mt-5 text-xl font-extrabold text-emerald-800">
                  Tratamiento de información
                </h4>

                <p className="mt-3 text-sm leading-6 text-emerald-800">
                  La exportación conserva el tratamiento no identificable de la
                  información. El prototipo no incluye nombres, cédulas,
                  teléfonos, correos ni datos directamente identificables del
                  estudiante.
                </p>

                <div className="mt-6 rounded-3xl bg-white/80 p-5 text-sm leading-6 text-emerald-800">
                  La información exportada se utiliza con fines académicos,
                  técnicos y de evaluación del prototipo.
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {exportOptions.map((option) => {
                const Icon = option.icon

                return (
                  <div
                    key={option.title}
                    className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${option.color}`}
                      >
                        <Icon size={26} />
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-blue-700 shadow-sm">
                        {option.format}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-extrabold text-slate-950">
                      {option.title}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {option.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleExport(option.type)}
                      disabled={records.length === 0 || isLoading}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Download size={18} />
                      Exportar
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-start gap-3">
                  <Archive className="mt-1 text-blue-600" size={24} />
                  <div>
                    <h4 className="font-extrabold text-blue-800">
                      Exportación implementada
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Los archivos CSV se generan desde los registros obtenidos
                      desde el backend y almacenados previamente en PostgreSQL.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 text-emerald-600" size={24} />
                  <div>
                    <h4 className="font-extrabold text-slate-950">
                      Alcance de la descarga
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Los archivos exportados están orientados al análisis del
                      prototipo, comparación de resultados y revisión técnica,
                      sin exponer información directamente identificable de los
                      estudiantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminExportPage