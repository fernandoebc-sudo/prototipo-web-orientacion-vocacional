import {
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
  {
    area: 'Artísticas',
    value: '7%',
    width: 'w-[7%]',
    color: 'bg-emerald-400',
  },
  {
    area: 'Ciencias exactas y agrarias',
    value: '4%',
    width: 'w-[4%]',
    color: 'bg-slate-400',
  },
  {
    area: 'Defensa y seguridad',
    value: '2%',
    width: 'w-[2%]',
    color: 'bg-blue-300',
  },
]

const institutionStats = [
  { type: 'Pública', value: '58%', width: 'w-[58%]' },
  { type: 'Privada', value: '25%', width: 'w-[25%]' },
  { type: 'Fiscomisional', value: '12%', width: 'w-[12%]' },
  { type: 'Municipal', value: '5%', width: 'w-[5%]' },
]

function AdminStatsPage() {
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
                Vista agregada de resultados, distribución de áreas y
                coincidencia referencial entre modelos.
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BarChart3 size={26} />
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
                Área más frecuente
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
                <CheckCircle2 size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Coincidencia entre modelos
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-blue-600">
                82%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Coincidencia general estimada
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Diferencias entre modelos
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                18%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Casos con resultados distintos
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
                    Representación agregada de las áreas académicas con mayor
                    presencia en los resultados generados por el prototipo.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <PieChart size={26} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Building2 size={26} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Distribución referencial
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      Tipo de institución
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {institutionStats.map((item) => (
                    <div key={item.type}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-semibold text-slate-700">
                          {item.type}
                        </span>
                        <span className="font-bold text-slate-950">
                          {item.value}
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full bg-emerald-500 ${item.width}`}
                        ></div>
                      </div>
                    </div>
                  ))}
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
                      Esta vista permitirá revisar tendencias generales del
                      prototipo. Los valores actuales son referenciales y serán
                      reemplazados por datos reales cuando se conecte la base de
                      datos.
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
                  generales, sin identificar directamente a los estudiantes.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminStatsPage