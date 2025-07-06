'use client';
// app/components/ProductCard.tsx
import React from 'react'; // Meskipun kita tidak menggunakan React.FC, tetap perlu mengimpor React
import Link from 'next/link';
import Image from 'next/image'; // Menggunakan Image dari Next.js untuk optimasi gambar
import { Product } from '@/types/product'; // Import tipe Product dari file product.ts
import { useCart } from '@/context/CartContext'; // <-- Impor useCart

// --- Bagian Props ---
// 1. Mendefinisikan Interface untuk Props:
//    Kita membuat interface ProductCardProps untuk mendefinisikan tipe dari props yang akan diterima komponen ini.
//    Di sini, komponen ProductCard diharapkan menerima satu prop bernama 'product',
//    yang tipenya adalah Product (interface yang sudah kita definisikan di app/types/product.ts).
interface ProductCardProps {
  product: Product;
}

// --- Bagian Komponen ---
// 2. Menerima Props di Fungsi Komponen:
//    Parameter fungsi ProductCard sekarang adalah objek ProductCardProps.
//    Kita melakukan object destructuring ({ product }) untuk langsung mengakses properti 'product'.
const ProductCard = ({ product }: ProductCardProps) => {
  // Catatan: Jika kamu sudah menghapus React.FC, kode di atas akan menjadi:
  const { addToCart } = useCart(); // <-- Panggil useCart hook

  // Fungsi handler ketika tombol "Add to Cart" diklik
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah navigasi Link parent saat tombol diklik
    e.stopPropagation(); // Mencegah event "klik" menyebar ke Link parent
    addToCart(product); // Tambahkan produk ke keranjang
    alert(`${product.name} added to cart!`); // Berikan feedback sederhana
  };

  return (
    // --- Penggunaan Props dalam JSX ---
    // 3. Menggunakan Properti dari Props:
    //    Kita mengakses data produk melalui objek 'product' yang diterima dari props.
    //    Contoh: product.id, product.imageUrl, product.name, product.price, dll.
    <Link href={`/products/${product.id}`} className="block"> {/* Menggunakan product.id */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        {/* <img
          src={product.imageUrl} // Menggunakan product.imageUrl
          alt={product.name}    // Menggunakan product.name untuk alt text
          className="w-full h-48 object-cover"
        /> */}
        <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="w-full h-48 object-cover" /> 
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {product.name} {/* Menggunakan product.name */}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p> {/* Menggunakan product.category */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-blue-700">
              ${product.price.toFixed(2)} {/* Menggunakan product.price */}
            </span>
            <span className="text-sm text-gray-500">
              ⭐ {product.rating.rate} ({product.rating.count}) {/* Menggunakan product.rating */}
            </span>
          </div>
          <button
            onClick={handleAddToCart} // <-- Tambahkan event handler ini
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;