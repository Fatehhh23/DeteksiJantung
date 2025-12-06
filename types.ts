export interface VitalData {
    timestamp: string;
    bpm: number;
    spo2: number;
}

export enum ConnectionStatus {
    DISCONNECTED = 'Terputus',
    CONNECTING = 'Menghubungkan',
    CONNECTED = 'Terhubung'
}

export interface AnalysisResult {
    status: 'normal' | 'warning' | 'critical';
    message: string;
    recommendation: string;
}