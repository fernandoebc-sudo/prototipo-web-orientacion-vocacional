function App() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <section className="bg-white rounded-2xl shadow-lg p-8 max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Prototipo de orientación vocacional
        </h1>
        <p className="mt-4 text-slate-600">
          Frontend inicial configurado con React, TypeScript, Vite y Tailwind CSS.
        </p>
        <button className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700">
          Iniciar cuestionario
        </button>
      </section>
    </main>
  )
}

export default App