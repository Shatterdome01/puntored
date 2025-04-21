import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { token, reference } = await req.json();

  if (!token || !reference || !id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const res = await fetch(`https://sandbox-v1.portalventas.net/v1/payment/${reference}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.responseMessage || 'Error al obtener detalle' },
      { status: res.status }
    );
  }

  return NextResponse.json(data.data);
}
