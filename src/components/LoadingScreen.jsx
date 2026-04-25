import React, { useEffect, useRef, useState } from 'react';

/**
 * LoadingScreen — A premium, cinematic loading animation.
 *
 * Features:
 *  - Canvas-based floating particles with depth
 *  - Orbiting neon rings (CSS)
 *  - CXK gif with a pulsing glow halo
 *  - Animated gradient text with shimmer
 *  - Subtle scanline overlay
 *
 * @param {string} message  Custom loading text (default: "正在为您加载...")
 * @param {'dark'|'light'} variant  Background style
 */
export default function LoadingScreen({ message = '正在为您加载...', variant = 'dark' }) {
  const canvasRef = useRef(null);
  const [dots, setDots] = useState('');

  // Animated dots
  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(id);
  }, []);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const PARTICLE_COUNT = 60;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 60 + 220, // blue-purple range
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.15})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(240, 60%, 70%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const isDark = variant === 'dark';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 50% 40%, #1e1b4b 0%, #0f0a2e 40%, #050214 100%)'
          : 'radial-gradient(ellipse at 50% 40%, #e0e7ff 0%, #c7d2fe 40%, #a5b4fc 100%)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isDark ? 1 : 0.4 }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'} 2px,
            ${isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'} 4px
          )`,
        }}
      />

      {/* Central content */}
      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Orbiting rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Ring 1 — large outer */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: isDark ? '#818cf8' : '#6366f1',
              borderRightColor: isDark ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)',
              animation: 'loader-spin 2.5s linear infinite',
              boxShadow: isDark
                ? '0 0 30px rgba(129,140,248,0.25), inset 0 0 30px rgba(129,140,248,0.05)'
                : '0 0 20px rgba(99,102,241,0.15)',
            }}
          />
          {/* Ring 2 — medium */}
          <div
            className="absolute rounded-full border-2 border-transparent"
            style={{
              inset: '10px',
              borderBottomColor: isDark ? '#a78bfa' : '#8b5cf6',
              borderLeftColor: isDark ? 'rgba(167,139,250,0.3)' : 'rgba(139,92,246,0.3)',
              animation: 'loader-spin 2s linear infinite reverse',
              boxShadow: isDark
                ? '0 0 25px rgba(167,139,250,0.2), inset 0 0 25px rgba(167,139,250,0.05)'
                : '0 0 15px rgba(139,92,246,0.12)',
            }}
          />
          {/* Ring 3 — small inner */}
          <div
            className="absolute rounded-full border border-transparent"
            style={{
              inset: '22px',
              borderTopColor: isDark ? '#c4b5fd' : '#a78bfa',
              animation: 'loader-spin 1.5s linear infinite',
              boxShadow: isDark
                ? '0 0 20px rgba(196,181,253,0.15)'
                : '0 0 10px rgba(167,139,250,0.1)',
            }}
          />

          {/* Center GIF with glow halo */}
          <div className="relative z-10">
            {/* Pulsing halo */}
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                animation: 'loader-pulse 2s ease-in-out infinite',
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}cxk-dance.gif`}
              alt="加载中"
              className="relative z-10 w-20 h-20 object-contain rounded-xl"
              style={{
                filter: isDark
                  ? 'drop-shadow(0 0 12px rgba(129,140,248,0.5))'
                  : 'drop-shadow(0 0 8px rgba(99,102,241,0.3))',
              }}
            />
          </div>
        </div>

        {/* Animated text */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-base font-semibold tracking-widest"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, #818cf8, #c084fc, #818cf8)'
                : 'linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'loader-shimmer 2s ease-in-out infinite',
            }}
          >
            {message}{dots}
          </span>

          {/* Progress bar */}
          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, #818cf8, #c084fc)'
                  : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                animation: 'loader-progress 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Inline keyframes — no external CSS dependency */}
      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes loader-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes loader-progress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
