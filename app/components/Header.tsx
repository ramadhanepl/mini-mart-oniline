// app/components/Header.tsx
'use client'; // <-- Tambahkan ini di baris paling atas

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // <-- Impor useCart

const Header: React.FC = () => {
  const { cartItems } = useCart(); // <-- Panggil useCart hook

  // Hitung total kuantitas semua item di keranjang
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors duration-200">
          Mini Mart Online
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/products" className="hover:text-blue-200 transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-200 transition-colors duration-200 relative">
                Cart ({totalItems}) {/* <-- Ganti ini untuk menampilkan totalItems */}
                {/* Kamu bisa menambahkan ikon keranjang di sini */}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;