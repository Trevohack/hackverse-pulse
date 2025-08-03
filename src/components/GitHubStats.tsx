import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string;
}

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/Trevohack'),
          fetch('https://api.github.com/users/Trevohack/repos?sort=stars&per_page=100')
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        setUser(userData);
        setRepos(reposData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GitHub stats');
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted animate-pulse rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="text-destructive">
          <h3 className="font-mono font-semibold mb-2">GitHub Stats</h3>
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-purple transition-all duration-300 animate-fade-in group">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img 
            src={user?.avatar_url} 
            alt={user?.name}
            className="w-12 h-12 rounded-full border-2 border-primary group-hover:border-secondary transition-colors"
          />
          <div>
            <h3 className="font-mono font-semibold text-foreground group-hover:text-secondary transition-colors">
              {user?.name || user?.login}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">@{user?.login}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground font-mono">Repos</p>
            <p className="text-xl font-bold font-mono text-primary">{user?.public_repos}</p>
          </div>
          
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground font-mono">Followers</p>
            <p className="text-xl font-bold font-mono text-secondary">{user?.followers}</p>
          </div>
          
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground font-mono">Stars</p>
            <p className="text-xl font-bold font-mono text-accent">{totalStars}</p>
          </div>
        </div>

        {user?.bio && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground font-mono">{user.bio}</p>
          </div>
        )}

        {repos.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-mono text-muted-foreground">Top Repositories</p>
            <div className="space-y-1">
              {repos.slice(0, 3).map((repo) => (
                <div key={repo.name} className="flex justify-between items-center py-1">
                  <span className="text-sm font-mono text-foreground">{repo.name}</span>
                  <div className="flex items-center space-x-2">
                    {repo.language && (
                      <span className="text-xs font-mono text-muted-foreground">{repo.language}</span>
                    )}
                    <span className="text-xs font-mono text-accent">★ {repo.stargazers_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GitHubStats;