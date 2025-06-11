
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface WaterLevelCardProps {
  waterLevel: number;
}

export const WaterLevelCard = ({ waterLevel }: WaterLevelCardProps) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(waterLevel);
    }, 300);
    return () => clearTimeout(timer);
  }, [waterLevel]);

  const getStatusColor = (level: number) => {
    if (level >= 70) return 'text-primary';
    if (level >= 30) return 'text-slate-400';
    return 'text-slate-500';
  };

  const getStatusText = (level: number) => {
    if (level >= 70) return 'Optimal Level';
    if (level >= 30) return 'Moderate Level';
    return 'Low Level';
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Water Level Indicator */}
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-48">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-700"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#waterGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - animatedLevel / 100)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="stop-color-sky-400" />
                    <stop offset="50%" className="stop-color-primary" />
                    <stop offset="100%" className="stop-color-blue-600" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-primary mb-1">
                  {animatedLevel.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Water Level</div>
                
                {/* Water droplet animation */}
                <div className="mt-2 w-6 h-6 water-gradient rounded-full animate-pulse-soft opacity-80" />
              </div>
            </div>
          </div>

          {/* Status and Details */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Current Water Level</h2>
              <p className={`text-lg font-medium ${getStatusColor(waterLevel)}`}>
                {getStatusText(waterLevel)}
              </p>
            </div>

            {/* Tank Capacity Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tank Capacity</p>
                <p className="text-xl font-semibold">5,000L</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Volume</p>
                <p className="text-xl font-semibold text-primary">
                  {Math.round((waterLevel / 100) * 5000).toLocaleString()}L
                </p>
              </div>
            </div>

            {/* Linear progress bar for mobile/alternative view */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Empty</span>
                <span>Full</span>
              </div>
              <Progress 
                value={animatedLevel} 
                className="h-3 bg-slate-700"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
