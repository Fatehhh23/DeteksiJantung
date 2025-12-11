import React from 'react';
import { ShoppingCart, Wifi, Battery, Shield, CheckCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Smart Ring',
    description: 'Cincin pintar untuk monitoring detak jantung dan SpO2 dengan sensor MAX30102',
    price: 'Kontak Kami',
    features: [
      'Monitoring BPM & SpO2',
      'Sinkronisasi smartphone',
      'Nyaman dipakai',
      'Data real-time',
    ],
    image: '/images/ring.jpg'
  },
  {
    id: 2,
    name: 'Smart Band',
    description: 'Gelang kesehatan dengan display OLED untuk tracking jantung harian',
    price: 'Kontak Kami',
    features: [
      'Sensor MAX30102',
      'Display OLED',
      'Nyaman dipakai',
      'Data real-time',
      'Sinkronisasi smartphone',
    ],
    image: '/images/band.jpg'
  },
  {
    id: 3,
    name: 'Armband Sensor',
    description: 'Armband pintar untuk monitoring detak jantung dan SpO2 dengan sensor MAX30102',
    price: 'Kontak Kami',
    features: [
      'Monitoring BPM & SpO2',
      'Sinkronisasi smartphone',
      'Nyaman dipakai',
      'Data real-time',
      'Nyaman dipakai',
      
    ],
    image: '/images/armband.jpg'
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-64 bg-slate-900/50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E' + product.name + '%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100 mb-3">{product.name}</h3>
        <p className="text-sm text-slate-400 mb-4">{product.description}</p>

        {/* Features */}
        <div className="mb-5 space-y-2">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-4 border-t border-slate-700">
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-1">Harga</p>
            <p className="text-2xl font-bold text-blue-400">{product.price}</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Produk Monitoring Jantung Custom</h2>
        </div>
        <p className="text-slate-300 mb-4">
          Pilih perangkat monitoring jantung sesuai kebutuhan Anda. Semua produk menggunakan sensor MAX30100/MAX30102 dengan akurasi tinggi.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">WiFi Enabled</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">Long Battery</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Akurat</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-3">Mengapa Pilih Produk Kami?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Bergaransi</p>
              <p className="text-sm text-slate-400"></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Akurat</p>
              <p className="text-sm text-slate-400"></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Battery className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Baterai Awet</p>
              <p className="text-sm text-slate-400"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;