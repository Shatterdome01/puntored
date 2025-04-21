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
  const contadores: { [key in '01' | '02' | '03' | '04']: number } = {
    '01': 0, 
    '02': 0,
    '03': 0, 
    '04': 0, 
  };

  data.forEach((r) => {
    const key = r.status as keyof typeof contadores;
    if (contadores[key] !== undefined) contadores[key]++;
  });

  const chartData = {
    labels: ['Creadas', 'Pagadas', 'Canceladas', 'Expiradas'],
    datasets: [
      {
        label: 'Referencias',
        data: [
          contadores['01'],
          contadores['02'],
          contadores['03'],
          contadores['04'],
        ],
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
