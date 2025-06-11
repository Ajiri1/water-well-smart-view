
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DeviceStatusCardProps {
  pumpStatus: boolean;
  sensorStatus: boolean;
}

export const DeviceStatusCard = ({ pumpStatus, sensorStatus }: DeviceStatusCardProps) => {
  const devices = [
    {
      name: 'Water Level Sensor',
      status: sensorStatus ? 'online' : 'offline',
      lastUpdate: '2 mins ago',
      signal: 85,
    },
    {
      name: 'Main Pump',
      status: pumpStatus ? 'running' : 'stopped',
      lastUpdate: '1 min ago',
      signal: 92,
    },
    {
      name: 'Flow Meter',
      status: 'online',
      lastUpdate: '30 secs ago',
      signal: 78,
    },
    {
      name: 'Pressure Sensor',
      status: 'online',
      lastUpdate: '1 min ago',
      signal: 88,
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': 
      case 'running': 
        return 'bg-success-500';
      case 'offline': 
      case 'stopped': 
        return 'bg-gray-400';
      default: 
        return 'bg-warning-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': 
        return <Badge className="bg-success-50 text-success-700 border-success-200">Online</Badge>;
      case 'running': 
        return <Badge className="bg-water-50 text-water-700 border-water-200">Running</Badge>;
      case 'offline': 
        return <Badge variant="secondary">Offline</Badge>;
      case 'stopped': 
        return <Badge variant="secondary">Stopped</Badge>;
      default: 
        return <Badge className="bg-warning-50 text-warning-700 border-warning-200">Warning</Badge>;
    }
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          🔧 Device Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {devices.map((device, index) => (
          <div 
            key={device.name} 
            className="flex items-center justify-between p-4 rounded-xl neumorphic animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)} animate-pulse-soft`} />
              <div>
                <p className="font-medium text-sm">{device.name}</p>
                <p className="text-xs text-muted-foreground">{device.lastUpdate}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              {getStatusBadge(device.status)}
              <p className="text-xs text-muted-foreground">Signal: {device.signal}%</p>
            </div>
          </div>
        ))}
        
        {/* Overall System Health */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-success-50 to-water-50 dark:from-success-900/20 dark:to-water-900/20 border border-success-200/50 dark:border-success-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-success-700 dark:text-success-400">System Health</p>
              <p className="text-sm text-success-600 dark:text-success-500">All systems operational</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-success-600">95%</p>
              <p className="text-xs text-success-500">Uptime</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

