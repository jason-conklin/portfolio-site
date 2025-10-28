import { useEffect, useMemo, useRef, useState } from "react";

import { useTheme } from "@/lib/theme";
import { siteOptions } from "@/data/profile";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const { resolvedTheme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const isEnabled = siteOptions.enableBackgroundParticles;

  const palette = useMemo(() => {
    const isDark = resolvedTheme === "dark";
    return {
      // Tweak these to retheme the network glow per brand.
      node: isDark ? "rgba(255, 255, 255, 0.99)" : "rgba(167, 167, 167, 0.9)",
      lineRgb: isDark ? "255, 255, 255" : "180, 180, 180",
      lineBaseAlpha: isDark ? 0.82 : 0.52,
      background: isDark ? "rgba(15, 23, 42, 0.34)" : "rgba(226, 232, 240, 0.32)",
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!isEnabled) return;
    if (typeof window === "undefined") return;

    // Respect OS/browser reduced motion preferences and skip animation if set.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handlePreferenceChange();
    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let devicePixelRatio = window.devicePixelRatio || 1;

    const baseDensity = siteOptions.particleDensity; // Adjust in profile.ts (0.3 - 1.0)
    const maxLineDistance = siteOptions.lineDistance; // Adjust in profile.ts to link further nodes
    const speed = siteOptions.motionSpeed; // Adjust in profile.ts to control velocity

    const clearAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const setCanvasSize = () => {
      const { innerWidth } = window;
      devicePixelRatio = window.devicePixelRatio || 1;
      const doc = document.documentElement;
      const body = document.body;
      const targetWidth = Math.max(
        innerWidth,
        doc?.scrollWidth ?? 0,
        body?.scrollWidth ?? 0,
      );
      const targetHeight = Math.max(
        window.innerHeight,
        doc?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
      );
      width = targetWidth;
      height = targetHeight;

      canvas.width = targetWidth * devicePixelRatio;
      canvas.height = targetHeight * devicePixelRatio;
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${targetHeight}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(devicePixelRatio, devicePixelRatio);
    };

    const createParticles = () => {
      const area = width * height;
      const densityFactor = Math.max(0.3, Math.min(1, baseDensity));
      const estimatedCount = Math.min(
        140,
        Math.max(28, Math.round((area / 20000) * densityFactor)),
      );
      particles = Array.from({ length: estimatedCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };

    const drawParticles = () => {
      context.clearRect(0, 0, width, height);

      // Gentle gradient wash to keep canvas subtle
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, palette.background);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.lineWidth = 0.6;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        context.beginPath();
        context.fillStyle = palette.node;
        context.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2);
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const target = particles[j];
          const dx = particle.x - target.x;
          const dy = particle.y - target.y;
          const distance = Math.hypot(dx, dy);

          if (distance <= maxLineDistance) {
            const opacity = 1 - distance / maxLineDistance;
            const alpha = Math.min(0.85, palette.lineBaseAlpha * (opacity * 2));
            context.beginPath();
            context.strokeStyle = `rgba(${palette.lineRgb}, ${alpha.toFixed(3)})`;
            context.moveTo(particle.x, particle.y);
            context.lineTo(target.x, target.y);
            context.stroke();
          }
        }
      }
    };

    // Static fallback so the background still feels intentional when motion is reduced.
    const drawStaticGrid = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, palette.background);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const gridSize = Math.max(80, Math.min(140, Math.round(width / 12)));
      context.lineWidth = 0.5;
      context.strokeStyle = `rgba(${palette.lineRgb}, ${palette.lineBaseAlpha})`;
      context.fillStyle = palette.node;

      for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          context.beginPath();
          context.arc(x, y, 1.2, 0, Math.PI * 2);
          context.fill();

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(Math.min(x + gridSize, width), y);
          context.stroke();

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x, Math.min(y + gridSize, height));
          context.stroke();
        }
      }
    };

    const animate = () => {
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const initialize = () => {
      clearAnimation();
      setCanvasSize();
      createParticles();
      if (prefersReducedMotion) {
        drawStaticGrid();
      } else {
        animate();
      }
    };

    initialize();

    const handleResize = () => {
      clearAnimation();
      initialize();
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(document.documentElement);
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      clearAnimation();
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [palette, prefersReducedMotion, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  const blendModeClass =
    resolvedTheme === "dark" ? "mix-blend-overlay opacity-60" : "mix-blend-multiply opacity-80";

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full transition-opacity duration-500",
        blendModeClass,
      )}
    />
  );
}
