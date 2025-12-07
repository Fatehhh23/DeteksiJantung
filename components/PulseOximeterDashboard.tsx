import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SensorData {
  heartRate: number;
  spo2: number;
}

const PulseOximeterDashboard = () => {
  const [data, setData] = useState<SensorData>({ heartRate: 0, spo2: 0 });
  const [history, setHistory] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    // Ganti dengan IP ESP8266 kamu
    const ESP_IP = 'http://10.224.86.192/'; 

    const fetchData = async () => {
      try {
        const res = await fetch(`${ESP_IP}/data`);
        const json: SensorData = await res.json();
        setData(json);

        // Simpan history untuk grafik
        const now = new Date().toLocaleTimeString();
        setHistory(prev => [...prev.slice(-19), json.heartRate]);
        setLabels(prev => [...prev.slice(-19), now]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Heart Rate (BPM)',
        data: history,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Real-time Heart Rate'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
        max: 120
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Pulse Oximeter Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ 
          background: '#f0f0f0', 
          padding: '20px', 
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>
            {data.heartRate.toFixed(0)}
          </h2>
          <p>BPM (Heart Rate)</p>
        </div>
        
        <div style={{ 
          background: '#f0f0f0', 
          padding: '20px', 
          borderRadius: '8px',
          flex: 1,
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>
            {data.spo2.toFixed(0)}
          </h2>
          <p>% (SpO₂)</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PulseOximeterDashboard;
