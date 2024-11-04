
import Link from 'next/link';

export default function Menu() {
  return (
    
      <ul className="flex space-x-8">
        <li><Link href="/app" className="text-white text-xl hover:text-gray-200">Home</Link></li>
        <li><Link href="/servico" className="text-white text-xl hover:text-gray-200">Serviços</Link></li>
        <li><Link href="/cadastro/cad-cadastro" className="text-white text-xl hover:text-gray-200">Cadastro</Link></li>
        <li><Link href="/" className="text-white text-xl hover:text-gray-200">Login</Link></li>
              </ul>
  );
}