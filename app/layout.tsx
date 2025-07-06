// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders'; // Import ClientProviders

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mini Mart Online', // Judul situs
  description: 'Your one-stop shop for everything!', // Deskripsi situs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        <ClientProviders> {/* Gunakan ClientProviders untuk membungkus konten utama */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}