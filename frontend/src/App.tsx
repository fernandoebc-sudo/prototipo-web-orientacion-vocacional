import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudentLoginPage from './pages/StudentLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-estudiante" element={<StudentLoginPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App