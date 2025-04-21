import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 30);

  const format = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');

  const url = new URL('https://sandbox-v1.portalventas.net/v1/payment/search');
  url.searchParams.set('startCreationDate', format(start));
  url.searchParams.set('endCreationDate', format(now));
  url.searchParams.set('status', '01'); 
  url.searchParams.set('paginate', '50');
  url.searchParams.set('page', '0');

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
console.log('token enviado', token)
  
  const data = await res.json();

  if (!res.ok) {
    console.log('Error en la respuesta', data)
    return NextResponse.json(
      { error: data.responseMessage || data.message || 'Error al obtener referencias' },
      { status: res.status }
    );
  }

  // return NextResponse.json({ message: 'RUTA /api/references funciona chido' });

  return NextResponse.json(data.data?.content || []); 
  // return NextResponse.json(data.data); // Cambiado para devolver todo el objeto data.data
}
