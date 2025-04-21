/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerReferenciasLocal } from '@/api/references';
import ReferenceCard from '@/components/ReferenceCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setReferencias } from '@/store/referenceSlice';
import FiltrosReferences, { FiltroReferencias } from '@/components/FlitrosReferences';
import * as Papa from 'papaparse';
import GraficaReferencias from '@/components/GraficaReference';

const REFERENCIAS_POR_PAGINA = 6;

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const referencias = useAppSelector((state) => state.references.lista);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState<FiltroReferencias>({
    fechaInicio: '',
    fechaFin: '',
    montoMin: '',
    montoMax: '',
    estado: '',
    busqueda: '',
  });
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    obtenerReferenciasLocal(token)
      .then((res) => {
        if (Array.isArray(res)) {
          dispatch(setReferencias(res));
        } else {
          throw new Error('La respuesta no es un arreglo de referencias');
        }
      })
      .catch((err) => {
        console.error('Error cargando referencias:', err);
        setError(err.message || 'Error al cargar referencias');
      })
      .finally(() => setLoading(false));
  }, [dispatch, router]);

  const filtradas = referencias.filter((r: any) => {
    const fechaCreacion = r.creationDate?.slice(0, 10) || '';
    if (filtro.fechaInicio && fechaCreacion < filtro.fechaInicio) return false;
    if (filtro.fechaFin && fechaCreacion > filtro.fechaFin) return false;
    if (filtro.estado && r.status !== filtro.estado) return false;
    if (filtro.montoMin && Number(r.amount) < Number(filtro.montoMin)) return false;
    if (filtro.montoMax && Number(r.amount) > Number(filtro.montoMax)) return false;
    const texto = (r.reference + ' ' + (r.description ?? '')).toLowerCase();
    if (filtro.busqueda && !texto.includes(filtro.busqueda.toLowerCase())) return false;
    return true;
  });

  const totalPaginas = Math.ceil(filtradas.length / REFERENCIAS_POR_PAGINA);
  const inicio = (pagina - 1) * REFERENCIAS_POR_PAGINA;
  const actuales = filtradas.slice(inicio, inicio + REFERENCIAS_POR_PAGINA);

  useEffect(() => {
    setPagina(1);
  }, [filtro]);

  const exportarCSV = () => {
    const csv = Papa.unparse(filtradas.map(r => ({
      Referencia: r.reference,
      Descripción: r.description,
      Monto: r.amount,
      Estado: r.status,
      FechaCreación: r.creationDate,
      FechaVencimiento: r.dueDate,
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'referencias.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Referencias</h1>
        <button
          onClick={exportarCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar CSV
        </button>
      </div>

      <FiltrosReferences filtro={filtro} onFiltroChange={setFiltro} />
      <GraficaReferencias data={filtradas} />
      {filtradas.length === 0 ? (
        <p className="text-center text-gray-500">No hay referencias disponibles.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-900">
            {actuales.map((r: any) => (
              <ReferenceCard key={r.paymentId} r={r} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onClick={() => setPagina(pagina + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </main>
  );
}
