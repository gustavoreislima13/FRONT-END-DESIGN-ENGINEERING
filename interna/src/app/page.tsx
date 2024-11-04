import Image from 'next/image';
import dynamic from 'next/dynamic';

export default async function Tema1() {
  const response = await fetch(`http://localhost:3000/api`);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full">
        <div className="flex-1 text-left md:text-left p-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Atendimento com <span className="text-blue-500">inteligência Artificial</span>
          </h1>
          <p className="text-lg text-gray-300">
            Atendimento inovador com IA. Soluções ágeis e personalizadas aprendendo continuamente para oferecer o melhor serviço!
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition duration-200">
            Saiba mais
          </button>
        </div>
        <div className="flex-1 p-4">
          <Image
            src="/atendimento_ia.png"
            alt="Imagem de atendimento IA"
            width={600} 
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-6xl w-full">
        <div className="flex flex-col items-center text-center p-4">
          <div className="mb-4">
            <Image src="/ubi_icon.png" alt="UBI Icon" width={50} height={50} />
          </div>
          <h3 className="text-xl font-semibold text-white">UBI</h3>
          <p className="text-gray-300">Economize em sua apólice de seguro com descontos.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="mb-4">
            <Image src="/assistencia24h_icon.png" alt="Assistência 24h Icon" width={50} height={50} />
          </div>
          <h3 className="text-xl font-semibold text-white">Assistência 24h</h3>
          <p className="text-gray-300">Oferecemos suporte emergencial 24/7 adaptado.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="mb-4">
            <Image src="/preventiva_icon.png" alt="Preventiva Icon" width={50} height={50} />
          </div>
          <h3 className="text-xl font-semibold text-white">Preventiva</h3>
          <p className="text-gray-300">Mantenha seu carro em perfeitas condições.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="mb-4">
            <Image src="/seguros_ia_icon.png" alt="Seguros com IA Icon" width={50} height={50} />
          </div>
          <h3 className="text-xl font-semibold text-white">Seguros com IA</h3>
          <p className="text-gray-300">Recursos de IA para otimizar a interação.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mt-16 p-6 bg-gray-800 rounded-lg">
        <div className="flex-1 p-4">
          <Image
            src="/vantagem_illustration.png"
            alt="Ilustração de vantagem"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 p-4">
          <h2 className="text-3xl font-bold text-white mb-6">Vantagem Porto Seguro</h2>
          <ul className="list-none space-y-4 text-lg text-gray-300">
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Suporte contínuo para emergências e dúvidas, disponível 24/7.
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Ofertas especiais e benefícios
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Recompensas por permanência
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Atendimento personalizado com IA
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Aplicativo móvel intuitivo com IA
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span> Coberturas flexíveis e customizáveis
            </li>
          </ul>
          <div className="mt-6">
            <button className="mr-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition duration-200">
              Fale conosco
            </button>
            <button className="px-6 py-3 bg-transparent text-blue-600 font-semibold rounded-md border border-blue-600 hover:bg-blue-100 transition duration-200">
              Veja mais
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center max-w-6xl w-full mt-16 p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Integrantes</h2>
        <p className="text-lg text-gray-300 mb-8">Na Porto Seguro, acreditamos nas pessoas que fazem acontecer!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/plataforma_bem_estar.png"
              alt="Plataforma de Bem-Estar"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Gustavo Lima</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/previsao_riscos.png"
              alt="Previsão de Riscos"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Leonardo Fonseca</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/prevencao_fraudes.png"
              alt="Prevenção de Fraudes"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Julia Brito</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center max-w-6xl w-full mt-16 p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Feedback de nossos clientes</h2>
        <p className="text-lg text-gray-300 mb-8">Sempre fazendo o melhor!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Image
                src="/jose_almeida.png"
                alt="Jose Almeida"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <h3 className="text-2xl font-semibold text-white">Jose Almeida</h3>
            </div>
            <p className="text-gray-300">
              Estou extremamente satisfeito com a Porto Seguro! O atendimento foi impecável e a equipe demonstrou um profissionalismo excepcional. Além disso, fiquei impressionado com a modernidade e a facilidade que a inteligência artificial trouxe para o processo. Com certeza recomendo!
            </p>
          </div>
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Image
                src="/cristiano_robinho.png"
                alt="Cristiano Robinho"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <h3 className="text-2xl font-semibold text-white">Cristiano Robinho</h3>
            </div>
            <p className="text-gray-300">
              Minha experiência com a Porto Seguro foi incrível! O suporte fornecido foi além das minhas expectativas, mostrando um cuidado genuíno com o cliente. A integração da IA tornou tudo tão simples e rápido, o que me deixou impressionado com o compromisso da empresa com a modernidade e a eficiência. Parabéns à equipe pelo excelente trabalho!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center max-w-6xl w-full mt-16 p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Nossos serviços</h2>
        <p className="text-lg text-gray-300 mb-8">Feitos especialmente para cada um!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/plataforma_bem_estar.png"
              alt="Plataforma de Bem-Estar"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Plataforma de Bem-Estar</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/previsao_riscos.png"
              alt="Previsão de Riscos"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Previsão de Riscos</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
          <div className="flex flex-col items-start text-left p-4 bg-gray-800 rounded-lg shadow-md">
            <Image
              src="/prevencao_fraudes.png"
              alt="Prevenção de Fraudes"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Prevenção de Fraudes</h3>
            <p className="text-gray-300">By Porto Seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
}