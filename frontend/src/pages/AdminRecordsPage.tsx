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
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <AdminSidebar />
      <section className="lg:pl-72">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Administración del prototipo
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Registros de cuestionarios
              </h2>
            </div>

            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Volver al resumen
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Resultados registrados
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Vista referencial de cuestionarios procesados por el prototipo.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Exportar registros
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total de registros</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">4</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Coincidencias entre modelos
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">2</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Diferencias entre modelos
                </p>
                <p className="mt-2 text-3xl font-bold text-blue-600">2</p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Registro</th>
                    <th className="px-4 py-3 font-semibold">Edad</th>
                    <th className="px-4 py-3 font-semibold">Institución</th>
                    <th className="px-4 py-3 font-semibold">Modelo 1</th>
                    <th className="px-4 py-3 font-semibold">Modelo 2</th>
                    <th className="px-4 py-3 font-semibold">Resultado general</th>
                    <th className="px-4 py-3 font-semibold">Afinidad</th>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {records.map((record) => (
                    <tr key={record.id} className="bg-white">
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        {record.id}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{record.age}</td>
                      <td className="px-4 py-4 text-slate-600">
                        {record.institution}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {record.model1}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {record.model2}
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        {record.result}
                      </td>
                      <td className="px-4 py-4 font-bold text-blue-700">
                        {record.affinity}
                      </td>
                      <td className="px-4 py-4">
                        {record.match ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                            Coinciden
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                            Diferente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <h4 className="font-bold text-emerald-700">
                Nota de desarrollo
              </h4>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Los registros mostrados son datos referenciales. En una etapa
                posterior, esta vista consultará la información almacenada en la
                base de datos del prototipo.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminRecordsPage