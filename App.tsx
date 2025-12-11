import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity, Wifi, WifiOff, Zap, Brain, PlayCircle, PauseCircle, 
  Settings, LayoutDashboard, BookOpen, Heart, Droplet, Lock, 
  TrendingUp, AlertCircle, Info, CheckCircle, RotateCcw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============= TYPES & CONSTANTS =============
enum ConnectionStatus {
  CONNECTED = 'Terhubung',
  CONNECTING = 'Menghubungkan...',
  DISCONNECTED = 'Terputus'
}

interface VitalData {
  timestamp: string;
  bpm: number;
  spo2: number;
}

interface AnalysisResult {
  status: 'normal' | 'warning' | 'critical';
  message: string;
  recommendation: string;
}

const MAX_DATA_POINTS = 50;
const ESP_BASE_URL = 'http://10.224.86.192';
const STABILITY_WINDOW = 5; // Dikurangi dari 10 menjadi 5 untuk lebih cepat
const STABILITY_THRESHOLD = 8; // Ditingkatkan dari 5 menjadi 8 untuk lebih toleran
const NO_FINGER_THRESHOLD = 10; // Batas untuk deteksi jari tidak ada

// ============= COMPONENTS =============
const MetricCard: React.FC<{
  title: string;
  value: number;
  unit: string;
  type: 'bpm' | 'spo2';
  isLocked?: boolean;
  onUnlock?: () => void;
}> = ({ title, value, unit, type, isLocked = false, onUnlock }) => {
  const getStatusColor = () => {
    if (type === 'bpm') {
      if (value >= 60 && value <= 100) return 'text-emerald-400';
      if (value > 100 && value <= 120) return 'text-yellow-400';
      return 'text-rose-400';
    }
    if (value >= 95) return 'text-emerald-400';
    if (value >= 90) return 'text-yellow-400';
    return 'text-rose-400';
  };

  const Icon = type === 'bpm' ? Heart : Droplet;
  const bgGlow = type === 'bpm' ? 'from-rose-500/10 to-pink-500/10 border-rose-500/20' : 'from-sky-500/10 to-blue-500/10 border-sky-500/20';
  const iconBg = type === 'bpm' ? 'bg-rose-500/20' : 'bg-sky-500/20';
  const iconColor = type === 'bpm' ? 'text-rose-400' : 'text-sky-400';

  return (
    <div className={`bg-gradient-to-br ${bgGlow} rounded-2xl p-1 border transition-all duration-300`}>
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${iconBg}`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <h3 className="text-slate-300 font-medium">{title}</h3>
          </div>
          {isLocked ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">Terkunci</span>
              </div>
              <button
                onClick={onUnlock}
                className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                title="Unlock untuk deteksi ulang"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-400">Stabilisasi...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold ${getStatusColor()} transition-colors duration-300`}>
            {value}
          </span>
          <span className="text-2xl text-slate-500 font-medium">{unit}</span>
        </div>

        {isLocked && (
          <p className="mt-3 text-xs text-slate-500">
            Nilai rata-rata stabil dari {STABILITY_WINDOW} pembacaan (~{STABILITY_WINDOW} detik)
          </p>
        )}
      </div>
    </div>
  );
};

