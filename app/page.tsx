// app/page.tsx
import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard'; // Mengimpor komponen ProductCard Anda
import { Product } from '@/types/product';       // Mengimpor tipe data Product

// --- Fungsi untuk mengambil data dari Fake Store API ---
// Kita akan mengambil semua produk, lalu memilih beberapa untuk ditampilkan.
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=4'); // Ambil 4 produk saja dari API
    if (!res.ok) {
      throw new Error('Gagal mengambil data produk');
    }
    const apiProducts = await res.json();

    // Sesuaikan (mapping) data dari API agar cocok dengan tipe 'Product' kita
    const products: Product[] = apiProducts.map((apiProduct: any) => ({
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
    }));

    return products;

  } catch (error) {
    console.error(error);
    return []; // Kembalikan array kosong jika gagal
  }
}


// --- Komponen Halaman Utama (Sekarang menjadi async) ---
const HomePage = async () => {
  // Panggil fungsi untuk mendapatkan produk unggulan
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="container mx-auto px-4">
      
      {/* 1. Hero Section (Tidak berubah) */}
      <section className="text-center py-16 my-8 bg-blue-500 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Selamat Datang di Mini Mart!</h1>
        <p className="text-xl mb-8">Semua kebutuhan Anda ada di sini, dari gadget hingga kebutuhan harian.</p>
        <Link href="/products" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300">
          Belanja Sekarang
        </Link>
      </section>

      {/* 2. Featured Categories Section (Tidak berubah) */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">Kategori Pilihan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Link href="/products?category=electronics" className="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
            <span className="text-4xl">📱</span>
            <h3 className="font-semibold mt-2">Elektronik</h3>
          </Link>
          <Link href="/products?category=men's clothing" className="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
            <span className="text-4xl">👕</span>
            <h3 className="font-semibold mt-2">Pakaian Pria</h3>
          </Link>
          <Link href="/products?category=women's clothing" className="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
            <span className="text-4xl">👚</span>
            <h3 className="font-semibold mt-2">Pakaian Wanita</h3>
          </Link>
          <Link href="/products?category=jewelery" className="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
            <span className="text-4xl">💍</span>
            <h3 className="font-semibold mt-2">Perhiasan</h3>
          </Link>
        </div>
      </section>

      {/* 3. Featured Products Section (Sekarang menggunakan data dari API) */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">🔥 Produk Terlaris</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">Gagal memuat produk unggulan.</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default HomePage;