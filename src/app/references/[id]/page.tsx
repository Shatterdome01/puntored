/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { cancelarReferencia, obtenerDetalleReferencia } from "@/api/references";
import jsPDF from "jspdf";

export default function DetalleReferenciaPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const references = searchParams.get("ref");

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !references || !id) {
      setError("Faltan datos");
      console.log("token:", token);
      console.log("id (externalId):", id);
      console.log("reference:", references);
      setLoading(false);
      return;
    }

    obtenerDetalleReferencia(token, id as string, references)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, references]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!data) return null;

  const estados: Record<string, string> = {
    "01": "Creado",
    "02": "Pagado",
    "03": "Cancelado",
    "04": "Expirado",
  };
  

  const handleCancelar = async () => {
    const token = localStorage.getItem('token');
    if (!token || !references) return alert('Faltan datos');
  
    const confirmar = confirm('¿Deseas cancelar esta referencia?');
    if (!confirmar) return;
  
    try {
      await cancelarReferencia(token, references, 'Cancelada por el usuario');
      alert('✅ Referencia cancelada');
      window.location.reload();     
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Detalle de Referencia', 20, 20);
    doc.setFontSize(11);
  
    const info = [
      `Referencia: ${data.reference}`,
      `Descripción: ${data.description}`,
      `Monto: $${data.amount}`,
      `Estado: ${estados[data.status] || 'Desconocido'}`,
      `Creación: ${data.creationDate}`,
      `Vencimiento: ${data.dueDate}`,
    ];
  
    if (data.status === '02') {
      info.push(`Fecha de pago: ${data.paymentDate}`);
      info.push(`Autorización: ${data.authorizationNumber}`);
    }
  
    if (data.status === '03') {
      info.push(`Motivo de cancelación: ${data.cancelDescription || '-'}`);
    }
  
    info.forEach((linea, i) => {
      doc.text(linea, 20, 30 + i * 10);
    });
  
    doc.save(`Referencia_${data.reference}.pdf`);
  };
  

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-950">
        Detalle de Referencia
      </h1>

      <div className="space-y-3 text-sm">
        <Detalle label="Referencia" valor={data.reference} />
        <Detalle label="Descripción" valor={data.description} />
        <Detalle label="Monto" valor={`$${data.amount}`} />
        <Detalle label="Creación" valor={data.creationDate} />
        <Detalle label="Vencimiento" valor={data.dueDate} />
        <Detalle label="Estado" valor={estados[data.status] || "Desconocido"} />
        {data.status === "03" && (
          <Detalle
            label="Motivo de cancelación"
            valor={data.cancelDescription || "-"}
          />
        )}
        {data.status === "02" && (
          <>
            <Detalle label="Fecha de pago" valor={data.paymentDate || "-"} />
            <Detalle
              label="Autorización"
              valor={data.authorizationNumber || "-"}
            />
          </>
        )}
      </div>
      {data.status === "01" && (
        <button
          onClick={handleCancelar}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancelar referencia
        </button>
      )}
      <button
  onClick={generarPDF}
  className="mt-6 flex bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  Descargar PDF
</button>
    </main>
  );
}

function Detalle({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <span className="text-gray-600 font-medium">{label}</span>
      <div className="text-gray-800">{valor}</div>
    </div>
  );
}
