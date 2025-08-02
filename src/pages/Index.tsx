import HeroSection from '@/components/HeroSection';
import StatsGrid from '@/components/StatsGrid';
import IRCTerminal from '@/components/IRCTerminal';
import MatrixRain from '@/components/MatrixRain';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <div className="relative z-10">
      <HeroSection />
      <StatsGrid />
      
      {/* IRC Terminal Demo Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground mb-4 animate-fade-in">
            IRC Experience
          </h2>
          <p className="text-muted-foreground font-mono animate-fade-in" style={{ animationDelay: '0.2s' }}>
            See how our community communicates in real-time
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <IRCTerminal />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
