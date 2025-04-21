'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('❌ Error capturado por error.tsx:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">500 - Error interno</h1>
      <p className="text-gray-700 mb-6">
        Ocurrió un error inesperado. Intenta recargar la página o vuelve más tarde.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="bg-gray-300 text-gray-900 px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
