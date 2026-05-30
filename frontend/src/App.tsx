import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudentLoginPage from './pages/StudentLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import QuestionnairePage from './pages/QuestionnairePage'
import ResultPage from './pages/ResultPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminRecordsPage from './pages/AdminRecordsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-estudiante" element={<StudentLoginPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
        <Route path="/cuestionario" element={<QuestionnairePage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/registros" element={<AdminRecordsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App