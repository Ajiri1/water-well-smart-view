
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsCardProps {
  pumpStatus: boolean;
  setPumpStatus: (status: boolean) => void;
  sensorStatus: boolean;
}

export const QuickActionsCard = ({ pumpStatus, setPumpStatus, sensorStatus }: QuickActionsCardProps) => {
  const { toast } = useToast();

  const handlePumpToggle = () => {
    setPumpStatus(!pumpStatus);
    toast({
      title: `Pump ${!pumpStatus ? 'Started' : 'Stopped'}`,
      description: `Water pump is now ${!pumpStatus ? 'running' : 'stopped'}.`,
    });
  };

  const handleRefillRequest = () => {
    toast({
      title: "Refill Request Sent",
      description: "Your water tank refill request has been submitted.",
    });
  };

  const handleMaintenanceMode = () => {
    toast({
      title: "Maintenance Mode",
      description: "System switched to maintenance mode.",
    });
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pump Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl neumorphic">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${pumpStatus ? 'bg-primary' : 'bg-slate-500'} animate-pulse-soft`} />
              <div>
                <p className="font-medium">Water Pump</p>
                <p className="text-sm text-muted-foreground">
                  {pumpStatus ? 'Currently Running' : 'Currently Stopped'}
                </p>
              </div>
            </div>
            <Switch 
              checked={pumpStatus} 
              onCheckedChange={handlePumpToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {/* Auto Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl neumorphic">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse-soft" />
              <div>
                <p className="font-medium">Auto Mode</p>
                <p className="text-sm text-muted-foreground">Smart pump control</p>
              </div>
            </div>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleRefillRequest}
            className="w-full water-gradient text-white hover:opacity-90 transition-all duration-200 shadow-soft"
          >
            Request Refill
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleMaintenanceMode}
            className="w-full glass-card hover:bg-slate-700/50 transition-all duration-200"
          >
            Maintenance Mode
          </Button>
        </div>

        {/* Emergency Stop */}
        <div className="pt-4 border-t border-slate-700">
          <Button 
            variant="destructive" 
            className="w-full neutral-gradient hover:opacity-90 transition-all duration-200"
          >
            Emergency Stop
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Immediately stops all pumps and valves
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
