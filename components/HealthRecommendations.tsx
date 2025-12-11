import React from 'react';
import { Apple, Dumbbell, Moon, Droplets, Heart, CheckCircle, Info } from 'lucide-react';

const HealthRecommendations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Rekomendasi Kesehatan Jantung</h2>
        </div>

        {/* Bagian Makanan Sehat */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="w-5 h-5 text-rose-400" />
            <h3 className="text-xl font-semibold text-slate-200">Makanan Sehat untuk Jantung</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Ikan Berlemak</p>
                  <p className="text-sm text-slate-400">Salmon, tuna, dan makarel kaya omega-3 yang baik untuk jantung. Konsumsi 2-3 kali seminggu.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Sayuran Hijau</p>
                  <p className="text-sm text-slate-400">Bayam, kangkung, brokoli mengandung vitamin K dan nitrat untuk kesehatan pembuluh darah.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Kacang-kacangan</p>
                  <p className="text-sm text-slate-400">Almond, walnut, kacang tanah membantu menurunkan kolesterol jahat (LDL).</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Buah Berry</p>
                  <p className="text-sm text-slate-400">Strawberry, blueberry, raspberry kaya antioksidan untuk melindungi jantung.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Oatmeal</p>
                  <p className="text-sm text-slate-400">Serat larut dalam oat membantu menurunkan kolesterol dan menjaga gula darah stabil.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-400 mb-1">Alpukat</p>
                  <p className="text-sm text-slate-400">Sumber lemak sehat dan kalium yang membantu mengontrol tekanan darah.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Olahraga */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-slate-200">Olahraga yang Direkomendasikan</h3>
          </div>
          <div className="space-y-4 pl-7">
            <div className="p-4 bg-slate-900/50 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-400 mb-1">Jalan Kaki Cepat</p>
                  <p className="text-sm text-slate-400 mb-2">30-60 menit per hari, 5 hari seminggu. Mudah dilakukan dan efektif untuk kesehatan kardiovaskular.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Low Impact</span>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Pemula Friendly</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-400 mb-1">Berenang</p>
                  <p className="text-sm text-slate-400 mb-2">20-40 menit per sesi, 2-3 kali seminggu. Olahraga seluruh tubuh yang ringan untuk sendi.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Full Body</span>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Joint Friendly</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-400 mb-1">Bersepeda</p>
                  <p className="text-sm text-slate-400 mb-2">30-45 menit per sesi, 3-4 kali seminggu. Baik untuk kesehatan jantung dan kekuatan kaki.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Cardio</span>
                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">Moderate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">4</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-400 mb-1">Yoga & Stretching</p>
                  <p className="text-sm text-slate-400 mb-2">20-30 menit setiap hari. Membantu mengurangi stres dan meningkatkan fleksibilitas.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Stress Relief</span>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Flexibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Gaya Hidup */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-slate-200">Pola Hidup Sehat</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div className="p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Moon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-400 mb-1">Tidur Cukup</p>
                  <p className="text-sm text-slate-400">7-9 jam per malam. Tidur berkualitas penting untuk regenerasi jantung dan pembuluh darah.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-400 mb-1">Hidrasi Cukup</p>
                  <p className="text-sm text-slate-400">Minum 8-10 gelas air per hari untuk menjaga sirkulasi darah optimal.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-400 mb-1">Kelola Stres</p>
                  <p className="text-sm text-slate-400">Meditasi, hobi, atau aktivitas yang menenangkan untuk mengurangi risiko penyakit jantung.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-400 mb-1">Hindari Rokok & Alkohol</p>
                  <p className="text-sm text-slate-400">Berhenti merokok dan batasi konsumsi alkohol untuk kesehatan jantung jangka panjang.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Penting */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-400 mb-1">Konsultasi Medis</p>
              <p className="text-sm text-slate-400">
                Rekomendasi ini bersifat umum. Sebelum memulai program olahraga atau diet baru, terutama jika memiliki kondisi kesehatan tertentu, konsultasikan dengan dokter atau ahli gizi profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendations;