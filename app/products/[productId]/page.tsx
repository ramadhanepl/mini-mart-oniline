// app/products/[productId]/page.tsx
import React from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

// Data produk dummy yang sama dengan di page.tsx
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'Latest model with advanced features.',
    price: 799.99,
    imageUrl: '/images/smartphone.jpg',
    category: 'Electronics',
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling, comfortable design.',
    price: 149.99,
    imageUrl: '/images/headphone.jpg',
    category: 'Audio',
    rating: { rate: 4.2, count: 85 },
  },
  {
    id: '3',
    name: 'Smartwatch Pro',
    description: 'Track your fitness and stay connected.',
    price: 249.00,
    imageUrl: '/images/smartwatch.jpg',
    category: 'Wearables',
    rating: { rate: 4.8, count: 200 },
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit, tactile switches.',
    price: 99.50,
    imageUrl: '/images/keyboard.jpg',
    category: 'Peripherals',
    rating: { rate: 4.7, count: 150 },
  },
];

// Fungsi untuk mendapatkan detail produk berdasarkan ID dari data dummy
// Ini akan disimulasikan sebagai "server-side fetching"
async function getProductDetails(productId: string): Promise<Product | undefined> {
  // Simulasi penundaan jaringan
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyProducts.find(p => p.id === productId);
}

// Komponen Page untuk detail produk
interface ProductDetailsPageProps {
  params: {
    productId: string; // Next.js akan mengisi ini dari URL
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => { // Hapus React.FC jika tidak digunakan
  const product = await getProductDetails(params.productId);

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        Product not found!
        <div className="mt-4">
            <Link href="/products" className="text-blue-600 hover:underline text-lg">
                &larr; Back to Products
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-xl my-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bagian Gambar Produk */}
        <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-100 rounded-lg">
          <Image
            src={product.imageUrl} // <-- Menggunakan product.imageUrl
            alt={product.name}    // <-- Menggunakan product.name
            width={400}
            height={400}
            className="max-h-96 object-contain"
            priority
          />
        </div>

        {/* Bagian Detail Produk */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {product.name} {/* Menggunakan product.name */}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{product.category}</p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl mr-2">
              {'⭐'.repeat(Math.floor(product.rating.rate))}
            </span>
            <span className="text-gray-700 text-lg font-semibold">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-5xl font-bold text-blue-700 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-800 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-xl font-semibold hover:bg-gray-300 transition duration-300">
              Buy Now
            </button>
          </div>

          {/* Kembali ke daftar produk */}
          <div className="mt-8 text-center">
            <Link href="/products" className="text-blue-600 hover:underline text-lg">
              &larr; Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;