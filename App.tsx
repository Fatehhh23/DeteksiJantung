import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Wifi, WifiOff, Zap, Brain, PlayCircle, PauseCircle, Settings, LayoutDashboard, BookOpen } from 'lucide-react';
import { VitalData, ConnectionStatus, AnalysisResult } from './types';
import MetricCard from './components/MetricCard';
import LiveChart from './components/LiveChart';
import HealthGuide from './components/HealthGuide';
import { analyzeVitals } from './services/geminiService';

const MAX_DATA_POINTS = 50;

function App() {
  const [view, setView] = useState<'dashboard' | 'guide'>('dashboard');
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [data, setData] = useState<VitalData[]>([]);
  const [currentBpm, setCurrentBpm] = useState<number>(0);
  const [currentSpo2, setCurrentSpo2] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  // AI State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Simulation Refs
  const intervalRef = useRef<number | null>(null);

  // --- Simulation Logic ---
  // In a real app, this would be replaced by a WebSocket or MQTT subscription
  const startSimulation = useCallback(() => {
    setStatus(ConnectionStatus.CONNECTING);
    setTimeout(() => {
      setStatus(ConnectionStatus.CONNECTED);
      setIsSimulating(true);
      
      intervalRef.current = window.setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour12: false });
        
        // Simulate fluctuating organic data
        // Heart rate: 60-100 normally, with some noise
        const randomBpmNoise = Math.floor(Math.random() * 5) - 2; 
        const baseBpm = 75;
        const newBpm = Math.max(50, Math.min(180, baseBpm + (Math.sin(now.getTime() / 2000) * 10) + randomBpmNoise));

        // SpO2: 96-100 typically
        const randomSpo2Noise = Math.random() > 0.8 ? -1 : 0; // Occasional drop
        const newSpo2 = Math.max(90, Math.min(100, 98 + randomSpo2Noise));

        const newDataPoint: VitalData = {
          timestamp: timeString,
          bpm: Math.round(newBpm),
          spo2: Math.round(newSpo2)
        };

        setCurrentBpm(newDataPoint.bpm);
        setCurrentSpo2(newDataPoint.spo2);

        setData(prevData => {
          const newData = [...prevData, newDataPoint];
          if (newData.length > MAX_DATA_POINTS) {
            return newData.slice(newData.length - MAX_DATA_POINTS);
          }
          return newData;
        });

      }, 1000); // Update every second
    }, 1500);
  }, []);

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsSimulating(false);
    setStatus(ConnectionStatus.DISCONNECTED);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // --- AI Analysis Handler ---
  const handleAnalyze = async () => {
    if (data.length < 5) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeVitals(data);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              VitalSense
            </h1>
            <p className="text-slate-400 text-sm">Dashboard MAX30100 & ESP32</p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          
          {/* View Toggle */}
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

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
            status === ConnectionStatus.CONNECTED 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : status === ConnectionStatus.CONNECTING 
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            {status === ConnectionStatus.CONNECTED ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="hidden sm:inline">{status}</span>
          </div>

          <button 
            onClick={isSimulating ? stopSimulation : startSimulation}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isSimulating 
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/20' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
            }`}
          >
            {isSimulating ? (
              <><PauseCircle size={18} /> Stop</>
            ) : (
              <><PlayCircle size={18} /> Simulasi</>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {view === 'dashboard' ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Connection Setup Hint (Visible when disconnected) */}
            {!isSimulating && status === ConnectionStatus.DISCONNECTED && (
              <div className="bg-slate-800/50 border border-dashed border-slate-700 rounded-xl p-8 text-center">
                <Settings className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-300">Menunggu Koneksi Alat</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                  Pastikan ESP32 anda menyala dan terhubung ke jaringan yang sama. 
                  Untuk demo ini, silakan klik tombol <b>Simulasi</b> di atas untuk melihat data contoh.
                </p>
              </div>
            )}

            {/* Real-time Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                title="Detak Jantung" 
                value={currentBpm} 
                unit="BPM" 
                type="bpm" 
              />
              <MetricCard 
                title="Saturasi Oksigen" 
                value={currentSpo2} 
                unit="%" 
                type="spo2" 
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveChart 
                data={data} 
                dataKey="bpm" 
                color="#f43f5e" 
                title="Grafik Detak Jantung Real-time" 
              />
              <LiveChart 
                data={data} 
                dataKey="spo2" 
                color="#0ea5e9" 
                title="Grafik Saturasi Oksigen Real-time" 
              />
            </div>

            {/* AI Analysis Section */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-2xl p-1 border border-indigo-500/30">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                      <Brain className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-100">Analisis Kesehatan AI</h2>
                      <p className="text-slate-400 text-sm">Didukung oleh Google Gemini 2.5 Flash</p>
                    </div>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || data.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {isAnalyzing ? (
                      <><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/> Menganalisis...</>
                    ) : (
                      <><Zap size={16} /> Analisa Data Sekarang</>
                    )}
                  </button>
                </div>

                {analysis ? (
                  <div className={`rounded-lg border p-4 ${
                    analysis.status === 'normal' 
                      ? 'bg-emerald-900/20 border-emerald-500/30' 
                      : analysis.status === 'warning' 
                        ? 'bg-yellow-900/20 border-yellow-500/30' 
                        : 'bg-rose-900/20 border-rose-500/30'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                        analysis.status === 'normal' ? 'bg-emerald-500' : analysis.status === 'warning' ? 'bg-yellow-500' : 'bg-rose-500'
                      }`} />
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
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Klik tombol analisa untuk mendapatkan insight kesehatan berdasarkan data sensor.</p>
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

export default App;
