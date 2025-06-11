
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
        return 'bg-primary';
      case 'offline': 
      case 'stopped': 
        return 'bg-slate-500';
      default: 
        return 'bg-slate-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': 
        return <Badge className="bg-primary/10 text-primary border-primary/20">Online</Badge>;
      case 'running': 
        return <Badge className="bg-primary/10 text-primary border-primary/20">Running</Badge>;
      case 'offline': 
        return <Badge variant="secondary">Offline</Badge>;
      case 'stopped': 
        return <Badge variant="secondary">Stopped</Badge>;
      default: 
        return <Badge variant="secondary">Warning</Badge>;
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
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">System Health</p>
              <p className="text-sm text-primary/80">All systems operational</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">95%</p>
              <p className="text-xs text-primary/70">Uptime</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
