import React from 'react';
import { ShoppingCart, Star, Zap, Wifi, Battery, Shield, TrendingUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  features: string[];
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'VitalRing Pro',
    description: 'Cincin pintar untuk monitoring detak jantung dan SpO2 24/7 dengan desain premium',
    price: 'Rp 2.499.000',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    features: [
      'Monitoring BPM & SpO2 real-time',
      'Baterai tahan hingga 7 hari',
      'Waterproof IP68',
      'Sinkronisasi otomatis ke smartphone',
      'Material titanium premium'
    ],
    image: '💍'
  },
  {
    id: 2,
    name: 'HeartBand Elite',
    description: 'Gelang kesehatan dengan sensor MAX30102 untuk tracking jantung akurat sepanjang hari',
    price: 'Rp 1.799.000',
    rating: 4.7,
    reviews: 89,
    badge: 'Popular',
    features: [
      'Sensor MAX30102 presisi tinggi',
      'Display OLED warna',
      'Notifikasi smartphone',
      'Tracking tidur & aktivitas',
      'Baterai 5 hari pemakaian'
    ],
    image: '⌚'
  },
  {
    id: 3,
    name: 'PulseWatch X1',
    description: 'Smartwatch medis dengan sertifikasi untuk monitoring kesehatan profesional',
    price: 'Rp 3.299.000',
    rating: 4.9,
    reviews: 156,
    badge: 'Premium',
    features: [
      'Sertifikasi medis FDA',
      'ECG & PPG monitoring',
      'GPS built-in',
      'Deteksi aritmia otomatis',
      'Layar AMOLED 1.4"'
    ],
    image: '⌚'
  },
  {
    id: 4,
    name: 'HealthClip Mini',
    description: 'Klip jari portable untuk pengukuran cepat BPM dan SpO2, cocok untuk traveling',
    price: 'Rp 899.000',
    rating: 4.5,
    reviews: 67,
    features: [
      'Ukuran compact & portable',
      'Hasil instant dalam 10 detik',
      'LED display cerah',
      'Baterai AAA (200+ pengukuran)',
      'Auto shut-off'
    ],
    image: '🔬'
  },
  {
    id: 5,
    name: 'VitalPatch Sensor',
    description: 'Sensor patch adhesif untuk monitoring continuous selama 24-48 jam',
    price: 'Rp 1.299.000',
    rating: 4.6,
    reviews: 43,
    features: [
      'Monitoring continuous 48 jam',
      'Ultra tipis & nyaman',
      'Wireless data transfer',
      'Medical grade adhesive',
      'Compatible dengan smartphone'
    ],
    image: '📱'
  },
  {
    id: 6,
    name: 'HeartGuard Kit',
    description: 'Paket lengkap monitoring jantung untuk keluarga, termasuk sensor dan hub',
    price: 'Rp 4.999.000',
    rating: 4.8,
    reviews: 91,
    badge: 'Family Pack',
    features: [
      'Hub WiFi untuk 5 pengguna',
      '3x sensor wearable included',
      'Cloud storage unlimited',
      'Konsultasi dokter online 3 bulan',
      'Dashboard keluarga'
    ],
    image: '📦'
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 flex flex-col h-full">
      {/* Badge */}
      {product.badge && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
            <Zap className="w-3 h-3" />
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="text-6xl mb-4 text-center">
        {product.image}
      </div>

      {/* Product Info */}
      <h3 className="text-xl font-bold text-slate-100 mb-2">{product.name}</h3>
      <p className="text-sm text-slate-400 mb-4 flex-grow">{product.description}</p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-600'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400">({product.reviews} reviews)</span>
      </div>

      {/* Features */}
      <div className="mb-4 space-y-2">
        {product.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Price & CTA */}
      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Harga</p>
            <p className="text-2xl font-bold text-blue-400">{product.price}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          <ShoppingCart className="w-4 h-4" />
          Beli Sekarang
        </button>
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
          Pilih perangkat monitoring jantung terbaik sesuai kebutuhan Anda. Semua produk menggunakan sensor MAX30100/MAX30102 dengan akurasi tinggi.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">WiFi Enabled</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">Long Battery Life</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Medical Grade</span>
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
        <h3 className="text-lg font-semibold text-slate-200 mb-3">Mengapa Memilih Produk Kami?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Garansi 2 Tahun</p>
              <p className="text-sm text-slate-400">Semua produk dilindungi garansi resmi dan layanan purna jual terbaik</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Kualitas Medis</p>
              <p className="text-sm text-slate-400">Sensor presisi tinggi dengan standar perangkat medis profesional</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 mb-1">Gratis Konsultasi</p>
              <p className="text-sm text-slate-400">Akses konsultasi dengan tim medis kami selama 3 bulan pertama</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;