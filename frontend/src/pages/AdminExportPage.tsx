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
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const exportOptions = [
  {
    title: 'Registros de cuestionarios',
    description:
      'Información general no identificable, respuestas procesadas y resultado general del prototipo.',
    format: 'CSV',
    icon: ClipboardList,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Resultados por modelos',
    description:
      'Recomendaciones generadas por Modelo 1 y Modelo 2, afinidad y estado de coincidencia.',
    format: 'CSV',
    icon: BrainCircuit,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Métricas comparativas',
    description:
      'Métricas de evaluación como accuracy, precision, recall y F1-score cuando los modelos estén integrados.',
    format: 'PDF / CSV',
    icon: BarChart3,
    color: 'bg-blue-50 text-blue-600',
  },
]

function AdminExportPage() {
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
                Vista prevista para descargar registros, resultados y métricas
                del sistema en formatos útiles para análisis posterior.
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
                  Esta sección permitirá exportar información generada por el
                  prototipo para revisión técnica, análisis de resultados y
                  evaluación del comportamiento de los modelos.
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
                      120
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <FileText size={24} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      Formatos
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
                      Listo
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
                  La exportación debe conservar el tratamiento confidencial de
                  la información. El prototipo no debe incluir nombres, cédulas,
                  teléfonos, correos ni datos directamente identificables del
                  estudiante.
                </p>

                <div className="mt-6 rounded-3xl bg-white/80 p-5 text-sm leading-6 text-emerald-800">
                  La información exportada se utilizará con fines académicos,
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
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${option.color}`}>
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

                    <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
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
                      Funcionalidad prevista
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      La exportación real se implementará mediante backend,
                      base de datos y endpoints correspondientes.
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
                      Los archivos exportados estarán orientados al análisis del
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