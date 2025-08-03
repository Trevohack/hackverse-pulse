import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Flag, Shield, Terminal, Trophy, Zap, CheckCircle, XCircle } from 'lucide-react';

// Sample flags - replace with your actual flags
const validFlags = [
  "trev{h4ck3r_1337_n0_5c0p3_n33d3d}",
  "trev{s0c14l_m3d14_m4st3r_fl4g}",
  "trev{d33p_w3b_3xpl0r3r_fl4g}",
  "trev{c0d3_r3v13w_h1dd3n_g3m}",
  "trev{1ns7agr4m_s3cr3t_p0st_fl4g}"
];

interface VerifiedFlag {
  flag: string;
  timestamp: Date;
  reward: string;
}

const FlagVerification = () => {
  const [flagInput, setFlagInput] = useState('');
  const [submittedFlags, setSubmittedFlags] = useState<string[]>([]);
  const [verifiedFlags, setVerifiedFlags] = useState<VerifiedFlag[]>([]);
  const [bulkFlags, setBulkFlags] = useState('');

  const verifyFlag = (flag: string): boolean => {
    return validFlags.includes(flag.trim());
  };

  const getReward = (flag: string): string => {
    const rewards = [
      "VPS Access (1 month)",
      "Discord VIP Role",
      "Private Channel Access",
      "Custom Bot Commands",
      "Exclusive Tutorial Access"
    ];
    // Simple hash to assign consistent rewards
    const hash = flag.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return rewards[hash % rewards.length];
  };

  const submitFlag = () => {
    if (!flagInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a flag",
        variant: "destructive",
      });
      return;
    }

    if (submittedFlags.includes(flagInput.trim())) {
      toast({
        title: "Already Submitted",
        description: "You've already submitted this flag",
        variant: "destructive",
      });
      return;
    }

    const isValid = verifyFlag(flagInput);
    setSubmittedFlags([...submittedFlags, flagInput.trim()]);

    if (isValid) {
      const reward = getReward(flagInput.trim());
      setVerifiedFlags([...verifiedFlags, {
        flag: flagInput.trim(),
        timestamp: new Date(),
        reward
      }]);
      
      toast({
        title: "🎉 Flag Verified!",
        description: `Reward unlocked: ${reward}`,
      });
    } else {
      toast({
        title: "❌ Invalid Flag",
        description: "This flag is not valid. Keep hunting!",
        variant: "destructive",
      });
    }

    setFlagInput('');
  };

  const submitBulkFlags = () => {
    const flags = bulkFlags.split('\n').map(f => f.trim()).filter(f => f);
    let newValid = 0;
    let newVerified: VerifiedFlag[] = [];

    flags.forEach(flag => {
      if (!submittedFlags.includes(flag) && verifyFlag(flag)) {
        newValid++;
        newVerified.push({
          flag,
          timestamp: new Date(),
          reward: getReward(flag)
        });
      }
    });

    setSubmittedFlags([...submittedFlags, ...flags]);
    setVerifiedFlags([...verifiedFlags, ...newVerified]);
    setBulkFlags('');

    toast({
      title: `${newValid} Flag(s) Verified!`,
      description: `Found ${newValid} valid flags from ${flags.length} submitted`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flag className="w-8 h-8 text-cyber-glow animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold font-mono bg-gradient-to-r from-cyber-glow to-purple-glow bg-clip-text text-transparent">
              FLAG VERIFICATION
            </h1>
            <Shield className="w-8 h-8 text-purple-glow animate-pulse" />
          </div>
          <p className="text-muted-foreground font-mono text-lg">
            Submit flags found across social media and hidden locations
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="border-cyber-glow text-cyber-glow">
              <Terminal className="w-4 h-4 mr-1" />
              {verifiedFlags.length} Verified
            </Badge>
            <Badge variant="outline" className="border-purple-glow text-purple-glow">
              <Trophy className="w-4 h-4 mr-1" />
              {submittedFlags.length} Submitted
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Single Flag Submission */}
          <Card className="bg-card border-border shadow-glow">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-glow" />
                Single Flag Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground">
                  Flag Format: trev{"{"}...{"}"}
                </label>
                <Input
                  placeholder="trev{your_flag_here}"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  className="font-mono bg-input border-border"
                  onKeyPress={(e) => e.key === 'Enter' && submitFlag()}
                />
              </div>
              <Button 
                onClick={submitFlag}
                className="w-full bg-gradient-to-r from-cyber-glow to-purple-glow text-black font-mono hover:opacity-90"
              >
                <Shield className="w-4 h-4 mr-2" />
                VERIFY FLAG
              </Button>
            </CardContent>
          </Card>

          {/* Bulk Flag Submission */}
          <Card className="bg-card border-border shadow-purple">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-glow" />
                Bulk Flag Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground">
                  Submit multiple flags (one per line)
                </label>
                <Textarea
                  placeholder={`trev{flag_one}\ntrev{flag_two}\ntrev{flag_three}`}
                  value={bulkFlags}
                  onChange={(e) => setBulkFlags(e.target.value)}
                  className="font-mono bg-input border-border min-h-[120px]"
                  rows={6}
                />
              </div>
              <Button 
                onClick={submitBulkFlags}
                className="w-full bg-gradient-to-r from-purple-glow to-pink-glow text-black font-mono hover:opacity-90"
              >
                <Flag className="w-4 h-4 mr-2" />
                VERIFY ALL FLAGS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {submittedFlags.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-mono text-center mb-8 text-foreground">
              Submission Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verified Flags */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Verified Flags ({verifiedFlags.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {verifiedFlags.map((item, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg border-l-4 border-green-400">
                        <div className="font-mono text-sm text-green-400 break-all">
                          {item.flag}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Reward: {item.reward}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {verifiedFlags.length === 0 && (
                      <p className="text-muted-foreground text-center py-4 font-mono">
                        No verified flags yet. Keep hunting!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Invalid Flags */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-mono text-red-400 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Invalid Flags ({submittedFlags.length - verifiedFlags.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {submittedFlags
                      .filter(flag => !verifiedFlags.some(v => v.flag === flag))
                      .map((flag, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg border-l-4 border-red-400">
                          <div className="font-mono text-sm text-red-400 break-all">
                            {flag}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Invalid or already submitted
                          </div>
                        </div>
                      ))}
                    {submittedFlags.length === verifiedFlags.length && (
                      <p className="text-muted-foreground text-center py-4 font-mono">
                        All submitted flags are valid! 🎉
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Leaderboard Hint */}
        {verifiedFlags.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-card to-muted border-border">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-mono text-foreground mb-2">
                Congratulations, Hacker!
              </h3>
              <p className="text-muted-foreground font-mono">
                You've verified {verifiedFlags.length} flag{verifiedFlags.length !== 1 ? 's' : ''}. 
                Check your Discord for reward access instructions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlagVerification;