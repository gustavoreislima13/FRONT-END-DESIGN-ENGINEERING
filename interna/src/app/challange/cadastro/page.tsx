'use client';

import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for user registration can be added here
    console.log('Cadastro realizado com sucesso!');
    router.push('/global-solution');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-black via-blue-800 to-blue-500">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Cadastro</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="cpf"
              className="w-full p-4 pl-12 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="CPF"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="name"
              className="w-full p-4 pl-12 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome"
              required
            />
          </div>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              className="w-full p-4 pl-12 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Telefone"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full p-4 pl-12 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full p-4 pl-12 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Senha"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
