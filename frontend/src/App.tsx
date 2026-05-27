import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudentLoginPage from './pages/StudentLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import QuestionnairePage from './pages/QuestionnairePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-estudiante" element={<StudentLoginPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
        <Route path="/cuestionario" element={<QuestionnairePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App