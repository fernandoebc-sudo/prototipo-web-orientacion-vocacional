import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudentLoginPage from './pages/StudentLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import QuestionnairePage from './pages/QuestionnairePage'
import ResultPage from './pages/ResultPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminRecordsPage from './pages/AdminRecordsPage'
import AdminStatsPage from './pages/AdminStatsPage'
import AdminModelAnalyticsPage from './pages/AdminModelAnalyticsPage'
import AdminAccessCodesPage from './pages/AdminAccessCodesPage'
import AdminExportPage from './pages/AdminExportPage'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-estudiante" element={<StudentLoginPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
        <Route path="/cuestionario" element={<QuestionnairePage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/registros"
          element={
            <ProtectedAdminRoute>
              <AdminRecordsPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/estadisticas"
          element={
            <ProtectedAdminRoute>
              <AdminStatsPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/analitica-modelos"
          element={
            <ProtectedAdminRoute>
              <AdminModelAnalyticsPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/codigos-acceso"
          element={
            <ProtectedAdminRoute>
              <AdminAccessCodesPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/exportacion"
          element={
            <ProtectedAdminRoute>
              <AdminExportPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App