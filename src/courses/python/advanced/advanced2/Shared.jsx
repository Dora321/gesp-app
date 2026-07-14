import { Grid, ArrowUp, RotateCw, Play, Code, Box, Hash, HelpCircle, Trophy } from 'lucide-react';

export const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        "grid": <Grid size={size} className={className} />,
        "arrow-up": <ArrowUp size={size} className={className} />,
        "rotate": <RotateCw size={size} className={className} />,
        "play": <Play size={size} className={className} />,
        "code": <Code size={size} className={className} />,
        "box": <Box size={size} className={className} />,
        "hash": <Hash size={size} className={className} />,
        "trophy": <Trophy size={size} className={className} />,
        "help": <HelpCircle size={size} className={className} />
    };
    return icons[name] || null;
};
