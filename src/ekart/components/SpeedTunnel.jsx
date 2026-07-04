import React from 'react';
import { motion } from 'framer-motion';

const SpeedTunnel = () => {
    // A simplified visual representation of a speed tunnel using radial lines
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />

            {/* Moving Stars/Streaks */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-[2px] h-[100px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent origin-top"
                    initial={{ opacity: 0, scaleY: 0, rotate: i * 18, y: -50 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scaleY: [0, 3, 0],
                        translateY: [0, 800]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: (i * 7 % 20) / 10
                    }}
                    style={{ rotate: i * 18 }}
                />
            ))}

            {/* Grid Floor */}
            <div className="absolute bottom-0 w-full h-[50vh] bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.1)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100%] [transform:perspective(500px)_rotateX(60deg)_translateY(100px)] origin-bottom" />
            </div>
        </div>
    );
};

export default SpeedTunnel;
