
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { WaterLevelCard } from '@/components/WaterLevelCard';
import { UsageStatsCard } from '@/components/UsageStatsCard';
import { DeviceStatusCard } from '@/components/DeviceStatusCard';
import { QuickActionsCard } from '@/components/QuickActionsCard';
import { AlertsCard } from '@/components/AlertsCard';
import { EcoInsightsCard } from '@/components/EcoInsightsCard';
import { PredictionCard } from '@/components/PredictionCard';

const Index = () => {
  const [waterLevel, setWaterLevel] = useState(68);
  const [pumpStatus, setPumpStatus] = useState(false);
  const [sensorStatus, setSensorStatus] = useState(true);

  // Simulate real-time water level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => {
        const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
        const newLevel = Math.max(0, Math.min(100, prev + change));
        return Math.round(newLevel * 10) / 10; // Round to 1 decimal place
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Water Level - Takes full width on mobile, 2 columns on large screens */}
          <div className="lg:col-span-2">
            <WaterLevelCard waterLevel={waterLevel} />
          </div>
          
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActionsCard 
              pumpStatus={pumpStatus} 
              setPumpStatus={setPumpStatus}
              sensorStatus={sensorStatus}
            />
          </div>
          
          {/* Usage Stats - Full width */}
          <div className="lg:col-span-3">
            <UsageStatsCard />
          </div>
          
          {/* Prediction and Device Status */}
          <div className="lg:col-span-2">
            <PredictionCard waterLevel={waterLevel} />
          </div>
          
          <div className="lg:col-span-1">
            <DeviceStatusCard 
              pumpStatus={pumpStatus}
              sensorStatus={sensorStatus}
            />
          </div>
          
          {/* Alerts and Eco Insights */}
          <div className="lg:col-span-2">
            <AlertsCard waterLevel={waterLevel} />
          </div>
          
          <div className="lg:col-span-1">
            <EcoInsightsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

