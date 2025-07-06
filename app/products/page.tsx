// app/products/page.tsx
import React from 'react';
import { Product } from '@/types/product'; // Import tipe Product
import ProductCard from '@/components/ProductCard'; // Nanti kita buat komponen ini

// Data produk dummy statis untuk saat ini
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'Latest model with advanced features.',
    price: 799.99,
    imageUrl: '/images/smartphone.jpg', // Ganti dengan URL gambar yang sesuai
    category: 'Electronics',
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling, comfortable design.',
    price: 149.99,
    imageUrl: '/images/headphone.jpg', // Ganti dengan URL gambar yang sesuai
    category: 'Audio',
    rating: { rate: 4.2, count: 85 },
  },
  {
    id: '3',
    name: 'Smartwatch Pro',
    description: 'Track your fitness and stay connected.',
    price: 249.00,
    imageUrl: '/images/smartwatch.jpg', // Ganti dengan URL gambar yang sesuai
    category: 'Wearables',
    rating: { rate: 4.8, count: 200 },
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit, tactile switches.',
    price: 99.50,
    imageUrl: '/images/keyboard.jpg', // Ganti dengan URL gambar yang sesuai
    category: 'Peripherals',
    rating: { rate: 4.7, count: 150 },
  },
];

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;