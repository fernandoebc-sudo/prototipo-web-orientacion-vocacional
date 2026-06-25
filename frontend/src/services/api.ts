export type ModelPrediction = {
  name: string
  area: string
  affinity: number
}

export type SecondaryArea = {
  area: string
  affinity: number
}

export type StudentResult = {
  status: string
  recommended_area: string
  affinity: number
  secondary_areas?: SecondaryArea[]
  interpretation?: string
  model_1: ModelPrediction
  model_2: ModelPrediction
  message: string
  questionnaire_response_id: number
  recommendation_result_id: number
  next_step?: string | null
}

export type QuestionnairePayload = {
  general_data: Record<string, unknown>
  academic_performance: Record<string, unknown>
  interests_skills: Record<string, unknown>
  vocational_security: Record<string, unknown>
}

export type AdminRecord = {
  id: number
  recommended_area: string
  affinity: number
  created_at: string
  model_1_result?: ModelPrediction | string | null
  model_2_result?: ModelPrediction | string | null
}

export type AdminRecordsResponse = {
  status: string
  message: string
  records: AdminRecord[]
}

export type AdminStatsResponse = {
  status: string
  total_records: number
  most_recommended_area: string
  average_affinity: number
}

export type LoginResponse = {
  status: string
  access_token: string
  token_type: string
  role: 'admin' | 'student'
  message: string
}

export type AdminModelMetricItem = {
  metric: string
  model_1: number
  model_2: number
  description: string
}

export type AdminModelInfo = {
  label: string
  name: string
  accuracy: number
  precision_macro: number
  recall_macro: number
  f1_macro: number
}

export type AdminAreaSummaryItem = {
  area: string
  total: number
  average_affinity: number
}

export type AdminModelAnalyticsResponse = {
  status: string
  message: string
  metrics_source: string
  model_1: AdminModelInfo
  model_2: AdminModelInfo
  best_model: AdminModelInfo
  evaluated_records: number
  agreement_percentage: number
  disagreement_percentage: number
  area_summary: AdminAreaSummaryItem[]
  metrics: AdminModelMetricItem[]
}

export type StudentAccessCodeItem = {
  id: number
  code: string
  has_email: boolean
  is_active: boolean
  is_used: boolean
  created_at: string
  used_at: string | null
  sent_at: string | null
}

export type StudentAccessCodesResponse = {
  status: string
  message: string
  codes: StudentAccessCodeItem[]
}

export type StudentAccessCodesBulkResponse = {
  status: string
  message: string
  created: number
  skipped: number
  failed: number
  details: string[]
  codes: StudentAccessCodeItem[]
}

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

function getAdminAuthHeaders() {
  const token = localStorage.getItem('vocai_admin_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

function getStudentAuthHeaders() {
  const token = sessionStorage.getItem('vocai_student_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function generateRecommendation(
  payload: QuestionnairePayload,
): Promise<StudentResult> {
  const response = await fetch(`${API_BASE_URL}/questionnaire/submit`, {
    method: 'POST',
    headers: getStudentAuthHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('No se pudo generar la recomendación')
  }

  return response.json()
}

export async function getAdminRecords(): Promise<AdminRecordsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/records`, {
    headers: getAdminAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('No se pudieron obtener los registros')
  }

  return response.json()
}

export async function getAdminStats(): Promise<AdminStatsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAdminAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('No se pudieron obtener las estadísticas')
  }

  return response.json()
}

export async function getAdminModelAnalytics(): Promise<AdminModelAnalyticsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/model-analytics`, {
    headers: getAdminAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('No se pudo obtener la analítica de modelos')
  }

  return response.json()
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Credenciales administrativas incorrectas')
  }

  return response.json()
}

export async function loginStudent(
  email: string,
  code: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/student-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  })

  if (!response.ok) {
    throw new Error('Correo o código de acceso inválido o no disponible')
  }

  return response.json()
}

export async function getStudentAccessCodes(): Promise<StudentAccessCodesResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/student-codes`, {
    headers: getAdminAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('No se pudieron obtener los códigos de acceso')
  }

  return response.json()
}

export async function createStudentAccessCode(
  email: string,
): Promise<StudentAccessCodesResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/student-codes`, {
    method: 'POST',
    headers: getAdminAuthHeaders(),
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('No se pudo generar y enviar el código de acceso')
  }

  return response.json()
}

export async function createStudentAccessCodesBulk(
  emails: string[],
): Promise<StudentAccessCodesBulkResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/student-codes/bulk`, {
    method: 'POST',
    headers: getAdminAuthHeaders(),
    body: JSON.stringify({ emails }),
  })

  if (!response.ok) {
    throw new Error('No se pudo generar y enviar el lote de códigos')
  }

  return response.json()
}