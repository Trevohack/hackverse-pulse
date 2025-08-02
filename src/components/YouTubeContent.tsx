import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Eye, Clock, ExternalLink } from 'lucide-react';

interface Video {
  title: string;
  creator: string;
  views: string;
  duration: string;
  thumbnail: string;
  isNew: boolean;
  uploadTime: string;
}

const YouTubeContent = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in production, you'd fetch from YouTube API
    const mockVideos: Video[] = [
      {
        title: "HackTheBox Surveillance - Full Walkthrough",
        creator: "John Hammond",
        views: "24K",
        duration: "32:15",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        isNew: true,
        uploadTime: "2 days ago"
      },
      {
        title: "Active Directory Penetration Testing Lab",
        creator: "IppSec",
        views: "89K",
        duration: "45:22",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        isNew: true,
        uploadTime: "1 week ago"
      },
      {
        title: "Buffer Overflow Exploitation Techniques",
        creator: "Tyler Ramsden",
        views: "15K",
        duration: "28:09",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        isNew: false,
        uploadTime: "3 days ago"
      },
      {
        title: "Web Application Security Testing",
        creator: "John Hammond",
        views: "67K",
        duration: "41:33",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        isNew: true,
        uploadTime: "5 days ago"
      }
    ];

    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1200);
  }, []);

  const getCreatorColor = (creator: string) => {
    const colors = {
      'John Hammond': 'text-purple-glow',
      'IppSec': 'text-cyber-glow',
      'Tyler Ramsden': 'text-pink-glow'
    };
    return colors[creator as keyof typeof colors] || 'text-foreground';
  };

  if (loading) {
    return (
      <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-pink-glow" />
            YouTube Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted/30 rounded-lg"></div>
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
          <PlayCircle className="w-5 h-5 text-pink-glow group-hover:animate-glow-pulse" />
          YouTube Content
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">
          Latest hacking content from top creators
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/50 hover:border-pink-glow/30 transition-all duration-300 group/item animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-20 h-14 bg-muted/50 rounded-md border border-border/30 flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-muted-foreground group-hover/item:text-pink-glow transition-colors" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded font-mono">
                  {video.duration}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-mono text-sm font-medium text-foreground line-clamp-2 group-hover/item:text-pink-glow transition-colors">
                    {video.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-pink-glow transition-colors flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className={`font-mono text-xs ${getCreatorColor(video.creator)}`}>
                    {video.creator}
                  </span>
                  {video.isNew && (
                    <Badge className="bg-pink-glow/20 text-pink-glow border-pink-glow/30 text-xs animate-glow-pulse">
                      NEW
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-1 text-muted-foreground text-xs font-mono">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.uploadTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeContent;