import React, { useEffect, useRef } from 'react';

interface CosmicParticlesCanvasProps {
  variant?: 'hero' | 'reveal' | 'ambient';
}

export const HeartParticlesCanvas: React.FC<CosmicParticlesCanvasProps> = ({ variant = 'hero' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = variant === 'reveal' ? 60 : 35;
    const particles: Array<{
      x: number;
      y: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulse: number;
    }> = [];

    const colors = ['#D6A85C', '#FFFFFF', '#E2B76F'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -0.15 - Math.random() * 0.25,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      // Render Light Peripheral Stardust (Keeping Center Unobstructed)
      particles.forEach((p) => {
        p.y += p.vy;
        p.pulse += 0.01;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        // Keep center vertical 50% area clean
        const distFromCenter = Math.abs(p.y - height * 0.5);
        if (distFromCenter < height * 0.25 && Math.abs(p.x - width * 0.5) < width * 0.3) {
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[2] pointer-events-none"
    />
  );
};
