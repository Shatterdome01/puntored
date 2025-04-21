import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch('https://sandbox-v1.portalventas.net/v1/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.responseMessage || 'Error en la autenticación' }, { status: 401 });
  }

  return NextResponse.json(data.data); 
}
