/* eslint-disable @typescript-eslint/no-explicit-any */
import { cancelarReferencia } from '@/api/references'; import Link from 'next/link';
import { actualizarEstado } from '@/store/referenceSlice';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
export default function ReferenceCard({ r }: { r: any }) {
  const dispatch = useAppDispatch();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const estados: Record<string, string> = {
    '01': 'Creado',
    '02': 'Pagado',
    '03': 'Cancelado',
    '04': 'Expirado',
  };
  const handleConfirmarCancelacion = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token no disponible');
    setLoading(true);

    try {
      await cancelarReferencia(token, r.reference, 'Cancelada desde dashboard');
      dispatch(actualizarEstado({ reference: r.reference, status: '03' }));
      setMostrarModal(false);
    } catch (err: any) {
      alert(`Error al cancelar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const estiloCancelado = r.status === '03' ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white';


  return (
    <div className={`p-4 rounded shadow border ${estiloCancelado}`}>
    <p className="font-bold text-gray-800">{r.reference}</p>
    <p className="text-sm">Monto: ${r.amount}</p>
    <p className="text-sm">Estado: {estados[r.status] || 'Desconocido'}</p>

    {r.status === '03' && (
      <span className="text-xs text-red-600 font-semibold block mt-1">Referencia cancelada</span>
    )}

    {r.status === '01' && (
      <button
        onClick={() => setMostrarModal(true)}
        className="flex mt-3 text-sm text-red-600 underline hover:text-red-800"
      >
        Cancelar
      </button>
    )}
     <Link href={`/references/${r.paymentId}?ref=${r.reference}`} className="text-blue-600 underline text-sm">
        Ver detalles
    </Link>

    {mostrarModal && (
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-2">¿Cancelar esta referencia?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Esta acción marcará la referencia como cancelada permanentemente.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setMostrarModal(false)}
              className="flex px-3 py-1 border rounded text-sm"
            >
              Cerrar
            </button>
            <button
              disabled={loading}
              onClick={handleConfirmarCancelacion}
              className="flex px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Cancelando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
  //   <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
  //     <h2 className="text-lg font-bold mb-1">{r.reference}</h2>
  //     <p className="text-gray-600 text-sm">{r.description}</p>
  //     <p className="text-sm mt-2">
  //       <span className="font-medium">Monto:</span> ${r.amount}
  //     </p>
  //     <p className="text-sm">
  //       <span className="font-medium">Estado:</span> {estados[r.status] || r.status}
  //     </p>
  //     <p className="text-sm mb-2">
  //       <span className="font-medium">Vence:</span> {r.dueDate}
  //     </p>
  //     <Link href={`/references/${r.paymentId}?ref=${r.reference}`} className="text-blue-600 underline text-sm">
  //       Ver detalles
  //     </Link>
  //     <Link href={`/references/${r.paymentId}?ref=${r.reference}`} className="text-red-600 bg-origin-padding underline text-sm">
  //       Cancelar
  //     </Link>
  //   </div>
  // );
}
