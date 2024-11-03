'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState, useEffect } from 'react';
import { GlobalSolution } from '@/types/global';
import { GrEdit as Editar } from 'react-icons/gr';
import { RiDeleteBin2Line as Excluir } from 'react-icons/ri';

const API_URL = 'https://api-seu-backend.com'; // Substitua pela URL da sua API

const Dashboard: FC = () => {
  const [contacts, setContacts] = useState([
    { name: 'João Silva', image: '/user-icon1.png', isEditing: false },
    { name: 'Maria Souza', image: '/user-icon2.png', isEditing: false }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Você', message: 'Meu carro está fazendo um barulho estranho.' },
    { sender: 'IA', message: 'Pode descrever melhor o barulho? Parece um som metálico ou um rangido?' },
    { sender: 'Você', message: 'Parece um som metálico, especialmente quando eu acelero.' },
    { sender: 'IA', message: 'Isso pode ser causado por um problema na correia do alternador ou no sistema de exaustão. Recomendo verificar essas partes.' }
  ]);

  const [globals, setGlobals] = useState<GlobalSolution[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentDetails, setAppointmentDetails] = useState({ location: '', description: '' });

  const router = useRouter();

  useEffect(() => {
    // Fetch initial data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/contacts`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    };

    const fetchGlobals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/base-global');
        const data = await response.json();
        setGlobals(data);
      } catch (error) {
        console.error('Erro ao buscar Global Solutions: ', error);
      }
    };

    fetchData();
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

  const addContact = async () => {
    const newContact = { name: 'Novo Contato', image: '/user-icon-default.png', isEditing: false };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);

    // Adiciona o novo contato na API
    try {
      await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
      });
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
    }
  };

  const removeContact = async (index: number) => {
    const contactToRemove = contacts[index];
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);

    // Remove o contato da API
    try {
      await fetch(`${API_URL}/contacts/${contactToRemove.name}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Erro ao remover contato:', error);
    }
  };

  const toggleEditContact = (index: number) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, isEditing: !contact.isEditing } : contact
    );
    setContacts(updatedContacts);
  };

  const handleEditContact = (index: number, newName: string) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, name: newName, isEditing: false } : contact
    );
    setContacts(updatedContacts);

    // Atualiza o contato na API
    try {
      fetch(`${API_URL}/contacts/${contacts[index].name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      });
    } catch (error) {
      console.error('Erro ao editar contato:', error);
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar detalhes do agendamento para a API
    console.log('Agendamento enviado:', { selectedDate, ...appointmentDetails });
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
                    <div key={i} className="py-2 px-4 bg-gray-700 rounded-md">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Localização</label>
                  <input
                    type="text"
                    value={appointmentDetails.location}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Insira a localização do serviço"
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
            <h2 className="text-lg font-bold mb-4 text-white">Lista de Global Solutions</h2>
            <table className="min-w-full bg-gray-900 text-sm text-white rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">ALUNO</th>
                  <th className="py-2 px-4">MATERIA</th>
                  <th className="py-2 px-4">NOTA</th>
                  <th className="py-2 px-4">DATA</th>
                  <th className="py-2 px-4">FEEDBACK</th>
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
                      <Link href="#" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 transition">
                        <Excluir className="inline text-3xl" />
                      </Link>
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

          {/* Seção de Contatos */}
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4">
            <h2 className="text-lg font-bold mb-4 text-white">Lista de Contatos</h2>
            <table className="min-w-full bg-gray-900 text-sm text-white rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Imagem</th>
                  <th className="py-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="py-2 px-4">
                      {contact.isEditing ? (
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => handleEditContact(index, e.target.value)}
                          className="bg-gray-700 text-white p-1 rounded-md"
                        />
                      ) : (
                        contact.name
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Image src={contact.image} alt="" width={24} height={24} className="rounded-full" />
                    </td>
                    <td className="py-2 px-4 flex justify-center items-center">
                      {contact.isEditing ? (
                        <button onClick={() => toggleEditContact(index)} className="text-green-400 hover:text-green-500 transition ml-2">Salvar</button>
                      ) : (
                        <>
                          <button onClick={() => toggleEditContact(index)} className="text-blue-400 hover:text-blue-500 transition ml-2">Editar</button>
                          <button onClick={() => removeContact(index)} className="text-red-400 hover:text-red-500 transition ml-2">Excluir</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addContact} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md">
              Adicionar Contato
            </button>
          </div>
        </div>

        {/* Seção de Notificações, Atividades e Contatos */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-base font-bold mb-2 text-white">Notificações</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-white">
                <span>Novo usuário registrado.</span>
                <span className="text-gray-400 ml-auto">59 minutos atrás</span>
              </li>
              <li className="flex items-center text-sm text-white">
                <span>Você corrigiu um bug.</span>
                <span className="text-gray-400 ml-auto">Agora mesmo</span>
              </li>
              <li className="flex items-center text-sm text-white">
                <span>Você corrigiu um bug.</span>
                <span className="text-gray-400 ml-auto">12 horas atrás</span>
              </li>
              <li className="flex items-center text-sm text-white">
                <span>Andi Lane se inscreveu.</span>
                <span className="text-gray-400 ml-auto">Hoje, 11:59 AM</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-base font-bold mb-2 text-white">Atividades Recentes</h2>
            <div className="h-60 rounded-md overflow-hidden mb-4">
              {/* Mapa inserido aqui */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.633308%2C-23.55052%2C-46.625290%2C-23.545428&layer=mapnik"
                className="w-full h-full border rounded-lg"
              ></iframe>
            </div>
            <form className="space-y-2">
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
