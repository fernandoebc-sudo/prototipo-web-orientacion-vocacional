import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  GraduationCap,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { loginStudent } from '../services/api'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>
    }
  }
}

function StudentLoginPage() {
  const navigate = useNavigate()

  const [studentEmail, setStudentEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getRecaptchaToken = async () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

    if (!siteKey) {
      throw new Error('La clave pública de reCAPTCHA no está configurada.')
    }

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA no se ha cargado correctamente.')
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha
          ?.execute(siteKey, { action: 'student_login' })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    const formattedEmail = studentEmail.trim().toLowerCase()
    const formattedCode = accessCode.trim().toUpperCase()

    if (!formattedEmail) {
      setErrorMessage('Ingresa el correo institucional para continuar.')
      return
    }

    if (!formattedCode) {
      setErrorMessage('Ingresa el código de acceso para continuar.')
      return
    }

    try {
      setIsLoading(true)

      const recaptchaToken = await getRecaptchaToken()

      const response = await loginStudent(
        formattedEmail,
        formattedCode,
        recaptchaToken,
      )

      sessionStorage.setItem('vocai_student_token', response.access_token)
      sessionStorage.setItem('vocai_student_role', response.role)
      sessionStorage.setItem('vocai_student_code', formattedCode)
      sessionStorage.setItem('vocai_student_email', formattedEmail)

      navigate('/cuestionario')
    } catch {
      setErrorMessage(
        'No se pudo validar el acceso. Revisa el correo, el código o intenta nuevamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl"></div>
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>

      <header className="relative z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                Voc<span className="text-blue-600">AI</span>
              </h1>
              <p className="text-sm text-slate-500">
                Acceso para estudiantes
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Volver
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <GraduationCap size={16} />
            Ingreso del estudiante
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950">
            Ingresa con tu correo y código de acceso
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            El acceso se realiza mediante el correo institucional y un código
            enviado previamente por el administrador. El correo no se almacena
            directamente en la base de datos, sino mediante un hash para validar
            el acceso.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="student-email"
                className="text-sm font-semibold text-slate-700"
              >
                Correo institucional
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <Mail className="text-slate-400" size={20} />
                <input
                  id="student-email"
                  type="email"
                  value={studentEmail}
                  onChange={(event) => setStudentEmail(event.target.value)}
                  placeholder="estudiante@institucion.edu.ec"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="student-code"
                className="text-sm font-semibold text-slate-700"
              >
                Código de acceso
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <KeyRound className="text-slate-400" size={20} />
                <input
                  id="student-code"
                  type="text"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  placeholder="VOC-WW2E-TMUC"
                  className="w-full bg-transparent text-sm uppercase tracking-wide outline-none placeholder:text-slate-400"
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
              <BookOpenCheck size={22} />
              {isLoading ? 'Validando acceso...' : 'Ingresar al cuestionario'}
            </button>
          </form>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            El resultado tiene fines orientativos y debe complementarse con el
            acompañamiento de docentes, tutores u orientadores.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <Sparkles size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Flujo de orientación
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  El proceso está organizado para que el estudiante responda de
                  forma sencilla y comprenda el resultado obtenido.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-blue-700">Paso 1</p>
              <h4 className="mt-1 font-bold text-slate-950">
                Ingresar con correo, código y verificación
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                El estudiante utiliza el correo institucional y el código de
                acceso generado por el administrador. Además, se ejecuta una
                verificación reCAPTCHA para proteger el ingreso.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-emerald-700">Paso 2</p>
              <h4 className="mt-1 font-bold text-slate-950">
                Responder el cuestionario
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Se recopilan datos sobre desempeño académico, intereses,
                habilidades y preferencias.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-blue-700">Paso 3</p>
              <h4 className="mt-1 font-bold text-slate-950">
                Revisar el resultado
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Se muestra el área sugerida, afinidad, comparación entre modelos
                y explicación breve.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-emerald-600" size={22} />
              <p className="text-sm leading-6 text-emerald-800">
                El correo se utiliza para validar el acceso al cuestionario y se
                almacena mediante hash, evitando guardar el dato en texto plano.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default StudentLoginPage