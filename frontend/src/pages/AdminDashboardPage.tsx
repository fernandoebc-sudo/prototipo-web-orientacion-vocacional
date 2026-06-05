import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Database,
  Download,
  GraduationCap,
  LineChart,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const areaStats = [
  {
    area: 'Ingeniería y Tecnología',
    value: '35%',
    width: 'w-[35%]',
    color: 'bg-blue-600',
  },
  {
    area: 'Ciencias de la salud',
    value: '22%',
    width: 'w-[22%]',
    color: 'bg-emerald-500',
  },
  {
    area: 'Humanísticas y sociales',
    value: '18%',
    width: 'w-[18%]',
    color: 'bg-slate-500',
  },
  {
    area: 'Administrativas y contables',
    value: '12%',
    width: 'w-[12%]',
    color: 'bg-blue-400',
  },
]

function AdminDashboardPage() {
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
                    Interfaz visual en desarrollo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ClipboardList size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Cuestionarios procesados
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                120
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Valor referencial para la interfaz
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
                Ingeniería y Tecnología
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultado agregado de ejemplo
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BrainCircuit size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Coincidencia entre modelos
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-blue-600">
                82%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Comparación referencial
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
                    Distribución referencial
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Áreas recomendadas
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Representación agregada de las áreas académicas con mayor
                    presencia en los resultados del prototipo.
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
                {areaStats.map((item) => (
                  <div key={item.area}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold text-slate-700">
                        {item.area}
                      </span>
                      <span className="font-bold text-slate-950">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${item.color} ${item.width}`}
                      ></div>
                    </div>
                  </div>
                ))}
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
                          Recomendaciones coincidentes
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
                          Recomendaciones coincidentes
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
                      La información mostrada permite validar la estructura
                      visual antes de conectar el backend, la base de datos y
                      los modelos entrenados.
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