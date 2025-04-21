export async function cancelarReferencia(reference: string, motivo: string, token: string) {
    const res = await fetch('https://sandbox-v1.portalventas.net/v1/payment/cancel', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        reference,
        status: '03',
        updateDescription: motivo,
      }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.responseMessage || 'Error al cancelar la referencia');
    }
  
    return data.data;
  }
  