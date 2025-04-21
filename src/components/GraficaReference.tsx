/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficaReferencias({ data }: { data: any[] }) {
  const estados = ['01', '02', '03', '04'] as const;
  const nombres = {
    '01': 'Creadas',
    '02': 'Pagadas',
    '03': 'Canceladas',
    '04': 'Expiradas',
  };

  const contadores = estados.reduce((acc, estado) => {
    acc[estado] = data.filter((r) => r.status === estado).length;
    return acc;
  }, {} as Record<typeof estados[number], number>);

  const chartData = {
    labels: estados.map((e) => nombres[e]),
    datasets: [
      {
        label: 'Referencias',
        data: estados.map((e) => contadores[e]),
        backgroundColor: ['#3b82f6', '#22c55e', '#ef4444', '#facc15'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Resumen de Referencias' },
    },
  };

  return (
    <div className="mb-6 bg-white p-4 rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
}
