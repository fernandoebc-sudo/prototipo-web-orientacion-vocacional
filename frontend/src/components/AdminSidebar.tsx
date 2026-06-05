import {
  BarChart3,
  BrainCircuit,
  ClipboardList,
  Database,
  Download,
  LayoutDashboard,
  LogOut,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const adminMenuItems = [
  {
    label: 'Resumen general',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Registros',
    path: '/admin/registros',
    icon: ClipboardList,
  },
  {
    label: 'Estadísticas',
    path: '/admin/estadisticas',
    icon: BarChart3,
  },
  {
    label: 'Analítica de modelos',
    path: '/admin/analitica-modelos',
    icon: BrainCircuit,
  },
  {
    label: 'Exportación',
    path: '/admin/exportacion',
    icon: Download,
  },
]

function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-slate-950 px-5 py-6 text-white lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
          <BrainCircuit size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Voc<span className="text-blue-300">AI</span>
          </h1>
          <p className="text-sm text-slate-400">Panel administrativo</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-start gap-3">
          <Database className="mt-1 text-emerald-300" size={20} />
          <p className="text-sm leading-6 text-slate-300">
            Revisión de registros, resultados y analítica del prototipo.
          </p>
        </div>
      </div>

      <nav className="mt-8 space-y-3">
        {adminMenuItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-blue-500/15 font-semibold text-blue-300'
                  : 'font-medium text-slate-300 hover:bg-white/5'
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        <Link
          to="/"
          className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
        >
          <LogOut size={18} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar