export async function crearReferenciaLocal(datos: {
    token: string;
    externalId: string;
    amount: number;
    description: string;
    dueDate: string;
    callbackURL: string;
  }) {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear');
  
    return data;
  }
  
  export async function obtenerReferenciasLocal(token: string) {
    const res = await fetch('/api/references', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar referencias');
  
    return data;
  }
  
  // Función para obtener detalle de una referencia
  export async function obtenerDetalleReferencia(
    token: string,
    id: string,
    reference: string
  ) {
    const res = await fetch(`/api/references/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, reference }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener detalle');
  
    return data;
  }
  
  export async function cancelarReferencia(
    token: string,
    reference: string,
    updateDescription: string
  ) {
    const res = await fetch('/api/cancel', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, reference, updateDescription }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cancelar');
  
    return data;
  }
  