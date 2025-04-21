import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch('https://sandbox-v1.portalventas.net/v1/payment', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${body.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      externalId: body.externalId,
      amount: body.amount,
      description: body.description,
      dueDate: body.dueDate,
      callbackURL: body.callbackURL,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.responseMessage || 'Error al crear' }, { status: res.status });
  }

  return NextResponse.json(data.data);
}
