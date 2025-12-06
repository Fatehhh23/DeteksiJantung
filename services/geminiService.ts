import { GoogleGenAI, Type } from "@google/genai";
import { VitalData, AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeVitals = async (dataHistory: VitalData[]): Promise<AnalysisResult> => {
  if (!apiKey) {
    return {
      status: 'warning',
      message: 'API Key tidak ditemukan.',
      recommendation: 'Silakan konfigurasi API Key Google Gemini untuk mendapatkan analisis AI.'
    };
  }

  // Calculate averages for better context
  const recentData = dataHistory.slice(-20); // Take last 20 readings
  const avgBpm = Math.round(recentData.reduce((acc, curr) => acc + curr.bpm, 0) / recentData.length);
  const avgSpo2 = Math.round(recentData.reduce((acc, curr) => acc + curr.spo2, 0) / recentData.length);

  const prompt = `
    Bertindaklah sebagai asisten medis pintar. Saya sedang memonitor data vital dari sensor MAX30100.
    
    Data Saat Ini (Rata-rata 20 bacaan terakhir):
    - Detak Jantung (BPM): ${avgBpm}
    - Saturasi Oksigen (SpO2): ${avgSpo2}%

    Tolong berikan analisis singkat dalam format JSON mengenai kondisi ini.
    Tentukan status (normal/warning/critical), pesan ringkas tentang kondisi, dan rekomendasi singkat.
    Jika SpO2 di bawah 95% atau BPM di atas 100/di bawah 60 (istirahat), beri peringatan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['normal', 'warning', 'critical'] },
            message: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ['status', 'message', 'recommendation']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      status: 'warning',
      message: 'Gagal menganalisis data.',
      recommendation: 'Periksa koneksi internet atau kuota API Key Anda.'
    };
  }
};