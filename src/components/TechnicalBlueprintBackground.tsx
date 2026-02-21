import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { useTheme } from "@/lib/theme";
import { siteOptions } from "@/data/profile";
import { cn } from "@/lib/utils";

type Trace = {
  axis: "horizontal" | "vertical";
  line: number;
  speed: number;
  length: number;
  phase: number;
  width: number;
};

type PulseNode = {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function TechnicalBlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isEnabled = siteOptions.enableBackgroundParticles;

  const palette = useMemo(() => {
    const isDark = resolvedTheme === "dark";
    return {
      washTop: isDark ? "rgba(30, 58, 138, 0.22)" : "rgba(59, 130, 246, 0.2)",
      washBottom: isDark ? "rgba(15, 23, 42, 0.05)" : "rgba(255, 255, 255, 0.03)",
      gridMinor: isDark ? "rgba(148, 163, 184, 0.22)" : "rgba(148, 163, 184, 0.27)",
      gridMajor: isDark ? "rgba(96, 165, 250, 0.25)" : "rgba(59, 130, 246, 0.22)",
      trace: isDark ? "rgba(96, 165, 250, 0.82)" : "rgba(37, 99, 235, 0.78)",
      traceSoft: isDark ? "rgba(125, 211, 252, 0.26)" : "rgba(37, 99, 235, 0.22)",
      pulse: isDark ? "rgba(125, 211, 252, 0.85)" : "rgba(37, 99, 235, 0.72)",
      pulseSoft: isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(59, 130, 246, 0.22)",
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spacing = 64;
    let horizontalLines = 0;
    let verticalLines = 0;
    let traces: Trace[] = [];
    let pulseNodes: PulseNode[] = [];

    const clearAnimation = () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };

    const configureCanvas = () => {
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = Math.max(1, Math.round(parentRect?.width ?? window.innerWidth));
      height = Math.max(1, Math.round(parentRect?.height ?? window.innerHeight));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      spacing = Math.max(52, Math.min(78, Math.round(width / 24)));
      horizontalLines = Math.ceil(height / spacing) + 2;
      verticalLines = Math.ceil(width / spacing) + 2;
    };

    const buildScene = () => {
      const traceCount = Math.max(10, Math.min(20, Math.round((width * height) / 95000)));
      traces = Array.from({ length: traceCount }).map((_, index) => {
        const horizontal = index % 2 === 0;
        const lineCap = horizontal ? horizontalLines : verticalLines;
        return {
          axis: horizontal ? "horizontal" : "vertical",
          line: Math.floor(Math.random() * lineCap),
          speed: randomBetween(0.07, 0.18),
          length: randomBetween(spacing * 1.2, spacing * 2.3),
          phase: randomBetween(0, spacing * 18),
          width: randomBetween(1.15, 1.9),
        };
      });

      const pulseCount = Math.max(8, Math.min(16, Math.round((width * height) / 180000)));
      pulseNodes = Array.from({ length: pulseCount }).map(() => {
        const x = Math.floor(randomBetween(1, verticalLines - 1)) * spacing;
        const y = Math.floor(randomBetween(1, horizontalLines - 1)) * spacing;
        return {
          x,
          y,
          phase: randomBetween(0, Math.PI * 2),
          speed: randomBetween(0.0016, 0.0028),
          size: randomBetween(1.2, 2.1),
        };
      });
    };

    const drawGrid = () => {
      context.lineCap = "round";

      for (let line = 0; line < verticalLines; line += 1) {
        const x = line * spacing;
        context.beginPath();
        context.strokeStyle = line % 4 === 0 ? palette.gridMajor : palette.gridMinor;
        context.lineWidth = line % 4 === 0 ? 0.8 : 0.45;
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let line = 0; line < horizontalLines; line += 1) {
        const y = line * spacing;
        context.beginPath();
        context.strokeStyle = line % 4 === 0 ? palette.gridMajor : palette.gridMinor;
        context.lineWidth = line % 4 === 0 ? 0.8 : 0.45;
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const paintBase = () => {
      context.clearRect(0, 0, width, height);

      const wash = context.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, palette.washTop);
      wash.addColorStop(1, palette.washBottom);
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      drawGrid();
    };

    const drawStatic = () => {
      paintBase();
      context.fillStyle = palette.pulseSoft;

      for (const node of pulseNodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.size + 0.8, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawAnimated = (timestamp: number) => {
      paintBase();

      for (const trace of traces) {
        const progress = timestamp * trace.speed + trace.phase;

        if (trace.axis === "horizontal") {
          const travel = width + trace.length * 2;
          const head = (progress % travel) - trace.length;
          const tail = head - trace.length;
          const y = trace.line * spacing;

          const gradient = context.createLinearGradient(tail, y, head, y);
          gradient.addColorStop(0, "rgba(0,0,0,0)");
          gradient.addColorStop(0.35, palette.traceSoft);
          gradient.addColorStop(0.65, palette.trace);
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          context.beginPath();
          context.strokeStyle = gradient;
          context.lineWidth = trace.width;
          context.moveTo(tail, y);
          context.lineTo(head, y);
          context.stroke();

          if (head > -20 && head < width + 20) {
            context.beginPath();
            context.fillStyle = palette.pulse;
            context.arc(head, y, 1.8, 0, Math.PI * 2);
            context.fill();
          }
        } else {
          const travel = height + trace.length * 2;
          const head = (progress % travel) - trace.length;
          const tail = head - trace.length;
          const x = trace.line * spacing;

          const gradient = context.createLinearGradient(x, tail, x, head);
          gradient.addColorStop(0, "rgba(0,0,0,0)");
          gradient.addColorStop(0.35, palette.traceSoft);
          gradient.addColorStop(0.65, palette.trace);
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          context.beginPath();
          context.strokeStyle = gradient;
          context.lineWidth = trace.width;
          context.moveTo(x, tail);
          context.lineTo(x, head);
          context.stroke();

          if (head > -20 && head < height + 20) {
            context.beginPath();
            context.fillStyle = palette.pulse;
            context.arc(x, head, 1.8, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      for (const node of pulseNodes) {
        const wave = (Math.sin(timestamp * node.speed + node.phase) + 1) / 2;
        const size = node.size + wave * 1.2;
        context.beginPath();
        context.fillStyle = palette.pulseSoft;
        context.arc(node.x, node.y, size + 1.2, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = palette.pulse;
        context.arc(node.x, node.y, size * 0.55, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = window.requestAnimationFrame(drawAnimated);
    };

    const initialize = () => {
      clearAnimation();
      configureCanvas();
      buildScene();
      if (prefersReducedMotion) {
        drawStatic();
      } else {
        animationRef.current = window.requestAnimationFrame(drawAnimated);
      }
    };

    initialize();

    const handleResize = () => initialize();
    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => {
      clearAnimation();
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isEnabled, palette, prefersReducedMotion]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        resolvedTheme === "dark" ? "opacity-70" : "opacity-80",
      )}
    />
  );
}

