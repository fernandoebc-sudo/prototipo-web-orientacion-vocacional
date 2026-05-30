import { Link } from 'react-router-dom'

function ResultPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">OrientaTech</h1>
            <p className="text-sm text-slate-500">
              Resultado de recomendación académica
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            Recomendación generada
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Resultado académico por áreas
          </h2>

          <p className="mt-3 max-w-3xl text-slate-600">
            La recomendación se presenta como una orientación inicial basada en
            las respuestas del cuestionario. El resultado no reemplaza el
            acompañamiento de un orientador o docente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="rounded-3xl bg-blue-50 p-6">
              <p className="text-sm font-semibold text-blue-700">
                Resultado general sugerido
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                Ingeniería y Tecnología
              </h3>

              <div className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-600 shadow-sm">
                Afinidad general estimada: 84%
              </div>

              <p className="mt-5 leading-7 text-slate-700">
                Tus respuestas muestran afinidad con actividades relacionadas
                con el uso de tecnología, la solución de problemas, el análisis
                lógico y el diseño de soluciones técnicas.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Recomendación
                    </p>
                    <h4 className="mt-1 text-xl font-bold text-slate-900">
                      Modelo 1
                    </h4>
                  </div>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                    84%
                  </span>
                </div>

                <p className="mt-5 font-semibold text-slate-800">
                  Ingeniería y Tecnología
                </p>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[84%] rounded-full bg-blue-600"></div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Este modelo identifica mayor relación con respuestas asociadas
                  a tecnología, solución técnica y razonamiento práctico.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Recomendación
                    </p>
                    <h4 className="mt-1 text-xl font-bold text-slate-900">
                      Modelo 2
                    </h4>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                    79%
                  </span>
                </div>

                <p className="mt-5 font-semibold text-slate-800">
                  Ingeniería y Tecnología
                </p>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[79%] rounded-full bg-emerald-500"></div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Este modelo también muestra afinidad con el área tecnológica,
                  aunque con un porcentaje ligeramente menor.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <h4 className="font-bold text-emerald-700">
                Interpretación del resultado
              </h4>

              <p className="mt-3 leading-7 text-emerald-800">
                Ambos modelos coinciden en una mayor afinidad hacia el área de
                Ingeniería y Tecnología. Esto sugiere que el perfil académico y
                vocacional del estudiante se relaciona con actividades de
                análisis, resolución de problemas, uso de herramientas digitales
                y creación de soluciones.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Áreas secundarias
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estas áreas también presentan afinidad, aunque en menor nivel.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      Ciencias exactas y agrarias
                    </span>
                    <span className="font-bold text-slate-900">71%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[71%] rounded-full bg-blue-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      Ciencias administrativas
                    </span>
                    <span className="font-bold text-slate-900">58%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[58%] rounded-full bg-emerald-500"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      Humanísticas y sociales
                    </span>
                    <span className="font-bold text-slate-900">45%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[45%] rounded-full bg-slate-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Recomendación de uso
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Este resultado debe entenderse como una guía inicial para apoyar
                la reflexión académica. Se recomienda contrastarlo con el
                acompañamiento de docentes, tutores u orientadores.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Acciones disponibles
              </h3>

              <div className="mt-5 space-y-3">
                <button className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Descargar resultado
                </button>

                <Link
                  to="/cuestionario"
                  className="block w-full rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Revisar cuestionario
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default ResultPage