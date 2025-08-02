import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface DiscordStats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
}

const DiscordStats = () => {
  const [stats, setStats] = useState<DiscordStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscordStats = async () => {
      try {
        // Note: Discord webhooks don't provide server stats directly
        // This would typically require a Discord bot or different API endpoint
        // For demo purposes, we'll simulate the data
        
        setTimeout(() => {
          setStats({
            memberCount: 128,
            onlineCount: 42,
            serverName: "Hackverse Community"
          });
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to fetch Discord stats');
        setLoading(false);
      }
    };

    fetchDiscordStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card animate-fade-in">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="text-destructive">
          <h3 className="font-mono font-semibold mb-2">Discord Server</h3>
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in group">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
          <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
            Discord Server
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-mono">Total Members</p>
            <p className="text-2xl font-bold font-mono text-primary">{stats?.memberCount}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-mono">Online Now</p>
            <p className="text-2xl font-bold font-mono text-secondary">{stats?.onlineCount}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground font-mono">{stats?.serverName}</p>
        </div>
      </div>
    </Card>
  );
};

export default DiscordStats;