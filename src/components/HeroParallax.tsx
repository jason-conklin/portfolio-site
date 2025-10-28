import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type HeroParallaxProps = {
  children: React.ReactNode;
  intensity?: number;
};

export function HeroParallax({ children, intensity = 1 }: HeroParallaxProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [-4 * intensity, 4 * intensity],
  );

  useEffect(() => {
    if (reduced) return;
    const element = containerRef.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    element.addEventListener("mousemove", handleMouseMove);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reduced, mouseX, mouseY]);

  const maxDesktop = 8 * intensity;
  const maxMobile = 4 * intensity;

  const maxOffset = useMemo(() => {
    if (typeof window === "undefined") return maxDesktop;
    return window.innerWidth < 640 ? maxMobile : maxDesktop;
  }, [maxDesktop, maxMobile]);

  const mouseXpx = useTransform(mouseX, [-1, 1], [-maxOffset, maxOffset]);
  const mouseYpx = useTransform(mouseY, [-1, 1], [-maxOffset, maxOffset]);

  const translateX = useSpring(mouseXpx, { stiffness: 120, damping: 20 });
  const translateYMouse = useSpring(mouseYpx, { stiffness: 120, damping: 20 });
  const translateYScroll = useSpring(scrollOffset, {
    stiffness: 120,
    damping: 20,
  });

  const finalY =
    reduced
      ? translateYScroll
      : useTransform([translateYMouse, translateYScroll], (values) => {
          const [mouse, scroll] = values as number[];
          return mouse + scroll;
        });

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{
          x: reduced ? 0 : translateX,
          y: reduced ? translateYScroll : finalY,
        }}
        className="pointer-events-none will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
