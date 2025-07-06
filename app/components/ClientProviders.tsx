// app/components/ClientProviders.tsx
'use client'; // <-- Tandai sebagai Client Component

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header'; // Impor Header
import Footer from '@/components/Footer'; // Impor Footer

interface ClientProvidersProps {
  children: React.ReactNode;
}

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <CartProvider>
      {/* Header dan Footer di sini agar bisa mengakses CartContext jika diperlukan */}
      <Header />
      <main className="flex-grow"> {/* main akan mengambil sisa ruang untuk konten halaman */}
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
};