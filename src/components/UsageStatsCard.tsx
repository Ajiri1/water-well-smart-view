
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dailyData = [
  { name: 'Mon', usage: 320, target: 350 },
  { name: 'Tue', usage: 280, target: 350 },
  { name: 'Wed', usage: 390, target: 350 },
  { name: 'Thu', usage: 310, target: 350 },
  { name: 'Fri', usage: 420, target: 350 },
  { name: 'Sat', usage: 380, target: 350 },
  { name: 'Sun', usage: 290, target: 350 },
];

const weeklyData = [
  { name: 'Week 1', usage: 2100, target: 2200 },
  { name: 'Week 2', usage: 2350, target: 2200 },
  { name: 'Week 3', usage: 1980, target: 2200 },
  { name: 'Week 4', usage: 2180, target: 2200 },
];

const monthlyData = [
  { name: 'Jan', usage: 8200, target: 8500 },
  { name: 'Feb', usage: 7800, target: 8500 },
  { name: 'Mar', usage: 9100, target: 8500 },
  { name: 'Apr', usage: 8600, target: 8500 },
  { name: 'May', usage: 8900, target: 8500 },
  { name: 'Jun', usage: 8400, target: 8500 },
];

export const UsageStatsCard = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="font-medium">{label}</p>
          <p className="text-water-600">
            Usage: {payload[0].value}L
          </p>
          {payload[1] && (
            <p className="text-gray-500">
              Target: {payload[1].value}L
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
          💧 Water Usage Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="usage" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} opacity={0.3} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">2.39k</p>
                <p className="text-sm text-muted-foreground">Weekly Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">341L</p>
                <p className="text-sm text-muted-foreground">Daily Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">420L</p>
                <p className="text-sm text-muted-foreground">Peak Day</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">-8%</p>
                <p className="text-sm text-muted-foreground">vs Last Week</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#e2e8f0" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">8.61k</p>
                <p className="text-sm text-muted-foreground">Monthly Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">2.15k</p>
                <p className="text-sm text-muted-foreground">Weekly Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">2.35k</p>
                <p className="text-sm text-muted-foreground">Peak Week</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">-2%</p>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="usage" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">51.0k</p>
                <p className="text-sm text-muted-foreground">Yearly Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">8.5k</p>
                <p className="text-sm text-muted-foreground">Monthly Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-water-600">9.1k</p>
                <p className="text-sm text-muted-foreground">Peak Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">+3%</p>
                <p className="text-sm text-muted-foreground">vs Last Year</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