const LiveChart: React.FC<{
  data: VitalData[];
  dataKey: 'bpm' | 'spo2';
  color: string;
  title: string;
}> = ({ data, dataKey, color, title }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-slate-200 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} animationDuration={300} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const HealthGuide: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Panduan Kesehatan</h2>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-400" />
          <h3 className="text-xl font-semibold text-slate-200">Detak Jantung (BPM)</h3>
        </div>
        <div className="space-y-3 pl-7">
          <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-emerald-400">Normal: 60-100 BPM</p>
              <p className="text-sm text-slate-400 mt-1">Detak jantung sehat untuk orang dewasa saat istirahat.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-400">Perhatian: 100-120 BPM atau 50-60 BPM</p>
              <p className="text-sm text-slate-400 mt-1">Pantau terus dan konsultasi jika berlanjut.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-rose-400">Bahaya: &gt;120 BPM atau &lt;50 BPM</p>
              <p className="text-sm text-slate-400 mt-1">Segera konsultasi dengan tenaga medis.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Droplet className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl font-semibold text-slate-200">Saturasi Oksigen (SpO2)</h3>
        </div>
        <div className="space-y-3 pl-7">
          <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-emerald-400">Normal: ≥95%</p>
              <p className="text-sm text-slate-400 mt-1">Saturasi oksigen optimal dalam darah.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-400">Perhatian: 90-94%</p>
              <p className="text-sm text-slate-400 mt-1">Hipoksemia ringan. Perlu pemantauan.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-rose-400">Bahaya: &lt;90%</p>
              <p className="text-sm text-slate-400 mt-1">Segera cari bantuan medis.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-400 mb-1">Catatan Penting</p>
            <p className="text-sm text-slate-400">
              Panduan ini bersifat umum. Selalu konsultasikan hasil dengan tenaga kesehatan profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const analyzeVitals = async (data: VitalData[]): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Ambil data terakhir (yang merupakan nilai locked)
  const lastData = data[data.length - 1];
  const avgBpm = lastData.bpm;
  const avgSpo2 = lastData.spo2;

  const bpmCritical = avgBpm > 120 || avgBpm < 50;
  const bpmWarning = (avgBpm > 100 && avgBpm <= 120) || (avgBpm >= 50 && avgBpm < 60);
  const spo2Critical = avgSpo2 < 90;
  const spo2Warning = avgSpo2 >= 90 && avgSpo2 < 95;

  if (bpmCritical || spo2Critical) {
    return {
      status: 'critical',
      message: `Kondisi memerlukan perhatian medis segera. BPM: ${avgBpm}, SpO2: ${avgSpo2}%.`,
      recommendation: 'Segera konsultasikan dengan tenaga medis profesional.'
    };
  }
  if (bpmWarning || spo2Warning) {
    return {
      status: 'warning',
      message: `Beberapa indikator perlu diperhatikan. BPM: ${avgBpm}, SpO2: ${avgSpo2}%.`,
      recommendation: 'Pantau kondisi berkala. Konsultasi dokter jika memburuk.'
    };
  }
  return {
    status: 'normal',
    message: `Kondisi vital dalam rentang normal. BPM: ${avgBpm}, SpO2: ${avgSpo2}%.`,
    recommendation: 'Pertahankan gaya hidup sehat dengan olahraga teratur dan istirahat cukup.'
  };
};

