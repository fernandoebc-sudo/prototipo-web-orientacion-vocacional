import { useEffect, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  KeyRound,
  Mail,
  Plus,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'
import {
  createStudentAccessCode,
  getStudentAccessCodes,
  type StudentAccessCodeItem,
} from '../services/api'

function AdminAccessCodesPage() {
  const [codes, setCodes] = useState<StudentAccessCodeItem[]>([])
  const [studentEmail, setStudentEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const loadCodes = async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const response = await getStudentAccessCodes()
      setCodes(response.codes)
    } catch {
      setErrorMessage(
        'No se pudieron cargar los códigos de acceso. Verifica que la sesión administrativa siga activa.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCodes()
  }, [])

  const handleCreateCode = async () => {
    const formattedEmail = studentEmail.trim().toLowerCase()

    if (!formattedEmail) {
      setErrorMessage('Ingresa el correo institucional del estudiante.')
      return
    }

    try {
      setIsCreating(true)
      setErrorMessage('')
      setSuccessMessage('')

      const response = await createStudentAccessCode(formattedEmail)

      setCodes(response.codes)
      setStudentEmail('')
      setSuccessMessage(
        'Código generado y enviado correctamente al correo indicado.',
      )
    } catch {
      setErrorMessage(
        'No se pudo generar o enviar el código. Verifica el correo, la sesión administrativa o la configuración SMTP.',
      )
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setSuccessMessage('Código copiado al portapapeles.')
      setErrorMessage('')
    } catch {
      setErrorMessage('No se pudo copiar el código.')
    }
  }

  const availableCodes = codes.filter((code) => !code.is_used && code.is_active)
  const usedCodes = codes.filter((code) => code.is_used)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <main className="min-h-screen px-6 py-8 lg:ml-72">
        <section className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                <KeyRound size={16} />
                Acceso estudiantil
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">
                Códigos de acceso
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Generación y consulta de códigos asociados a correos
                institucionales. El correo se utiliza para enviar y validar el
                acceso, pero se almacena en la base de datos mediante hash.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:w-[30rem]">
              <label
                htmlFor="student-email"
                className="text-sm font-bold text-slate-700"
              >
                Correo institucional del estudiante
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-400">
                  <Mail size={18} className="shrink-0 text-slate-400" />
                  <input
                    id="student-email"
                    type="email"
                    value={studentEmail}
                    onChange={(event) => setStudentEmail(event.target.value)}
                    placeholder="estudiante@institucion.edu.ec"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCreateCode}
                  disabled={isCreating}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Plus size={18} />
                  {isCreating ? 'Enviando...' : 'Generar y enviar'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Códigos generados
              </p>
              <p className="mt-2 text-3xl font-extrabold text-slate-950">
                {codes.length}
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
              <p className="text-sm font-semibold text-emerald-700">
                Disponibles
              </p>
              <p className="mt-2 text-3xl font-extrabold text-emerald-800">
                {availableCodes.length}
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
              <p className="text-sm font-semibold text-blue-700">
                Utilizados
              </p>
              <p className="mt-2 text-3xl font-extrabold text-blue-800">
                {usedCodes.length}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-3 rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 shrink-0" size={20} />
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
              <p>{successMessage}</p>
            </div>
          )}

          <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Códigos generados
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Consulta del estado de los códigos enviados a estudiantes.
                </p>
              </div>

              <button
                type="button"
                onClick={loadCodes}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <RefreshCcw size={18} />
                {isLoading ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-bold">Código</th>
                    <th className="px-5 py-4 font-bold">Estado</th>
                    <th className="px-5 py-4 font-bold">Correo asociado</th>
                    <th className="px-5 py-4 font-bold">Creado</th>
                    <th className="px-5 py-4 font-bold">Enviado</th>
                    <th className="px-5 py-4 font-bold">Usado</th>
                    <th className="px-5 py-4 font-bold">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Cargando códigos de acceso...
                      </td>
                    </tr>
                  ) : codes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Aún no se han generado códigos de acceso.
                      </td>
                    </tr>
                  ) : (
                    codes.map((code) => (
                      <tr key={code.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 font-mono text-sm font-bold text-slate-800">
                            <KeyRound size={16} className="text-blue-600" />
                            {code.code}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {code.is_used ? (
                            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                              Utilizado
                            </span>
                          ) : code.is_active ? (
                            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                              Disponible
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              Inactivo
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          {code.has_email ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                              <ShieldCheck size={14} />
                              Hash registrado
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              Sin correo
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {code.created_at}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {code.sent_at ?? 'No enviado'}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {code.used_at ?? 'No utilizado'}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleCopyCode(code.code)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
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
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminAccessCodesPage