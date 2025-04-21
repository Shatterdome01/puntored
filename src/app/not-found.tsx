'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">404 - Página no encontrada</h1>
      <p className="text-gray-700 mb-6">
        La página que estás buscando no existe o fue movida.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
