// app/components/ProductActions.tsx
'use client'; // Tandai sebagai Client Component

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface ProductActionsProps {
  product: Product;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </button>
      <button
        onClick={() => alert('Fitur "Buy Now" belum diimplementasikan.')}
        className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-300"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductActions;