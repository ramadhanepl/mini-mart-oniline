// app/products/[productId]/page.tsx
import React from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import ProductActions from '@/components/ProductActions'; // <-- Impor komponen klien kita

// --- Fungsi untuk mendapatkan detail produk berdasarkan ID dari API ---
async function getProductDetails(productId: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!res.ok) {
      // Jika produk tidak ditemukan (misal: ID tidak valid), API akan mengembalikan error 4xx
      return undefined;
    }
    const apiProduct = await res.json();

    // Jika API mengembalikan null atau hasil kosong
    if (!apiProduct) return undefined;

    // Sesuaikan data API dengan tipe 'Product' kita
    const product: Product = {
      id: apiProduct.id.toString(),
      name: apiProduct.title,
      description: apiProduct.description,
      price: apiProduct.price,
      imageUrl: apiProduct.image,
      category: apiProduct.category,
      rating: {
        rate: apiProduct.rating.rate,
        count: apiProduct.rating.count,
      },
    };
    return product;

  } catch (error) {
    console.error(error);
    return undefined;
  }
}

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

// --- Komponen Page untuk detail produk ---
const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const product = await getProductDetails(params.productId);

  // Jika produk tidak ditemukan, tampilkan pesan
  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Produk tidak ditemukan!</h1>
        <div className="mt-4">
          <Link href="/products" className="text-blue-600 hover:underline text-lg">
            &larr; Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  // Jika produk ditemukan, tampilkan detailnya
  return (
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-xl my-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bagian Gambar Produk */}
        <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-100 rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="max-h-96 object-contain"
            priority // Prioritaskan gambar utama untuk dimuat lebih cepat
          />
        </div>

        {/* Bagian Detail Produk */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4 capitalize">{product.category}</p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl mr-2">
              {'⭐'.repeat(Math.round(product.rating.rate))}
              {'☆'.repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="text-gray-700 text-lg font-semibold">
              {product.rating.rate} ({product.rating.count} ulasan)
            </span>
          </div>

          <p className="text-5xl font-bold text-blue-700 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-800 leading-relaxed mb-6">
            {product.description}
          </p>
          
          {/* Gunakan komponen klien untuk bagian yang interaktif */}
          <ProductActions product={product} />

          <div className="mt-8 text-center">
            <Link href="/products" className="text-blue-600 hover:underline text-lg">
              &larr; Kembali ke Daftar Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;