'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAutenticado(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Puntored</h1>
        {autenticado && (
           <div className="space-x-4">
           <Link href="/dashboard" className="hover:underline">Dashboard</Link>
           <Link href="/references/create" className="hover:underline">Crear</Link>
           <button
             onClick={handleLogout}
             className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
           >
             Cerrar sesión
           </button>
         </div>
        )}
       
      </div>
    </nav>
  );
}


