import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { token, reference, updateDescription } = await req.json();

  const res = await fetch('https://sandbox-v1.portalventas.net/v1/payment/cancel', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reference,
      status: '03', 
      updateDescription,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.responseMessage || 'Error al cancelar' }, { status: res.status });
  }

  return NextResponse.json(data.data);
}
