import React from 'react';
import { Heart, Activity } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  type: 'bpm' | 'spo2';
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, type }) => {
  const isNormal = type === 'bpm' ? (value >= 60 && value <= 100) : (value >= 95);
  
  const getColors = () => {
    if (type === 'bpm') return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
  };

  const getIcon = () => {
    if (type === 'bpm') return <Heart className={`w-6 h-6 ${type === 'bpm' ? 'animate-pulse' : ''}`} />;
    return <Activity className="w-6 h-6" />;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg relative overflow-hidden">
      <div className={`absolute top-0 right-0 p-4 opacity-20 ${type === 'bpm' ? 'text-rose-500' : 'text-sky-500'}`}>
        {type === 'bpm' ? <Heart size={80} /> : <Activity size={80} />}
      </div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg ${getColors()}`}>
          {getIcon()}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-end gap-2">
          <span className={`text-5xl font-bold ${isNormal ? 'text-white' : 'text-yellow-400'}`}>
            {value}
          </span>
          <span className="text-slate-400 font-medium mb-2 text-lg">{unit}</span>
        </div>
        <p className="text-slate-500 text-sm mt-2">
          Status: <span className={isNormal ? 'text-green-400' : 'text-yellow-400'}>
            {isNormal ? 'Normal' : 'Perlu Perhatian'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MetricCard;