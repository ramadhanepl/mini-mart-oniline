// app/cart/page.tsx
'use client'; // <-- Tandai sebagai Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext'; // Impor useCart

const CartPage: React.FC = () => {
  const { cartItems } = useCart(); // Dapatkan item keranjang dari context

  // Hitung total harga keranjang
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(cartItems);
  console.log(subtotal);
  

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-xl my-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          <p>Your cart is empty.</p>
          <Link href="/products" className="text-blue-600 hover:underline mt-4 block">
            Go to Products
          </Link>
        </div>
      ) : (
        <div>
          {/* Daftar Item Keranjang */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 last:border-b-0"
              >
                <div className="w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                {/* Di sini nanti akan ada tombol untuk mengubah kuantitas atau menghapus */}
              </div>
            ))}
          </div>

          {/* Ringkasan Total */}
          <div className="mt-8 pt-4 border-t-2 border-gray-200 flex justify-between items-center text-2xl font-bold text-gray-900">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Tombol Checkout (placeholder) */}
          <div className="mt-6 text-right">
            <button className="bg-green-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-green-700 transition-colors duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;