// ============= MAIN APP =============
export default function App() {
  const [view, setView] = useState<'dashboard' | 'guide'>('dashboard');
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [data, setData] = useState<VitalData[]>([]);
  const [currentBpm, setCurrentBpm] = useState(0);
  const [currentSpo2, setCurrentSpo2] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lockedBpm, setLockedBpm] = useState<number | null>(null);
  const [lockedSpo2, setLockedSpo2] = useState<number | null>(null);
  const [isBpmLocked, setIsBpmLocked] = useState(false);
  const [isSpo2Locked, setIsSpo2Locked] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Fungsi untuk unlock manual
  const unlockBpm = () => {
    setIsBpmLocked(false);
    setLockedBpm(null);
  };

  const unlockSpo2 = () => {
    setIsSpo2Locked(false);
    setLockedSpo2(null);
  };

  // Check stability - dipisahkan dari useCallback
  const checkStability = useCallback((data: VitalData[]) => {
    if (data.length < STABILITY_WINDOW) return;
    
    const recentData = data.slice(-STABILITY_WINDOW);
    
    // Deteksi jari tidak ada - jika BPM atau SpO2 terlalu rendah
    const lastBpm = recentData[recentData.length - 1].bpm;
    const lastSpo2 = recentData[recentData.length - 1].spo2;
    
    if (lastBpm < NO_FINGER_THRESHOLD || lastSpo2 < NO_FINGER_THRESHOLD) {
      // Auto-unlock jika jari tidak terdeteksi
      if (isBpmLocked || isSpo2Locked) {
        setIsBpmLocked(false);
        setIsSpo2Locked(false);
        setLockedBpm(null);
        setLockedSpo2(null);
      }
      return;
    }
    
    // Check BPM stability - hanya jika belum locked DAN nilai valid
    if (!isBpmLocked) {
      const bpmValues = recentData.map(d => d.bpm).filter(v => v >= NO_FINGER_THRESHOLD);
      
      if (bpmValues.length >= STABILITY_WINDOW) {
        const avgBpm = Math.round(bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length);
        const maxBpm = Math.max(...bpmValues);
        const minBpm = Math.min(...bpmValues);
        const variance = maxBpm - minBpm;
        
        // Lock jika variasi dalam threshold DAN nilai masuk akal (30-200 BPM)
        if (variance <= STABILITY_THRESHOLD && avgBpm >= 30 && avgBpm <= 200) {
          setLockedBpm(avgBpm);
          setIsBpmLocked(true);
          console.log(`BPM Locked: ${avgBpm} (variance: ${variance})`);
        }
      }
    }
    
    // Check SpO2 stability - hanya jika belum locked DAN nilai valid
    if (!isSpo2Locked) {
      const spo2Values = recentData.map(d => d.spo2).filter(v => v >= NO_FINGER_THRESHOLD);
      
      if (spo2Values.length >= STABILITY_WINDOW) {
        const avgSpo2 = Math.round(spo2Values.reduce((a, b) => a + b, 0) / spo2Values.length);
        const maxSpo2 = Math.max(...spo2Values);
        const minSpo2 = Math.min(...spo2Values);
        const variance = maxSpo2 - minSpo2;
        
        // Lock jika variasi dalam threshold DAN nilai masuk akal (70-100%)
        if (variance <= STABILITY_THRESHOLD && avgSpo2 >= 70 && avgSpo2 <= 100) {
          setLockedSpo2(avgSpo2);
          setIsSpo2Locked(true);
          console.log(`SpO2 Locked: ${avgSpo2}% (variance: ${variance})`);
        }
      }
    }
  }, [isBpmLocked, isSpo2Locked]);

  const startRealtime = useCallback(() => {
    setStatus(ConnectionStatus.CONNECTING);
    setLockedBpm(null);
    setLockedSpo2(null);
    setIsBpmLocked(false);
    setIsSpo2Locked(false);

    setTimeout(() => {
      setStatus(ConnectionStatus.CONNECTED);
      setIsRunning(true);

      intervalRef.current = window.setInterval(async () => {
        try {
          const res = await fetch(`${ESP_BASE_URL}/data`);
          if (!res.ok) throw new Error('HTTP error');
          const json = await res.json() as { heartRate: number; spo2: number };
          const now = new Date();
          const timeString = now.toLocaleTimeString('id-ID', { hour12: false });

          const newDataPoint: VitalData = {
            timestamp: timeString,
            bpm: Math.round(json.heartRate),
            spo2: Math.round(json.spo2),
          };

          setCurrentBpm(newDataPoint.bpm);
          setCurrentSpo2(newDataPoint.spo2);

          setData(prev => {
            const next = [...prev, newDataPoint];
            const trimmed = next.length > MAX_DATA_POINTS 
              ? next.slice(next.length - MAX_DATA_POINTS)
              : next;
            return trimmed;
          });
        } catch (err) {
          console.error('Gagal ambil data:', err);
          setStatus(ConnectionStatus.DISCONNECTED);
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1000);
    }, 800);
  }, []);

  const stopRealtime = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setStatus(ConnectionStatus.DISCONNECTED);
    setLockedBpm(null);
    setLockedSpo2(null);
    setIsBpmLocked(false);
    setIsSpo2Locked(false);
  }, []);

  // Effect untuk check stability setiap kali data berubah
  useEffect(() => {
    if (data.length >= STABILITY_WINDOW && isRunning) {
      checkStability(data);
    }
  }, [data, checkStability, isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleAnalyze = async () => {
    // Gunakan nilai locked jika ada, jika tidak ada maka tidak bisa analisis
    if (!isBpmLocked || !isSpo2Locked) {
      alert('Tunggu hingga kedua nilai (BPM dan SpO2) terkunci terlebih dahulu sebelum melakukan analisis.');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      // Buat data dummy dengan nilai locked untuk analisis
      const lockedData: VitalData[] = [{
        timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
        bpm: lockedBpm!,
        spo2: lockedSpo2!
      }];
      
      const result = await analyzeVitals(lockedData);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              VitalSense
            </h1>
            <p className="text-slate-400 text-sm">Dashboard MAX30100 & ESP8266</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex mr-2">
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'dashboard' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button
              onClick={() => setView('guide')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'guide' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen size={16} /> Panduan
            </button>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              status === ConnectionStatus.CONNECTED
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : status === ConnectionStatus.CONNECTING
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            {status === ConnectionStatus.CONNECTED ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="hidden sm:inline">{status}</span>
          </div>

          <button
            onClick={isRunning ? stopRealtime : startRealtime}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isRunning
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
            }`}
          >
            {isRunning ? (
              <>
                <PauseCircle size={18} /> Stop
              </>
            ) : (
              <>
                <PlayCircle size={18} /> Mulai dari ESP8266
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {view === 'dashboard' ? (
          <div className="space-y-6">
            {!isRunning && status === ConnectionStatus.DISCONNECTED && (
              <div className="bg-slate-800/50 border border-dashed border-slate-700 rounded-xl p-8 text-center">
                <Settings className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-300">Menunggu Koneksi Alat</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                  Pastikan ESP8266 menyala, terhubung ke jaringan yang sama, dan endpoint{' '}
                  <code className="mx-1 bg-slate-800 px-1 rounded">/data</code> sudah aktif.
                  Klik <b>Mulai dari ESP8266</b> untuk mulai mengambil data.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                title="Detak Jantung" 
                value={isBpmLocked ? lockedBpm! : currentBpm} 
                unit="BPM" 
                type="bpm"
                isLocked={isBpmLocked}
                onUnlock={unlockBpm}
              />
              <MetricCard 
                title="Saturasi Oksigen" 
                value={isSpo2Locked ? lockedSpo2! : currentSpo2} 
                unit="%" 
                type="spo2"
                isLocked={isSpo2Locked}
                onUnlock={unlockSpo2}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveChart data={data} dataKey="bpm" color="#f43f5e" title="Grafik Detak Jantung Real-time" />
              <LiveChart data={data} dataKey="spo2" color="#0ea5e9" title="Grafik Saturasi Oksigen Real-time" />
            </div>

            <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-2xl p-1 border border-indigo-500/30">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                      <Brain className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-100">Analisis Kesehatan AI</h2>
                      <p className="text-slate-400 text-sm">Analisis Otomatis Data Vital</p>
                    </div>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !isBpmLocked || !isSpo2Locked}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Analisa Data Terkunci
                      </>
                    )}
                  </button>
                </div>

                {analysis ? (
                  <div
                    className={`rounded-lg border p-4 ${
                      analysis.status === 'normal'
                        ? 'bg-emerald-900/20 border-emerald-500/30'
                        : analysis.status === 'warning'
                        ? 'bg-yellow-900/20 border-yellow-500/30'
                        : 'bg-rose-900/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                          analysis.status === 'normal' ? 'bg-emerald-500' : analysis.status === 'warning' ? 'bg-yellow-500' : 'bg-rose-500'
                        }`}
                      />
                      <div className="space-y-2">
                        <h3 className={`font-semibold capitalize ${
                          analysis.status === 'normal' ? 'text-emerald-400' : analysis.status === 'warning' ? 'text-yellow-400' : 'text-rose-400'
                        }`}>
                          Kondisi: {analysis.status}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{analysis.message}</p>
                        <div className="bg-slate-950/30 p-3 rounded-md mt-2">
                          <p className="text-slate-400 text-xs font-semibold uppercase mb-1">Rekomendasi:</p>
                          <p className="text-slate-300 text-sm">{analysis.recommendation}</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-800">
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Hasil analisis berdasarkan nilai terkunci: BPM {lockedBpm}, SpO2 {lockedSpo2}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>
                      {(!isBpmLocked || !isSpo2Locked) ? (
                        <>Tunggu hingga kedua nilai <b>terkunci</b> terlebih dahulu untuk melakukan analisis.</>
                      ) : (
                        <>Klik tombol analisa untuk mendapatkan insight kesehatan berdasarkan nilai terkunci.</>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <HealthGuide />
        )}
      </main>
    </div>
  );
}