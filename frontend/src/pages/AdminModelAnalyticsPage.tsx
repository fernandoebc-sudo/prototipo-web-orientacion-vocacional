import {
  Activity,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  GitCompare,
  LineChart,
  Grid3X3,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const modelMetrics = [
  {
    metric: 'Accuracy',
    model1: '84%',
    model2: '79%',
    description: 'Predicciones correctas frente al total evaluado.',
  },
  {
    metric: 'Precision macro',
    model1: '82%',
    model2: '77%',
    description: 'Precisión promedio considerando todas las áreas.',
  },
  {
    metric: 'Recall macro',
    model1: '81%',
    model2: '75%',
    description: 'Capacidad promedio para identificar cada área.',
  },
  {
    metric: 'F1-score macro',
    model1: '83%',
    model2: '76%',
    description: 'Equilibrio promedio entre precision y recall.',
  },
]

const areaComparison = [
  {
    area: 'Ingeniería y Tecnología',
    model1: 'Alta',
    model2: 'Media',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    area: 'Ciencias de la salud',
    model1: 'Media',
    model2: 'Alta',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    area: 'Humanísticas y sociales',
    model1: 'Media',
    model2: 'Media',
    color: 'bg-slate-100 text-slate-700',
  },
  {
    area: 'Ciencias exactas y agrarias',
    model1: 'Alta',
    model2: 'Media',
    color: 'bg-blue-50 text-blue-700',
  },
]

function AdminModelAnalyticsPage() {
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
                Analítica comparativa de modelos
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Vista prevista para comparar el comportamiento de Modelo 1 y
                Modelo 2 mediante métricas y resultados por área.
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
                <BrainCircuit size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Mejor desempeño referencial
              </p>
              <h3 className="mt-2 text-3xl font-extrabold text-blue-600">
                Modelo 1
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Según métricas visuales de ejemplo
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Target size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                F1-score macro
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-slate-950">
                83%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Valor referencial del Modelo 1
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <GitCompare size={26} />
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
                Casos con diferencia
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                18%
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultados distintos entre modelos
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Comparación de rendimiento
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                    Métricas de evaluación
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Espacio reservado para presentar métricas de clasificación
                    una vez entrenados e integrados los modelos.
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  <Activity size={16} />
                  Valores referenciales
                </span>
              </div>

              <div className="mt-7 overflow-x-auto rounded-3xl border border-slate-200">
                <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-4 font-bold">Métrica</th>
                      <th className="px-4 py-4 font-bold">Modelo 1</th>
                      <th className="px-4 py-4 font-bold">Modelo 2</th>
                      <th className="px-4 py-4 font-bold">Descripción</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {modelMetrics.map((item) => (
                      <tr key={item.metric} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-extrabold text-slate-950">
                          {item.metric}
                        </td>
                        <td className="px-4 py-4 font-extrabold text-blue-700">
                          {item.model1}
                        </td>
                        <td className="px-4 py-4 font-extrabold text-emerald-700">
                          {item.model2}
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="mt-1 text-blue-600" size={22} />
                    <div>
                      <h4 className="font-extrabold text-blue-800">
                        Interpretación preliminar
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        La interfaz contempla la comparación de métricas para
                        apoyar la selección del modelo con mejor desempeño.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 text-emerald-600"
                      size={22}
                    />
                    <div>
                      <h4 className="font-extrabold text-emerald-800">
                        Uso administrativo
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        La vista permitirá revisar diferencias entre modelos y
                        consistencia de recomendaciones generadas.
                      </p>
                    </div>
                  </div>
                </div>
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
                      Comportamiento por área
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      Coincidencia estimada
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {areaComparison.map((item) => (
                    <div
                      key={item.area}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="font-bold text-slate-950">{item.area}</p>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className={`rounded-2xl p-3 ${item.color}`}>
                          <p className="text-xs font-semibold">Modelo 1</p>
                          <p className="mt-1 text-lg font-extrabold">
                            {item.model1}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white p-3 text-slate-700">
                          <p className="text-xs font-semibold">Modelo 2</p>
                          <p className="mt-1 text-lg font-extrabold">
                            {item.model2}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Grid3X3 className="text-blue-600" size={26} />
                  <h3 className="font-extrabold text-slate-950">
                    Matriz de confusión
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  En una etapa posterior, esta sección mostrará los aciertos y
                  errores por clase a partir de las áreas reales y predichas.
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-xl p-3 font-bold ${
                        index % 5 === 0
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {index % 5 === 0 ? '✓' : '-'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-start gap-3">
                  <BarChart3 className="mt-1 text-blue-600" size={22} />
                  <p className="text-sm leading-6 text-slate-700">
                    Los valores mostrados son referenciales y serán
                    reemplazados por resultados reales durante la integración
                    del módulo de Machine Learning.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminModelAnalyticsPage