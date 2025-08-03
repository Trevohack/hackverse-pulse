import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    name: string;
    type: number;
  }>;
  roles: string[];
  joinedAt: string;
  nickname?: string;
}

interface WallFilter {
  type: 'all' | 'online' | 'offline' | 'contributors';
  label: string;
}

const WallOfHackers = () => {
  const [members, setMembers] = useState<DiscordMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'offline' | 'contributors'>('all');

  const filters: WallFilter[] = [
    { type: 'all', label: 'All Members' },
    { type: 'online', label: 'Online' },
    { type: 'offline', label: 'Offline' },
    { type: 'contributors', label: 'Top Contributors' }
  ];

  useEffect(() => {
    const fetchDiscordMembers = async () => {
      try {
        // Note: Discord webhooks don't directly provide member data
        // This would typically require a Discord bot with proper permissions
        // For demo purposes, we'll simulate member data
        
        setTimeout(() => {
          const simulatedMembers: DiscordMember[] = [
            {
              id: '1',
              username: '0xTrev',
              discriminator: '1337',
              avatar: 'https://cdn.discordapp.com/avatars/123/avatar1.png',
              status: 'online',
              activities: [{ name: 'Hacking TryHackMe', type: 0 }],
              roles: ['Admin', 'CTF Master'],
              joinedAt: '2023-01-15T10:30:00Z',
              nickname: 'Treveen'
            },
            {
              id: '2',
              username: 'CyberNinja',
              discriminator: '2048',
              avatar: null,
              status: 'online',
              activities: [{ name: 'Pwning HackTheBox', type: 0 }],
              roles: ['Moderator', 'Bug Hunter'],
              joinedAt: '2023-02-20T14:15:00Z'
            },
            {
              id: '3',
              username: 'ScriptKiddie',
              discriminator: '4096',
              avatar: 'https://cdn.discordapp.com/avatars/456/avatar3.png',
              status: 'idle',
              activities: [],
              roles: ['Member'],
              joinedAt: '2023-03-10T09:45:00Z'
            },
            {
              id: '4',
              username: 'PentestPro',
              discriminator: '8192',
              avatar: 'https://cdn.discordapp.com/avatars/789/avatar4.png',
              status: 'dnd',
              activities: [{ name: 'Red Team Exercise', type: 0 }],
              roles: ['Senior', 'OSCP'],
              joinedAt: '2023-01-05T16:20:00Z'
            },
            {
              id: '5',
              username: 'InfoSecGuru',
              discriminator: '1024',
              avatar: null,
              status: 'offline',
              activities: [],
              roles: ['Mentor', 'CISSP'],
              joinedAt: '2022-12-01T11:30:00Z'
            },
            {
              id: '6',
              username: 'Anonymous',
              discriminator: '0000',
              avatar: 'https://cdn.discordapp.com/avatars/000/avatar6.png',
              status: 'online',
              activities: [{ name: 'Researching 0-days', type: 0 }],
              roles: ['Ghost', 'Elite'],
              joinedAt: '2023-04-01T00:00:00Z'
            },
            {
              id: '7',
              username: 'MalwareAnalyst',
              discriminator: '3333',
              avatar: 'https://cdn.discordapp.com/avatars/333/avatar7.png',
              status: 'online',
              activities: [{ name: 'Reverse Engineering', type: 0 }],
              roles: ['Analyst', 'GREM'],
              joinedAt: '2023-02-14T13:45:00Z'
            },
            {
              id: '8',
              username: 'NetworkNomad',
              discriminator: '7777',
              avatar: null,
              status: 'idle',
              activities: [],
              roles: ['Network Sec'],
              joinedAt: '2023-03-25T08:30:00Z'
            }
          ];
          
          setMembers(simulatedMembers);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        setError('Failed to fetch Discord members');
        setLoading(false);
      }
    };

    fetchDiscordMembers();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status) {
      case 'online': return 'shadow-[0_0_10px_rgba(34,197,94,0.7)]';
      case 'idle': return 'shadow-[0_0_10px_rgba(234,179,8,0.7)]';
      case 'dnd': return 'shadow-[0_0_10px_rgba(239,68,68,0.7)]';
      default: return '';
    }
  };

  const filteredMembers = members.filter(member => {
    switch (activeFilter) {
      case 'online':
        return member.status === 'online';
      case 'offline':
        return member.status === 'offline';
      case 'contributors':
        return member.roles.some(role => 
          ['Admin', 'Moderator', 'Senior', 'Mentor', 'Elite'].includes(role)
        );
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="h-8 bg-muted animate-pulse rounded w-48 mx-auto"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-32 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-16 h-16 bg-muted animate-pulse rounded-full mx-auto"></div>
                <div className="h-3 bg-muted animate-pulse rounded"></div>
                <div className="h-2 bg-muted animate-pulse rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="text-center text-destructive">
          <h3 className="font-mono font-semibold mb-2">Wall of Hackers</h3>
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
            <h3 className="text-2xl font-mono font-bold text-foreground">
              Wall of Hackers
            </h3>
            <div className="w-3 h-3 bg-secondary rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            Live Discord Community • {members.length} Members
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.type}
              variant={activeFilter === filter.type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.type)}
              className="font-mono text-xs"
              data-flag-hint="dGV2e2Q0dGE0bmQ0bjFtNHQxNG5fMWQ0ZjEzZWY5ODc2NTQzMjEwfQ=="
            >
              {filter.label}
              {filter.type === 'online' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {members.filter(m => m.status === 'online').length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="group relative flex flex-col items-center space-y-2 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:bg-muted/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar with Status */}
              <div className="relative">
                <Avatar className={`w-16 h-16 ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300 ${getStatusGlow(member.status)}`}>
                  <AvatarImage 
                    src={member.avatar || undefined} 
                    alt={`${member.nickname || member.username}'s avatar`}
                  />
                  <AvatarFallback className="bg-muted font-mono text-xs">
                    {(member.nickname || member.username).substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status Indicator */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${getStatusColor(member.status)} ${getStatusGlow(member.status)}`}></div>
              </div>

              {/* Username */}
              <div className="text-center space-y-1 min-h-[3rem] flex flex-col justify-center">
                <p className="font-mono text-xs font-semibold text-foreground truncate max-w-full">
                  {member.nickname || member.username}
                </p>
                {member.discriminator !== '0000' && (
                  <p className="font-mono text-[10px] text-muted-foreground">
                    #{member.discriminator}
                  </p>
                )}
              </div>

              {/* Activity */}
              {member.activities.length > 0 && (
                <div className="text-center">
                  <p className="font-mono text-[9px] text-accent truncate max-w-full px-2">
                    {member.activities[0].name}
                  </p>
                </div>
              )}

              {/* Roles */}
              {member.roles.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1">
                  {member.roles.slice(0, 2).map((role, roleIndex) => (
                    <Badge 
                      key={roleIndex} 
                      variant="secondary" 
                      className="text-[8px] px-1 py-0.5 font-mono"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">Online</p>
              <p className="text-lg font-bold font-mono text-green-400">
                {members.filter(m => m.status === 'online').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">Idle</p>
              <p className="text-lg font-bold font-mono text-yellow-400">
                {members.filter(m => m.status === 'idle').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">DND</p>
              <p className="text-lg font-bold font-mono text-red-400">
                {members.filter(m => m.status === 'dnd').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">Offline</p>
              <p className="text-lg font-bold font-mono text-gray-400">
                {members.filter(m => m.status === 'offline').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WallOfHackers;