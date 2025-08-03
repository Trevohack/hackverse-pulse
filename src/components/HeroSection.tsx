const HeroSection = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold font-mono bg-gradient-primary bg-clip-text text-transparent animate-fade-in" title="trev{h1dd3n_1n_pl41n_51gh7_a8e9c7f2d4b6}">
            Hackverse
          </h1>
          <div className="flex items-center justify-center space-x-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
            <p className="text-xl md:text-2xl font-mono text-muted-foreground">
              Client Dashboard
            </p>
            <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg font-mono text-foreground">
            IRC Server Statistics & Community Hub
          </p>
          <p className="text-sm font-mono text-muted-foreground">
            Real-time data from Discord & GitHub
          </p>
        </div>

        {/* Connection status indicator */}
        <div className="flex items-center justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse"></div>
          <span className="text-sm font-mono text-primary">Connected</span>
        </div>
      </div>

      {/* Grid overlay for cyber effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default HeroSection;