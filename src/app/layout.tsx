'use client';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarNavbar = pathname === '/login';
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <Provider store={store}>
        {!ocultarNavbar && <Navbar />}
        {children}
          {children}
        </Provider>
      </body>
    </html>
  );
}
