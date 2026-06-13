import {
  CheckCircle2,
  Clipboard,
  KeyRound,
  Plus,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import {
  createStudentAccessCode,
  getStudentAccessCodes,
  type StudentAccessCodeItem,
} from '../services/api'

function AdminAccessCodesPage() {
  const [codes, setCodes] = useState<StudentAccessCodeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const availableCodes = useMemo(
    () => codes.filter((code) => code.is_active && !code.is_used).length,
    [codes],
  )

  const usedCodes = useMemo(
    () => codes.filter((code) => code.is_used).length,
    [codes],
  )

  const loadCodes = async () => {
    try {
      setErrorMessage('')
      const response = await getStudentAccessCodes()
      setCodes(response.codes)
    } catch {
      setErrorMessage(
        'No se pudieron cargar los códigos. Verifica que el backend esté activo y que la sesión administrativa sea válida.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCodes()
  }, [])

  const handleCreateCode = async () => {
    try {
      setIsCreating(true)
      setErrorMessage('')
      setSuccessMessage('')

      const response = await createStudentAccessCode()
      setCodes(response.codes)
      setSuccessMessage('Código de acceso generado correctamente.')
    } catch {
      setErrorMessage('No se pudo generar el código de acceso.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setSuccessMessage(`Código ${code} copiado al portapapeles.`)
    } catch {
      setErrorMessage('No se pudo copiar el código.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <AdminSidebar />

      <section className="lg:pl-72">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <KeyRound size={16} />
                Acceso estudiantil
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
                Códigos de acceso
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Generación y consulta de códigos anónimos para permitir el
                ingreso de estudiantes al cuestionario vocacional-académico.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreateCode}
              disabled={isCreating}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Plus size={20} />
              {isCreating ? 'Generando...' : 'Generar nuevo código'}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
          <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Total generados
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-slate-950">
                    {codes.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <KeyRound size={24} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Disponibles
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-emerald-700">
                    {availableCodes}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Utilizados
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-slate-950">
                    {usedCodes}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </div>
          </section>

          {errorMessage && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
              {successMessage}
            </div>
          )}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-950">
                  Listado de códigos
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Los códigos disponibles pueden ser entregados a estudiantes
                  para ingresar al cuestionario.
                </p>
              </div>

              <button
                type="button"
                onClick={loadCodes}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RefreshCw size={17} />
                Actualizar
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-bold">Código</th>
                    <th className="px-5 py-4 font-bold">Estado</th>
                    <th className="px-5 py-4 font-bold">Creado</th>
                    <th className="px-5 py-4 font-bold">Usado</th>
                    <th className="px-5 py-4 font-bold">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-8 text-center text-slate-500"
                      >
                        Cargando códigos de acceso...
                      </td>
                    </tr>
                  ) : codes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-8 text-center text-slate-500"
                      >
                        Aún no existen códigos generados.
                      </td>
                    </tr>
                  ) : (
                    codes.map((code) => (
                      <tr key={code.id} className="bg-white">
                        <td className="px-5 py-4 font-bold tracking-wide text-slate-950">
                          {code.code}
                        </td>

                        <td className="px-5 py-4">
                          {code.is_used ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              <XCircle size={14} />
                              Usado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                              <CheckCircle2 size={14} />
                              Disponible
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {code.created_at}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {code.used_at ?? 'No utilizado'}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleCopyCode(code.code)}
                            disabled={code.is_used}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Clipboard size={15} />
                            Copiar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminAccessCodesPage