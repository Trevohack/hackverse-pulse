import DiscordStats from './DiscordStats';
import GitHubStats from './GitHubStats';
import PlatformStats from './PlatformStats';
import YouTubeContent from './YouTubeContent';
import CVETracker from './CVETracker';
import CTFEvents from './CTFEvents';
import SkillsRadar from './SkillsRadar';
import WallOfHackers from './WallOfHackers';

const StatsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground mb-4 animate-fade-in">
          Live Statistics
        </h2>
        <p className="text-muted-foreground font-mono animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Real-time data from our community platforms
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <DiscordStats />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <GitHubStats />
        </div>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <PlatformStats />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
          <YouTubeContent />
        </div>
      </div>

      {/* Security & CTF Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <CVETracker />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <CTFEvents />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <SkillsRadar />
        </div>
      </div>

      {/* Wall of Hackers Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <WallOfHackers />
        </div>
      </div>

      {/* IRC server info */}
      <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '2.0s' }}>
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-muted/50 border border-border rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
          <span className="font-mono text-sm text-muted-foreground">
            IRC Server: irc.hackverse.org:6667
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;