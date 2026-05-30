import { Link, useLocation } from 'react-router-dom'

const adminMenuItems = [
  {
    label: 'Resumen general',
    path: '/admin/dashboard',
  },
  {
    label: 'Registros',
    path: '/admin/registros',
  },
  {
    label: 'Estadísticas',
    path: '/admin/estadisticas',
  },
  {
    label: 'Analítica de modelos',
    path: '/admin/analitica-modelos',
  },
  {
    label: 'Exportación',
    path: '/admin/exportacion',
  },
]

function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950 px-5 py-6 text-white lg:block">
      <div>
        <h1 className="text-xl font-bold">OrientaTech</h1>
        <p className="mt-1 text-sm text-slate-400">Panel administrativo</p>
      </div>

      <nav className="mt-10 space-y-3">
        {adminMenuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-emerald-500/10 font-semibold text-emerald-300'
                  : 'font-medium text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        <Link
          to="/"
          className="block rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-300 transition hover:bg-white/5"
        >
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar