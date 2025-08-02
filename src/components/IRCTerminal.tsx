import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Wifi } from 'lucide-react';

interface Message {
  timestamp: string;
  user: string;
  message: string;
  type: 'message' | 'join' | 'leave' | 'action';
}

const IRCTerminal = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mockMessages: Message[] = [
    { timestamp: '14:32', user: 'System', message: 'Connected to irc.hackverse.org:6667', type: 'action' },
    { timestamp: '14:32', user: 'System', message: 'Welcome to #hackverse', type: 'action' },
    { timestamp: '14:33', user: '0xTrev', message: 'joins #hackverse', type: 'join' },
    { timestamp: '14:33', user: '0xTrev', message: 'Hey everyone! Working on some web exploitation today', type: 'message' },
    { timestamp: '14:34', user: 'h4ck3r_101', message: 'joins #hackverse', type: 'join' },
    { timestamp: '14:34', user: 'h4ck3r_101', message: 'Nice! Just finished the new HTB box', type: 'message' },
    { timestamp: '14:35', user: 'CyberNinja', message: 'joins #hackverse', type: 'join' },
    { timestamp: '14:35', user: 'CyberNinja', message: 'Anyone tried the latest TryHackMe room?', type: 'message' },
    { timestamp: '14:36', user: '0xTrev', message: 'Which one? The AD room is pretty good', type: 'message' },
    { timestamp: '14:37', user: 'h4ck3r_101', message: 'Yeah, that one taught me a lot about enumeration', type: 'message' },
    { timestamp: '14:38', user: 'CodeBreaker', message: 'joins #hackverse', type: 'join' },
    { timestamp: '14:38', user: 'CodeBreaker', message: 'Just started learning reverse engineering', type: 'message' },
    { timestamp: '14:39', user: 'CyberNinja', message: 'Check out the malware analysis track on TryHackMe', type: 'message' },
    { timestamp: '14:40', user: '0xTrev', message: 'And don\'t forget to practice on HackTheBox', type: 'message' }
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < mockMessages.length) {
        setMessages(prev => [...prev, mockMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
        // Start typing animation for new message
        setTimeout(() => {
          setIsTyping(true);
          const newMessage = "Looks like we have some new members! Welcome to Hackverse IRC 🔐";
          let charIndex = 0;
          const typingInterval = setInterval(() => {
            setCurrentMessage(newMessage.slice(0, charIndex + 1));
            charIndex++;
            if (charIndex >= newMessage.length) {
              clearInterval(typingInterval);
              setTimeout(() => {
                setMessages(prev => [...prev, {
                  timestamp: '14:41',
                  user: '0xTrev',
                  message: newMessage,
                  type: 'message'
                }]);
                setCurrentMessage('');
                setIsTyping(false);
              }, 500);
            }
          }, 50);
        }, 2000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'join':
        return 'text-green-400';
      case 'leave':
        return 'text-red-400';
      case 'action':
        return 'text-purple-glow';
      default:
        return 'text-foreground';
    }
  };

  const getUserColor = (user: string) => {
    const colors = ['text-cyber-glow', 'text-purple-glow', 'text-pink-glow', 'text-yellow-400', 'text-blue-400'];
    const index = user.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <Card className="bg-black/90 border-border backdrop-blur-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-3 p-4 bg-muted/10 border-b border-border">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyber-glow" />
            <span className="font-mono text-sm text-foreground">IRC Client - Hackverse</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="font-mono text-xs text-green-400">Connected</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 h-96 overflow-y-auto bg-black/50 font-mono text-sm">
          <div className="space-y-1">
            {messages.filter(msg => msg && msg.type).map((msg, index) => (
              <div 
                key={index} 
                className="animate-fade-in opacity-0 animation-fill-forwards"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {msg.type === 'action' ? (
                  <div className={`${getMessageStyle(msg.type)} opacity-80`}>
                    [{msg.timestamp}] * {msg.message}
                  </div>
                ) : msg.type === 'join' ? (
                  <div className={`${getMessageStyle(msg.type)} opacity-80`}>
                    [{msg.timestamp}] → {msg.user} {msg.message}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">[{msg.timestamp}]</span>
                    <span className={getUserColor(msg.user)}>&lt;{msg.user}&gt;</span>
                    <span className={getMessageStyle(msg.type)}>{msg.message}</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 animate-fade-in">
                <span className="text-muted-foreground">[14:41]</span>
                <span className={getUserColor('0xTrev')}>&lt;0xTrev&gt;</span>
                <span className="text-foreground">
                  {currentMessage}
                  <span className="animate-ping">|</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Terminal Input */}
        <div className="border-t border-border bg-muted/5 p-3">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-cyber-glow">[14:42]</span>
            <span className="text-purple-glow">&gt;</span>
            <span className="text-muted-foreground opacity-50">Type your message here...</span>
            <span className="animate-ping text-cyber-glow">_</span>
          </div>
        </div>
      </Card>
      
      {/* Connection Info */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/20 border border-border rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-glow-pulse"></div>
          <span className="font-mono text-sm text-muted-foreground">
            Connect: <span className="text-cyber-glow">irc.hackverse.org:6667</span> | Channel: <span className="text-purple-glow">#hackverse</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default IRCTerminal;