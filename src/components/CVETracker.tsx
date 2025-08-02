import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Zap, ExternalLink } from 'lucide-react';

interface CVE {
  id: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  score: number;
  published: string;
  vendor: string;
}

const CVETracker = () => {
  const [cves, setCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated CVE data - in production, you'd fetch from NIST NVD API
    const mockCVEs: CVE[] = [
      {
        id: 'CVE-2024-0132',
        description: 'Critical RCE vulnerability in Apache HTTP Server',
        severity: 'Critical',
        score: 9.8,
        published: '2024-01-15',
        vendor: 'Apache'
      },
      {
        id: 'CVE-2024-0089',
        description: 'SQL Injection in WordPress Core',
        severity: 'High',
        score: 8.1,
        published: '2024-01-12',
        vendor: 'WordPress'
      },
      {
        id: 'CVE-2024-0067',
        description: 'Buffer overflow in OpenSSL library',
        severity: 'High',
        score: 7.5,
        published: '2024-01-10',
        vendor: 'OpenSSL'
      },
      {
        id: 'CVE-2024-0045',
        description: 'XSS vulnerability in React components',
        severity: 'Medium',
        score: 6.1,
        published: '2024-01-08',
        vendor: 'Meta'
      },
      {
        id: 'CVE-2024-0023',
        description: 'Privilege escalation in Linux kernel',
        severity: 'High',
        score: 7.8,
        published: '2024-01-05',
        vendor: 'Linux'
      }
    ];

    setTimeout(() => {
      setCves(mockCVEs);
      setLoading(false);
    }, 1500);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'High': return <Zap className="w-4 h-4 text-orange-400" />;
      default: return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-mono text-xl text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            CVE Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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
          <AlertTriangle className="w-5 h-5 text-red-400 group-hover:animate-glow-pulse" />
          CVE Tracker
        </CardTitle>
        <p className="text-muted-foreground font-mono text-sm">
          Latest security vulnerabilities to stay aware of
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cves.map((cve, index) => (
            <div 
              key={cve.id}
              className="flex items-start justify-between p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-red-400/30 transition-all duration-300 group/item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-3 flex-1">
                <div className="p-2 rounded-md bg-red-500/10 border border-red-500/20 flex-shrink-0">
                  {getSeverityIcon(cve.severity)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono font-bold text-cyber-glow text-sm">
                      {cve.id}
                    </span>
                    <Badge className={`text-xs ${getSeverityColor(cve.severity)}`}>
                      {cve.severity}
                    </Badge>
                    <span className="text-muted-foreground font-mono text-xs">
                      CVSS: {cve.score}
                    </span>
                  </div>
                  <p className="text-foreground text-sm mb-2 line-clamp-2">
                    {cve.description}
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs font-mono">
                    <span>Vendor: {cve.vendor}</span>
                    <span>Published: {cve.published}</span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-red-400 transition-colors flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVETracker;