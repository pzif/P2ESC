import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Curso 1', 'Curso 2', 'Curso 3'],
  datasets: [
    {
      label: 'Progresso (%)',
      data: [80, 45, 60],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Progresso dos Cursos' },
  },
};

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded shadow">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}