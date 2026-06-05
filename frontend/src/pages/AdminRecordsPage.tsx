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
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const records = [
  {
    id: 'REG-001',
    age: '17',
    institution: 'Pública',
    model1: 'Ingeniería y Tecnología',
    model2: 'Ingeniería y Tecnología',
    result: 'Ingeniería y Tecnología',
    affinity: '84%',
    match: true,
  },
  {
    id: 'REG-002',
    age: '16',
    institution: 'Privada',
    model1: 'Ciencias de la salud',
    model2: 'Ciencias de la salud',
    result: 'Ciencias de la salud',
    affinity: '79%',
    match: true,
  },
  {
    id: 'REG-003',
    age: '18+',
    institution: 'Fiscomisional',
    model1: 'Humanísticas y sociales',
    model2: 'Artísticas',
    result: 'Humanísticas y sociales',
    affinity: '72%',
    match: false,
  },
  {
    id: 'REG-004',
    age: '17',
    institution: 'Pública',
    model1: 'Ciencias exactas y agrarias',
    model2: 'Ingeniería y Tecnología',
    result: 'Ciencias exactas y agrarias',
    affinity: '76%',
    match: false,
  },
]

function AdminRecordsPage() {
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
                Consulta referencial de cuestionarios procesados, resultados
                generales y coincidencias entre modelos.
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
                4
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Datos referenciales de prueba
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Coincidencias
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-emerald-600">
                2
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultados iguales entre modelos
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertTriangle size={26} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                Diferencias
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-amber-600">
                2
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Resultados distintos entre modelos
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
                  Resultados por estudiante
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  La tabla muestra información no identificable, recomendaciones
                  generadas por cada modelo y resultado general.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  <Filter size={18} />
                  Filtrar
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                  <Download size={18} />
                  Exportar
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar registro, institución o área recomendada"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 font-bold">Registro</th>
                    <th className="px-4 py-4 font-bold">Edad</th>
                    <th className="px-4 py-4 font-bold">Institución</th>
                    <th className="px-4 py-4 font-bold">Modelo 1</th>
                    <th className="px-4 py-4 font-bold">Modelo 2</th>
                    <th className="px-4 py-4 font-bold">Resultado general</th>
                    <th className="px-4 py-4 font-bold">Afinidad</th>
                    <th className="px-4 py-4 font-bold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {records.map((record) => (
                    <tr key={record.id} className="bg-white hover:bg-slate-50">
                      <td className="px-4 py-4 font-extrabold text-slate-950">
                        {record.id}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {record.age}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {record.institution}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {record.model1}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {record.model2}
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-950">
                        {record.result}
                      </td>
                      <td className="px-4 py-4 font-extrabold text-blue-700">
                        {record.affinity}
                      </td>
                      <td className="px-4 py-4">
                        {record.match ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Coinciden
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                            <AlertTriangle size={14} />
                            Diferente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <Users className="mt-1 text-emerald-600" size={22} />
                <p className="text-sm leading-6 text-emerald-800">
                  Los registros mostrados son referenciales. En una etapa
                  posterior, esta vista consultará información almacenada en la
                  base de datos del prototipo.
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