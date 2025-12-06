import React from 'react';
import { Shield, AlertCircle, HeartPulse, Droplets, CheckCircle, XCircle, Info } from 'lucide-react';

const HealthGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Disclaimer Section */}
      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
        <Info className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
        <div>
          <h3 className="text-blue-400 font-semibold text-lg">Informasi Penting</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Sensor MAX30100 hanya mengukur <strong>Detak Jantung (BPM)</strong> dan <strong>Kadar Oksigen (SpO2)</strong>. 
            Halaman ini adalah panduan edukasi umum mengenai Tekanan Darah. 
            Detak jantung yang tinggi tidak selalu berarti tekanan darah tinggi, namun keduanya sering berkaitan dengan kesehatan kardiovaskular.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Darah Tinggi (Hipertensi) Section */}
        <div className="bg-slate-800 border border-rose-500/30 rounded-2xl overflow-hidden shadow-lg shadow-rose-900/10">
          <div className="bg-rose-600/10 p-6 border-b border-rose-500/20 flex items-center gap-4">
            <div className="p-3 bg-rose-500 rounded-lg text-white">
              <HeartPulse size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Darah Tinggi</h2>
              <p className="text-rose-400 font-medium">Hipertensi</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-rose-400" />
                Pertolongan Pertama
              </h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  Hentikan aktivitas fisik segera dan istirahat.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  Duduk atau berbaring dengan posisi kepala agak tinggi.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  Lakukan teknik pernapasan dalam (tarik napas perlahan) untuk relaksasi.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  Jika sudah diresepkan obat penurun tensi, segera konsumsi sesuai dosis.
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Shield size={20} className="text-emerald-400" />
                Pencegahan & Gaya Hidup
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Kurangi asupan garam (sodium) dalam makanan.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Olahraga teratur (min. 30 menit sehari).</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Kelola stres dengan meditasi atau istirahat cukup.</p>
                </div>
                <div className="flex gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Hindari merokok dan konsumsi alkohol berlebih.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Darah Rendah (Hipotensi) Section */}
        <div className="bg-slate-800 border border-sky-500/30 rounded-2xl overflow-hidden shadow-lg shadow-sky-900/10">
          <div className="bg-sky-600/10 p-6 border-b border-sky-500/20 flex items-center gap-4">
            <div className="p-3 bg-sky-500 rounded-lg text-white">
              <Droplets size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Darah Rendah</h2>
              <p className="text-sky-400 font-medium">Hipotensi</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-sky-400" />
                Pertolongan Pertama
              </h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  Segera duduk atau berbaring untuk mencegah pingsan.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  Minum air putih yang banyak untuk meningkatkan volume darah.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  Konsumsi makanan yang mengandung garam atau elektrolit.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  Hindari berdiri secara tiba-tiba dari posisi duduk/tidur.
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Shield size={20} className="text-emerald-400" />
                Pencegahan & Gaya Hidup
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Cukupi kebutuhan cairan harian (minum 2-3 liter).</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Makan dalam porsi kecil tapi sering.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Gunakan stoking kompresi jika sering berdiri lama.</p>
                </div>
                <div className="flex gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">Hindari mandi dengan air yang terlalu panas terlalu lama.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm">
          *Informasi ini hanya untuk tujuan edukasi dan tidak menggantikan saran medis profesional. 
          Jika Anda mengalami gejala yang parah, segera hubungi dokter.
        </p>
      </div>
    </div>
  );
};

export default HealthGuide;
