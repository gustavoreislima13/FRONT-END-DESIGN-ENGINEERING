export default function Services() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-black">
        <div className="w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-4">Serviços</h2>
          <p className="text-lg text-gray-300 mb-12">Totalmente personalizado para você!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/plataforma_bem_estar.jpg" alt="Plataforma de Bem-Estar" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Plataforma de Bem-Estar</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/previsao_riscos.jpg" alt="Previsão de Riscos" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Previsão de Riscos</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/prevencao_fraudes.jpg" alt="Prevenção de Fraudes" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-blue-400">Prevenção de Fraudes</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/assistencia_juridica.jpg" alt="Assistência Jurídica" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistência Jurídica</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/assistencia_medica.jpg" alt="Assistência Médica" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistência Médica</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src="/assistente_virtual.jpg" alt="Assistente Virtual" className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistente Virtual</h3>
              <p className="text-gray-400">By Porto Seguro | undefined</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
