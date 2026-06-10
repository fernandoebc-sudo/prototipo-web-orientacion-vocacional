export type ModelPrediction = {
  name: string
  area: string
  affinity: number
}

export type StudentResult = {
  status: string
  recommended_area: string
  affinity: number
  model_1: ModelPrediction
  model_2: ModelPrediction
  message: string
  questionnaire_response_id: number
  recommendation_result_id: number
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

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

export async function generateRecommendation(
  payload: QuestionnairePayload,
): Promise<StudentResult> {
  const response = await fetch(`${API_BASE_URL}/results/recommendation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('No se pudo generar la recomendación')
  }

  return response.json()
}

export async function getAdminRecords(): Promise<AdminRecordsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/records`)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los registros')
  }

  return response.json()
}

export async function getAdminStats(): Promise<AdminStatsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/stats`)

  if (!response.ok) {
    throw new Error('No se pudieron obtener las estadísticas')
  }

  return response.json()
}