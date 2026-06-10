import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Download,
  Filter,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { getAdminRecords, type AdminRecord } from '../services/api'

function AdminRecordsPage() {
  const [records, setRecords] = useState<AdminRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim()

    if (!normalizedSearch) {
      return records
    }

    return records.filter((record) => {
      return (
        `REG-${record.id}`.toLowerCase().includes(normalizedSearch) ||
        record.recommended_area.toLowerCase().includes(normalizedSearch) ||
        record.created_at.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [records, searchTerm])

  const averageAffinity =
    records.length > 0
      ? Math.round(
          records.reduce((total, record) => total + record.affinity, 0) /
            records.length,
        )
      : 0

  const latestRecord = records[0]

  const exportRecords = () => {
    const csvHeader = 'id,area_recomendada,afinidad,fecha\n'
    const csvRows = records
      .map(
        (record) =>
          `${record.id},"${record.recommended_area}",${record.affinity},"${record.created_at}"`,
      )
      .join('\n')

    const csvContent = `${csvHeader}${csvRows}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'registros-vocai.csv'
    link.click()

    URL.revokeObjectURL(url)
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
                Registros de cuestionarios
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Consulta de resultados almacenados en PostgreSQL a partir de los
                cuestionarios procesados por el backend.
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ClipboardList size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Total de registros
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                {records.length}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultados consultados desde la base de datos
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Afinidad promedio
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                {averageAffinity}%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Promedio calculado con los registros actuales
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertTriangle size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Último registro
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-amber-600">
                {latestRecord ? `#${latestRecord.id}` : '—'}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Registro más reciente procesado
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Registros procesados
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  Resultados almacenados
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  La tabla muestra información no identificable generada por el
                  prototipo y almacenada en PostgreSQL.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Filter size={18} />
                  Filtrar
                </button>

                <button
                  type="button"
                  onClick={exportRecords}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  <Download size={18} />
                  Exportar
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar registro, fecha o área recomendada"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {isLoading && (
              <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-700">
                  Cargando registros desde el backend...
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-5">
                <p className="text-sm font-semibold text-red-700">
                  {errorMessage}
                </p>
              </div>
            )}

            {!isLoading && !errorMessage && (
              <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-4 font-bold">Registro</th>
                      <th className="px-4 py-4 font-bold">Área recomendada</th>
                      <th className="px-4 py-4 font-bold">Afinidad</th>
                      <th className="px-4 py-4 font-bold">Fecha de registro</th>
                      <th className="px-4 py-4 font-bold">Estado</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="bg-white hover:bg-slate-50">
                        <td className="px-4 py-4 font-extrabold text-slate-950">
                          REG-{record.id.toString().padStart(3, '0')}
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-950">
                          {record.recommended_area}
                        </td>
                        <td className="px-4 py-4 font-extrabold text-blue-700">
                          {record.affinity}%
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {record.created_at}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Almacenado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredRecords.length === 0 && (
                  <div className="bg-white px-4 py-8 text-center text-sm font-semibold text-slate-500">
                    No se encontraron registros con ese criterio de búsqueda.
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <Users className="mt-1 text-emerald-600" size={22} />
                <p className="text-sm leading-6 text-emerald-800">
                  Los registros mostrados provienen de la base de datos del
                  prototipo y no incluyen nombres, cédulas, correos ni otros
                  datos directamente identificables.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminRecordsPage