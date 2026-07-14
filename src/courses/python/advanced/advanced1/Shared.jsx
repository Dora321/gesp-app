import { Layers, Repeat, AlertOctagon, Play, Trophy, Code, Box, Rocket, Mic, HelpCircle, TrendingUp, Lock, Search } from 'lucide-react';

export const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        "layers": <Layers size={size} className={className} />,
        "repeat": <Repeat size={size} className={className} />,
        "alert": <AlertOctagon size={size} className={className} />,
        "play": <Play size={size} className={className} />,
        "trophy": <Trophy size={size} className={className} />,
        "code": <Code size={size} className={className} />,
        "rocket": <Rocket size={size} className={className} />,
        "mic": <Mic size={size} className={className} />,
        "help": <HelpCircle size={size} className={className} />,
        "stairs": <TrendingUp size={size} className={className} />,
        "lock": <Lock size={size} className={className} />,
        "coin": <Box size={size} className={className} />, // Using Box as generic if Coins not avail, but let's try to match style
        "search": <Search size={size} className={className} />
    };
    return icons[name] || null;
};
