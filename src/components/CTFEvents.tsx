import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Users, ExternalLink, Clock } from 'lucide-react';

interface CTFEvent {
  name: string;
  startDate: string;
  endDate: string;
  format: 'Jeopardy' | 'Attack-Defense' | 'Mixed';
  status: 'upcoming' | 'live' | 'finished';
  participants: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  organizer: string;
}

const CTFEvents = () => {
  const [events, setEvents] = useState<CTFEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated CTF data - in production, you'd fetch from CTFtime API
    const mockEvents: CTFEvent[] = [
      {
        name: 'HackTheBox University CTF 2024',
        startDate: '2024-02-15',
        endDate: '2024-02-17',
        format: 'Jeopardy',
        status: 'upcoming',
        participants: 2847,
        difficulty: 'Intermediate',
        organizer: 'HackTheBox'
      },
      {
        name: 'PicoCTF 2024',
        startDate: '2024-02-10',
        endDate: '2024-02-25',
        format: 'Jeopardy',
        status: 'live',
        participants: 15623,
        difficulty: 'Beginner',
        organizer: 'Carnegie Mellon'
      },
      {
        name: 'DEF CON CTF Qualifier',
        startDate: '2024-03-01',
        endDate: '2024-03-03',
        format: 'Attack-Defense',
        status: 'upcoming',
        participants: 892,
        difficulty: 'Advanced',
        organizer: 'Nautilus Institute'
      },
      {
        name: 'CyberSecurityRumble CTF',
        startDate: '2024-02-08',
        endDate: '2024-02-09',
        format: 'Mixed',
        status: 'finished',
        participants: 1456,
        difficulty: 'Intermediate',
        organizer: 'CYSEC'
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'finished': return 'bg-muted/20 text-muted-foreground border-border';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-glow" />
            CTF Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-glow group-hover:animate-glow-pulse" />
          CTF Events
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">
          Upcoming and ongoing capture the flag competitions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-purple-glow/30 transition-all duration-300 group/item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-mono font-semibold text-foreground mb-2 group-hover/item:text-purple-glow transition-colors">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                      {event.status.toUpperCase()}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(event.difficulty)}`}>
                      {event.difficulty}
                    </Badge>
                    <Badge className="bg-muted/30 text-muted-foreground border-border text-xs">
                      {event.format}
                    </Badge>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-purple-glow transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground font-mono">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-mono">
                  <Users className="w-4 h-4" />
                  <span>{event.participants.toLocaleString()} participants</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border/30">
                <span className="text-muted-foreground font-mono text-xs">
                  Organized by: <span className="text-cyber-glow">{event.organizer}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CTFEvents;