import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Zap, Shield, Target } from 'lucide-react';

interface Box {
  name: string;
  difficulty: string;
  rating: number;
  isNew: boolean;
  platform: 'thm' | 'htb';
}

const PlatformStats = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in production, you'd fetch from APIs
    const mockBoxes: Box[] = [
      { name: "Surveillance", difficulty: "Medium", rating: 4.8, isNew: true, platform: 'htb' },
      { name: "Intuition", difficulty: "Hard", rating: 4.6, isNew: true, platform: 'htb' },
      { name: "Web Fundamentals", difficulty: "Easy", rating: 4.9, isNew: true, platform: 'thm' },
      { name: "Buffer Overflow Prep", difficulty: "Easy", rating: 4.7, isNew: false, platform: 'thm' },
      { name: "Active Directory", difficulty: "Medium", rating: 4.8, isNew: true, platform: 'thm' },
      { name: "BoardLight", difficulty: "Easy", rating: 4.5, isNew: false, platform: 'htb' }
    ];

    setTimeout(() => {
      setBoxes(mockBoxes);
      setLoading(false);
    }, 1000);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getPlatformIcon = (platform: 'thm' | 'htb') => {
    return platform === 'htb' ? <Shield className="w-4 h-4" /> : <Target className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-glow" />
            Platform Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted/30 rounded-lg"></div>
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
          <Zap className="w-5 h-5 text-cyber-glow group-hover:animate-glow-pulse" />
          Platform Stats
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">
          Latest boxes and rooms from TryHackMe & HackTheBox
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {boxes.map((box, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50 hover:border-cyber-glow/30 transition-all duration-300 group/item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
                  {getPlatformIcon(box.platform)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-foreground">{box.name}</span>
                    {box.isNew && (
                      <Badge className="bg-purple-glow/20 text-purple-glow border-purple-glow/30 text-xs animate-glow-pulse">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs ${getDifficultyColor(box.difficulty)}`}>
                      {box.difficulty}
                    </Badge>
                    <span className="text-muted-foreground font-mono text-xs">
                      ⭐ {box.rating}
                    </span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-cyber-glow transition-colors" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformStats;