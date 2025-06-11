
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PredictionCardProps {
  waterLevel: number;
}

export const PredictionCard = ({ waterLevel }: PredictionCardProps) => {
  // Generate prediction data based on current level and usage patterns
  const generatePredictionData = () => {
    const data = [];
    let currentLevel = waterLevel;
    
    for (let i = 0; i <= 7; i++) {
      data.push({
        day: i === 0 ? 'Today' : `Day ${i}`,
        predicted: Math.max(0, currentLevel - (i * 8.5) + (Math.random() * 4 - 2)),
        optimal: Math.max(20, 80 - (i * 2)),
      });
    }
    return data;
  };

  const predictionData = generatePredictionData();
  const daysUntilEmpty = Math.ceil(waterLevel / 8.5);
  const refillRecommended = daysUntilEmpty <= 3;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="font-medium">{label}</p>
          <p className="text-water-600">
            Predicted: {payload[0].value.toFixed(1)}%
          </p>
          {payload[1] && (
            <p className="text-success-600">
              Optimal: {payload[1].value.toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          🔮 Usage Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl neumorphic">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="font-medium">Days Until Empty</p>
                <p className={`text-2xl font-bold ${refillRecommended ? 'text-warning-600' : 'text-success-600'}`}>
                  {daysUntilEmpty}
                </p>
                <p className="text-xs text-muted-foreground">At current usage rate</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl neumorphic">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-medium">Usage Trend</p>
                <p className="text-2xl font-bold text-water-600">+5%</p>
                <p className="text-xs text-muted-foreground">Increase this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Chart */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">7-Day Water Level Forecast</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="optimal"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                  strokeDasharray="5 5"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stackId="2"
                  stroke="#0ea5e9"
                  fill="url(#waterGradient)"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            🤖 AI Recommendations
          </h4>
          
          {refillRecommended && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-warning-50 to-orange-50 dark:from-warning-900/20 dark:to-orange-900/20 border border-warning-200/50 dark:border-warning-800/50">
              <p className="text-sm font-medium text-warning-700 dark:text-warning-300">
                ⚠️ Refill Recommended
              </p>
              <p className="text-xs text-warning-600 dark:text-warning-400 mt-1">
                Schedule a refill within the next 2 days to avoid running low.
              </p>
            </div>
          )}

          <div className="p-3 rounded-lg bg-gradient-to-r from-water-50 to-blue-50 dark:from-water-900/20 dark:to-blue-900/20 border border-water-200/50 dark:border-water-800/50">
            <p className="text-sm font-medium text-water-700 dark:text-water-300">
              💡 Optimize Usage
            </p>
            <p className="text-xs text-water-600 dark:text-water-400 mt-1">
              Peak usage detected between 7-9 AM. Consider redistributing activities.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-r from-success-50 to-green-50 dark:from-success-900/20 dark:to-green-900/20 border border-success-200/50 dark:border-success-800/50">
            <p className="text-sm font-medium text-success-700 dark:text-success-300">
              ✨ Smart Insight
            </p>
            <p className="text-xs text-success-600 dark:text-success-400 mt-1">
              Your usage pattern suggests optimal refill timing is every 8-9 days.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

