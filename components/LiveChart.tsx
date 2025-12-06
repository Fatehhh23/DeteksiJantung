import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VitalData } from '../types';

interface LiveChartProps {
  data: VitalData[];
  dataKey: 'bpm' | 'spo2';
  color: string;
  title: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ data, dataKey, color, title }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-lg h-[300px] flex flex-col">
      <h3 className="text-slate-300 font-medium mb-4 ml-2">{title} History</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              hide={true} 
            />
            <YAxis 
              domain={dataKey === 'spo2' ? [80, 100] : ['auto', 'auto']} 
              stroke="#64748b" 
              fontSize={12}
              tickFormatter={(val) => Math.round(val).toString()}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
              itemStyle={{ color: color }}
              formatter={(value: number) => [value, dataKey.toUpperCase()]}
              labelFormatter={() => ''}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#color${dataKey})`} 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveChart;