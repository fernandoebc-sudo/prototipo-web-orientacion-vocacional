import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  Database,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api'

function AdminLoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Ingresa usuario y contraseña para continuar.')
      return
    }

    try {
      setIsLoading(true)

      const response = await loginAdmin(username.trim(), password)

      localStorage.setItem('vocai_admin_token', response.access_token)
      localStorage.setItem('vocai_admin_role', response.role)

      navigate('/admin/dashboard')
    } catch {
      setErrorMessage('Usuario o contraseña incorrectos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"></div>

      <header className="relative z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Voc<span className="text-blue-300">AI</span>
              </h1>
              <p className="text-sm text-slate-400">
                Acceso administrativo
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white p-7 text-slate-900 shadow-2xl shadow-black/20">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <ShieldCheck size={16} />
            Administración del sistema
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950">
            Inicia sesión para acceder al panel
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            El acceso administrativo permite revisar registros, estadísticas,
            analítica comparativa de modelos y opciones de exportación.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-username"
                className="text-sm font-semibold text-slate-700"
              >
                Usuario
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <User className="text-slate-400" size={20} />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <LockKeyhole className="text-slate-400" size={20} />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 shrink-0" size={18} />
                <p>{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <ShieldCheck size={22} />
              {isLoading ? 'Validando acceso...' : 'Ingresar al panel'}
            </button>
          </form>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Este acceso está reservado para la revisión administrativa del
            prototipo y sus resultados.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                <Sparkles size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Panel de seguimiento
                </h3>
                <p className="mt-2 leading-7 text-slate-300">
                  El administrador podrá revisar información agregada del
                  prototipo sin exponer datos directamente identificables.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Database className="text-blue-300" size={26} />
              <h4 className="mt-3 font-bold text-white">Registros</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Consulta de cuestionarios procesados y resultados generales.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <BarChart3 className="text-emerald-300" size={26} />
              <h4 className="mt-3 font-bold text-white">Estadísticas</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Revisión de áreas recomendadas, distribución de resultados y
                tendencias generales.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <BrainCircuit className="text-blue-300" size={26} />
              <h4 className="mt-3 font-bold text-white">
                Analítica de modelos
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Comparación entre Modelo 1 y Modelo 2 mediante métricas y
                resultados referenciales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminLoginPage