
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Settings, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDark(!isDark);
    toast({
      title: `${isDark ? 'Light' : 'Dark'} mode activated`,
      description: "Theme preference saved.",
    });
  };

  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-water-600 to-water-800 bg-clip-text text-transparent">
          AquaFlow
        </h1>
        <p className="text-muted-foreground text-sm">
          Water Tank Monitoring Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="glass-card">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="glass-card">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
