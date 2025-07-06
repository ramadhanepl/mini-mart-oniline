// app/types/product.ts

// Mendefinisikan interface untuk struktur data produk
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Kamu bisa tambahkan tipe lain di sini jika perlu, misal untuk variasi produk
// export interface ProductVariant { ... }