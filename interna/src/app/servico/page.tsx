import Image from 'next/image';
import imagem1 from '@/image/1.png';
import imagem2 from '@/image/2.png';
import imagem3 from '@/image/3.png';
import imagem4 from '@/image/4.png';
import imagem5 from '@/image/5.png';
import imagem6 from '@/image/6.png';

export default function Services() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-black">
        <div className="w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-4">Serviços</h2>
          <p className="text-lg text-gray-300 mb-12">Totalmente personalizado para você!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem1} alt="Plataforma de Bem-Estar" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Plataforma de Bem-Estar</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem2} alt="Previsão de Riscos" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Previsão de Riscos</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem3} alt="Prevenção de Fraudes" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-blue-400">Prevenção de Fraudes</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem4} alt="Assistência Jurídica" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistência Jurídica</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem5} alt="Assistência Médica" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistência Médica</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image src={imagem6} alt="Assistente Virtual" width={600} height={400} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white">Assistente Virtual</h3>
              <p className="text-gray-400">By Porto Seguro</p>
            </div>
          </div>
        </div>
      </section>
    );
}
