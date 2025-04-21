'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';
import { login } from '@/api/auth';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError('');
    try {
      const token = await login(user, pass);

      if (!token) {
        throw new Error('Token no válido');
      }

      dispatch(setToken(token));
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Iniciar sesión</h1>

      <input
        className="mb-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full max-w-sm text-gray-600 bg-transparent p-2"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        className="mb-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full max-w-sm text-gray-600 bg-transparent p-2"
        placeholder="Contraseña"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full max-w-sm"
      >
        Entrar
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
