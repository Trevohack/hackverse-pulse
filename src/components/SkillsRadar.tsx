import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, Code, Network, Search, Lock } from 'lucide-react';

const SkillsRadar = () => {
  const skills = [
    { name: 'Web Exploitation', level: 85, icon: Code, color: 'text-cyber-glow' },
    { name: 'Network Security', level: 78, icon: Network, color: 'text-purple-glow' },
    { name: 'Cryptography', level: 72, icon: Lock, color: 'text-pink-glow' },
    { name: 'OSINT', level: 88, icon: Search, color: 'text-blue-400' },
    { name: 'Reverse Engineering', level: 65, icon: Brain, color: 'text-orange-400' },
    { name: 'Malware Analysis', level: 70, icon: Shield, color: 'text-red-400' }
  ];

  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyber-glow group-hover:animate-glow-pulse" />
          Community Skills
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">
          Average skill levels in our hacker community
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <skill.icon className={`w-4 h-4 ${skill.color}`} />
                  <span className="font-mono text-sm text-foreground">{skill.name}</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 bg-gradient-to-r from-cyber-glow to-purple-glow`}
                    style={{ 
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.2}s`,
                      boxShadow: `0 0 10px hsl(var(--cyber-glow) / 0.5)`
                    }}
                  />
                </div>
                
                {/* Glow effect */}
                <div 
                  className="absolute top-0 h-2 rounded-full opacity-50 animate-glow-pulse"
                  style={{ 
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, hsl(var(--cyber-glow)) 0%, hsl(var(--purple-glow)) 100%)`,
                    filter: 'blur(2px)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Radar visualization hint */}
        <div className="mt-6 text-center">
          <div className="relative w-32 h-32 mx-auto">
            {/* Radar circles */}
            {[1, 2, 3, 4].map((ring) => (
              <div
                key={ring}
                className="absolute border border-cyber-glow/20 rounded-full"
                style={{
                  width: `${ring * 25}%`,
                  height: `${ring * 25}%`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyber-glow rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
            
            {/* Radar sweep */}
            <div 
              className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-cyber-glow to-transparent origin-left animate-spin"
              style={{ animationDuration: '3s' }}
            />
          </div>
          <p className="text-muted-foreground font-mono text-xs mt-2">
            Skills Assessment Radar
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadar;