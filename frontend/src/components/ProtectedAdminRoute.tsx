import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedAdminRouteProps = {
  children: ReactNode
}

function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const adminToken = localStorage.getItem('vocai_admin_token')
  const adminRole = localStorage.getItem('vocai_admin_role')

  if (!adminToken || adminRole !== 'admin') {
    return <Navigate to="/login-admin" replace />
  }

  return children
}

export default ProtectedAdminRoute