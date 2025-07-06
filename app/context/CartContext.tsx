// app/context/CartContext.tsx
'use client'; // <-- Tandai sebagai Client Component

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/types/product'; // Impor tipe Product

// Definisikan tipe untuk item di keranjang
interface CartItem extends Product {
  quantity: number;
}

// Definisikan tipe untuk CartContextValue
interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  // Di masa depan bisa ada: removeFromCart, updateQuantity, dll.
}

// Buat Context
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Buat CartProvider untuk membungkus komponen yang membutuhkan akses ke keranjang
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Jika produk sudah ada, tingkatkan kuantitasnya
        console.log('YYYYYYYYYY');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        console.log('XXXXXXXXXX');
        // Jika produk belum ada, tambahkan sebagai item baru dengan kuantitas 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook untuk memudahkan penggunaan CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};