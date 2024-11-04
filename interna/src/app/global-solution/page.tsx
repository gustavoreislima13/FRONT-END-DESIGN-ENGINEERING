"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState, useEffect } from 'react';

import { GrEdit as Editar } from 'react-icons/gr';
import { RiDeleteBin2Line as Excluir } from 'react-icons/ri';

const API_URL = 'https://api-seu-backend.com'; // Substitua pela URL da sua API

const Dashboard: FC = () => {
  const handleSolicitationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Solicitação enviada para a oficina mais próxima!');
    e.currentTarget.reset();
    const form = e.target as HTMLFormElement;
    form.reset();
    ;
  };
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Você', message: 'Meu carro está fazendo um barulho estranho.' },
    { sender: 'IA', message: 'Pode descrever melhor o barulho? Parece um som metálico ou um rangido?' },
    { sender: 'Você', message: 'Parece um som metálico, especialmente quando eu acelero.' },
    { sender: 'IA', message: 'Isso pode ser causado por um problema na correia do alternador ou no sistema de exaustão. Recomendo verificar essas partes.' }
    
  ]);

  const [globals, setGlobals] = useState<GlobalSolution[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: '', description: '' });

  const router = useRouter();

  useEffect(() => {
    const fetchGlobals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/base-global');
        const data = await response.json();
        setGlobals(data);
      } catch (error) {
        console.error('Erro ao buscar Global Solutions: ', error);
      }
    };

    fetchGlobals();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/base-global/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Global Solution excluída com sucesso.');
        setGlobals((prevGlobals) => prevGlobals.filter((global) => global.id !== id));
      }
    } catch (error) {
      console.error('Falha ao remover a Global Solution: ', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...chatMessages, { sender: 'Você', message: newMessage }];
      setChatMessages(updatedMessages);

      // Envia a mensagem para a API
      try {
        await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: newMessage })
        });
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }

      setNewMessage('');
    }
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setAppointmentDetails({ ...appointmentDetails, date: `2024-09-${day}` });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar detalhes do agendamento para a API
    console.log('Agendamento enviado:', appointmentDetails);
    alert('Agendamento realizado com sucesso!');
    setAppointmentDetails({ date: '', description: '' });
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Conteúdo Principal */}
      <main className={`flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 ml-auto transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50 pointer-events-none lg:pointer-events-auto lg:opacity-100' : ''}`}>
        <div className="lg:col-span-3">
          {/* Análise e Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <h2 className="text-lg font-bold mb-2 text-white">Chat com IA - Diagnóstico do Carro</h2>
              <div className="h-72 overflow-y-auto border rounded-lg p-4 bg-gray-900">
                {/* Simulação de Chat com IA */}
                <div className="space-y-2">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`p-2 rounded-md ${message.sender === 'Você' ? 'bg-gray-700' : 'bg-blue-700'}`}>
                      <strong className="text-white">{message.sender}:</strong> <span className="text-white">{message.message}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  className="flex-1 rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mr-2"
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
                >
                  Enviar
                </button>
              </div>
            </div>

            {/* Calendário e Agendamento de Serviço */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <h2 className="text-lg font-bold mb-2 text-white">Calendário e Agendamento de Serviço</h2>
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                {/* Calendário Estático */}
                <div className="grid grid-cols-7 gap-2 text-center text-white">
                  <div>Dom</div>
                  <div>Seg</div>
                  <div>Ter</div>
                  <div>Qua</div>
                  <div>Qui</div>
                  <div>Sex</div>
                  <div>Sáb</div>
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => handleDateClick(i + 1)}
                      className={`py-2 px-4 rounded-md cursor-pointer ${selectedDate === i + 1 ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Data Escolhida</label>
                  <input
                    type="text"
                    value={appointmentDetails.date}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Descrição do Serviço</label>
                  <textarea
                    value={appointmentDetails.description}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Descrição do serviço a ser realizado"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md">
                  Agendar Serviço
                </button>
              </form>
            </div>
          </div>

          {/* Seção da Lista de Pedidos (Adaptada para Global Solutions) */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4">
            <h2 className="text-lg font-bold mb-4 text-white">Veículos</h2>
            <table className="min-w-full bg-gray-900 text-sm text-white rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Modelo</th>
                  <th className="py-2 px-4">Final da placa</th>
                  <th className="py-2 px-4">DATA</th>
                  <th className="py-2 px-4">Cor</th>
                  <th className="py-2 px-4">EDITAR | EXCLUIR</th>
                </tr>
              </thead>
              <tbody>
                {globals.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800">
                    <td className="py-2 px-4">{p.id}</td>
                    <td className="py-2 px-4">{p.aluno}</td>
                    <td className="py-2 px-4">{p.materia}</td>
                    <td className="py-2 px-4">{p.nota}</td>
                    <td className="py-2 px-4">{p.data}</td>
                    <td className="py-2 px-4">{p.feedback}</td>
                    <td className="py-2 px-4 flex justify-center items-center">
                      <Link href={`/global-solution/${p.id}`} className="text-pink-500 hover:text-pink-600 transition mr-2">
                        <Editar className="inline text-3xl" />
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 transition">
                        <Excluir className="inline text-3xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="py-2 px-4 text-center">
                    Quantidade de global já realizadas: {globals.length}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Seção de Atividades e Contatos */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-base font-bold mb-2 text-white">Localização</h2>
            <div className="h-60 rounded-md overflow-hidden mb-4">
              {/* Mapa inserido aqui */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.633308%2C-23.55052%2C-46.625290%2C-23.545428&layer=mapnik"
                className="w-full h-full border rounded-lg"
              ></iframe>
            </div>
            <form onSubmit={handleSolicitationSubmit} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">Localização</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Insira sua localização"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Detalhes Adicionais</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Quaisquer detalhes adicionais"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md">
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
