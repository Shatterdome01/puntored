/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { crearReferenciaLocal } from '@/api/references';
import { useAppDispatch } from '@/store/hooks';
import { agregarReferencia }from '@/store/referenceSlice';
//import { useRouter } from 'next/navigation';


export default function CrearReferenciaPage() {
  //const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    externalId: '',
    amount: '',
    description: '',
    dueDate: '',
    callbackURL: 'https://localhost:3000/callback',
  });

  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = Object.values(form).every((v) => v.trim() !== '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatFecha = (input: string) => {
    const d = new Date(input);
    return d.toISOString().slice(0, 19).replace('T', ' ');
  };


  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setMensaje('Token faltante');
    setLoading(true);
    setMensaje('');

    try {
      const result = await crearReferenciaLocal({
        token,
        externalId: form.externalId,
        amount: parseFloat(form.amount),
        description: form.description,
        dueDate: formatFecha(form.dueDate),
        callbackURL: form.callbackURL,
      });
      dispatch(agregarReferencia(result));
      setMensaje(`✅ Referencia creada: ${result.reference}`);
      setForm({
        externalId: '',
        amount: '',
        description: '',
        dueDate: '',
        callbackURL: 'https://localhost:3000/callback',
      });
    } catch (err: any) {
      setMensaje(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const campos: { name: keyof typeof form; label: string; type?: string }[] = [
    { name: 'externalId', label: 'Referencia' },
    { name: 'dueDate', label: 'Fecha de pago', type: 'datetime-local' },
    { name: 'description', label: 'Descripción' },
    { name: 'amount', label: 'Monto', type: 'number' },
  ];

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Crear nueva referencia</h1>

      {campos.map((campo) => (
        <div key={campo.name} className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">{campo.label}</label>
          <input
            name={campo.name}
            type={campo.type || 'text'}
            step={campo.name === 'amount' ? '0.01' : undefined}
            className="p-2 border rounded w-full, text-gray-700"
            value={form[campo.name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button
        disabled={!isValid || loading}
        onClick={handleSubmit}
        className="w-full py-2 rounded bg-blue-600 text-white font-bold disabled:opacity-50"
      >
        {loading ? 'Creando...' : 'Crear'}
      </button>

      {mensaje && <p className="mt-4 text-blue-600">{mensaje}</p>}
    </main>
  );
}

// function agregarReferencia(result: any): any {
//   throw new Error('Function not implemented.');
// }
 