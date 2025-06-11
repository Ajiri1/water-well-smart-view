
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AlertsCardProps {
  waterLevel: number;
}

export const AlertsCard = ({ waterLevel }: AlertsCardProps) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const alerts = [
    {
      id: 'low-water',
      type: 'warning',
      title: 'Low Water Level',
      message: 'Water level is below 20%. Consider refilling soon.',
      time: '5 mins ago',
      active: waterLevel < 20,
    },
    {
      id: 'high-usage',
      type: 'info',
      title: 'High Usage Detected',
      message: 'Water consumption is 25% higher than usual today.',
      time: '1 hour ago',
      active: true,
    },
    {
      id: 'maintenance',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for next Tuesday at 2 PM.',
      time: '2 hours ago',
      active: true,
    },
    {
      id: 'pump-efficiency',
      type: 'success',
      title: 'Pump Efficiency Improved',
      message: 'Recent maintenance improved pump efficiency by 12%.',
      time: '1 day ago',
      active: true,
    }
  ];

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning':
      case 'error':
        return 'border-slate-600 bg-slate-800/30';
      case 'success':
        return 'border-primary/30 bg-primary/5';
      default:
        return 'border-primary/30 bg-primary/5';
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge variant="secondary">Warning</Badge>;
      case 'error':
        return <Badge variant="secondary">Error</Badge>;
      case 'success':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Success</Badge>;
      default:
        return <Badge className="bg-primary/10 text-primary border-primary/20">Info</Badge>;
    }
  };

  const activeAlerts = alerts.filter(alert => 
    alert.active && !dismissedAlerts.includes(alert.id)
  );

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            🔔 Alerts & Notifications
          </CardTitle>
          {activeAlerts.length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {activeAlerts.length} Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-muted-foreground">No active alerts</p>
            <p className="text-sm text-muted-foreground">Your system is running smoothly</p>
          </div>
        ) : (
          activeAlerts.map((alert, index) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-xl border ${getAlertStyle(alert.type)} animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {getAlertBadge(alert.type)}
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dismissAlert(alert.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}

        {/* Quick Alert Settings */}
        <div className="pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Alert Preferences</span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
