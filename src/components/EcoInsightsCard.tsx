
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const EcoInsightsCard = () => {
  const insights = [
    {
      icon: '🌱',
      title: 'Water Saved This Week',
      value: '12%',
      description: 'Compared to last week',
      progress: 68,
      trend: 'up'
    },
    {
      icon: '💡',
      title: 'Efficiency Score',
      value: '8.5/10',
      description: 'Based on usage patterns',
      progress: 85,
      trend: 'up'
    },
    {
      icon: '📊',
      title: 'Carbon Footprint',
      value: '-15%',
      description: 'Reduction this month',
      progress: 75,
      trend: 'up'
    }
  ];

  const tips = [
    "Peak usage is between 7-9 AM. Consider shifting some activities to off-peak hours.",
    "Your water efficiency improved by 8% after the recent pump maintenance.",
    "Installing smart valves could save an additional 10-15% water.",
    "Consider rainwater harvesting - potential savings of 25% annually."
  ];

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          🌿 Eco Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics */}
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div 
              key={insight.title}
              className="p-4 rounded-xl neumorphic animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{insight.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-success-600">{insight.value}</p>
                  <span className="text-xs text-success-500">
                    {insight.trend === 'up' ? '↗️' : '↘️'}
                  </span>
                </div>
              </div>
              <Progress 
                value={insight.progress} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
            </div>
          ))}
        </div>

        {/* Smart Tips */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            💡 Smart Tips
          </h4>
          <div className="space-y-2">
            {tips.slice(0, 2).map((tip, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-water-50 to-success-50 dark:from-water-900/20 dark:to-success-900/20 border border-water-200/50 dark:border-water-800/50 animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <p className="text-sm text-water-700 dark:text-water-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-success-50 to-water-50 dark:from-success-900/20 dark:to-water-900/20 border border-success-200/50 dark:border-success-800/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <p className="font-medium text-success-700 dark:text-success-400">Monthly Impact</p>
              <p className="text-sm text-success-600 dark:text-success-500">
                Saved 2,400L water • Reduced CO₂ by 3.2kg
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

