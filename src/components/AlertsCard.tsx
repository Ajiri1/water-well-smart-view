
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
        return 'border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/20';
      case 'error':
        return 'border-error-200 bg-error-50 dark:border-error-800 dark:bg-error-900/20';
      case 'success':
        return 'border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-900/20';
      default:
        return 'border-water-200 bg-water-50 dark:border-water-800 dark:bg-water-900/20';
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge className="bg-warning-100 text-warning-700 border-warning-200">Warning</Badge>;
      case 'error':
        return <Badge className="bg-error-100 text-error-700 border-error-200">Error</Badge>;
      case 'success':
        return <Badge className="bg-success-100 text-success-700 border-success-200">Success</Badge>;
      default:
        return <Badge className="bg-water-100 text-water-700 border-water-200">Info</Badge>;
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
            <Badge className="bg-water-100 text-water-700">
              {activeAlerts.length} Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center">
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
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Alert Preferences</span>
            <Button variant="ghost" size="sm" className="text-water-600 hover:text-water-700">
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

