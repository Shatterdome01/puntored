/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { obtenerDetalleReferencia } from "@/api/references";

export default function ReferenciasPage() {
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log("Token:", token);

    const id = "";
    const reference = "someReference";

    obtenerDetalleReferencia(token, id, reference)
      .then(setDatos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Referencias creadas</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Referencia</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((ref) => (
              <tr key={ref.reference} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  {ref.reference}
                  <button
                    onClick={() => navigator.clipboard.writeText(ref.reference)}
                    className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                    title="Copiar al portapapeles"
                  >
                    📋
                  </button>
                </td>
                <td className="p-2">{ref.description}</td>
                <td className="p-2 text-center">${ref.amount}</td>
                <td className="p-2">{ref.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
