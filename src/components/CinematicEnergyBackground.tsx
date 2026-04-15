import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const STAR_POINTS = [
  { left: "53%", top: "8%", size: 1.2, opacity: 0.18 },
  { left: "62%", top: "12%", size: 1.6, opacity: 0.34 },
  { left: "68%", top: "18%", size: 1.4, opacity: 0.24 },
  { left: "73%", top: "28%", size: 1.8, opacity: 0.32 },
  { left: "81%", top: "14%", size: 1.5, opacity: 0.24 },
  { left: "84%", top: "24%", size: 2.1, opacity: 0.36 },
  { left: "77%", top: "37%", size: 1.3, opacity: 0.22 },
  { left: "70%", top: "46%", size: 1.7, opacity: 0.28 },
  { left: "58%", top: "56%", size: 1.4, opacity: 0.18 },
  { left: "64%", top: "63%", size: 1.2, opacity: 0.2 },
  { left: "80%", top: "61%", size: 1.8, opacity: 0.26 },
  { left: "86%", top: "66%", size: 2.2, opacity: 0.34 },
  { left: "73%", top: "74%", size: 1.4, opacity: 0.22 },
  { left: "60%", top: "82%", size: 1.2, opacity: 0.18 },
  { left: "45%", top: "72%", size: 1.2, opacity: 0.12 },
  { left: "35%", top: "78%", size: 1.3, opacity: 0.12 },
] as const;

function useCombinedMotionValue(
  values: MotionValue<number>[],
  transform: (latest: number[]) => number,
) {
  return useTransform(values, transform);
}

export function CinematicEnergyBackground() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();

  const idlePhase = useMotionValue(0);
  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;
    idlePhase.set(time);
  });

  const smoothedScroll = useSpring(scrollYProgress, {
    stiffness: 56,
    damping: 20,
    mass: 0.55,
  });

  const idleGlowY = useTransform(idlePhase, (time) => Math.sin(time / 7200) * 12);
  const idleGlowX = useTransform(idlePhase, (time) => Math.sin(time / 10300) * 7);
  const idleGlowScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 11800) * 0.02);
  const idleGlowOpacity = useTransform(
    idlePhase,
    (time) => 0.86 + ((Math.sin(time / 6800) + 1) / 2) * 0.08,
  );
  const scrollGlowY = useTransform(smoothedScroll, [0, 1], [0, 96]);
  const scrollGlowX = useTransform(smoothedScroll, [0, 1], [0, -16]);

  const glowY = useCombinedMotionValue([idleGlowY, scrollGlowY], ([idle, scroll]) => idle + scroll);
  const glowX = useCombinedMotionValue([idleGlowX, scrollGlowX], ([idle, scroll]) => idle + scroll);

  const idleRibbonY = useTransform(idlePhase, (time) => Math.sin(time / 7600) * 14);
  const idleRibbonX = useTransform(idlePhase, (time) => Math.sin(time / 9800) * 6);
  const idleRibbonScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 12600) * 0.022);
  const idleRibbonRotate = useTransform(idlePhase, (time) => Math.sin(time / 15200) * 1.1);
  const idleRibbonOpacity = useTransform(
    idlePhase,
    (time) => 0.92 + ((Math.sin(time / 6400) + 1) / 2) * 0.06,
  );
  const scrollRibbonY = useTransform(smoothedScroll, [0, 1], [0, 122]);
  const scrollRibbonX = useTransform(smoothedScroll, [0, 1], [0, -26]);
  const scrollRibbonRotate = useTransform(smoothedScroll, [0, 1], [-1.3, 2.4]);

  const ribbonY = useCombinedMotionValue(
    [idleRibbonY, scrollRibbonY],
    ([idle, scroll]) => idle + scroll,
  );
  const ribbonX = useCombinedMotionValue(
    [idleRibbonX, scrollRibbonX],
    ([idle, scroll]) => idle + scroll,
  );
  const ribbonRotate = useCombinedMotionValue(
    [idleRibbonRotate, scrollRibbonRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleCoreY = useTransform(idlePhase, (time) => Math.sin(time / 6800) * 9);
  const idleCoreX = useTransform(idlePhase, (time) => Math.sin(time / 9100) * 4);
  const idleCoreScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 9300) * 0.014);
  const idleCoreOpacity = useTransform(
    idlePhase,
    (time) => 0.9 + ((Math.sin(time / 5200) + 1) / 2) * 0.1,
  );
  const scrollCoreY = useTransform(smoothedScroll, [0, 1], [0, 78]);
  const scrollCoreX = useTransform(smoothedScroll, [0, 1], [0, -12]);

  const coreY = useCombinedMotionValue([idleCoreY, scrollCoreY], ([idle, scroll]) => idle + scroll);
  const coreX = useCombinedMotionValue([idleCoreX, scrollCoreX], ([idle, scroll]) => idle + scroll);

  const idleLowerY = useTransform(idlePhase, (time) => Math.sin(time / 8600) * 10);
  const idleLowerX = useTransform(idlePhase, (time) => Math.sin(time / 11200) * 12);
  const idleLowerOpacity = useTransform(
    idlePhase,
    (time) => 0.8 + ((Math.sin(time / 7000) + 1) / 2) * 0.08,
  );
  const scrollLowerY = useTransform(smoothedScroll, [0, 1], [0, 180]);
  const scrollLowerX = useTransform(smoothedScroll, [0, 1], [0, -90]);

  const lowerY = useCombinedMotionValue([idleLowerY, scrollLowerY], ([idle, scroll]) => idle + scroll);
  const lowerX = useCombinedMotionValue([idleLowerX, scrollLowerX], ([idle, scroll]) => idle + scroll);

  const idleDustY = useTransform(idlePhase, (time) => Math.sin(time / 9400) * 8);
  const idleDustX = useTransform(idlePhase, (time) => Math.sin(time / 14700) * 5);
  const idleDustOpacity = useTransform(
    idlePhase,
    (time) => 0.62 + ((Math.sin(time / 5800) + 1) / 2) * 0.08,
  );
  const scrollDustY = useTransform(smoothedScroll, [0, 1], [0, 124]);

  const dustY = useCombinedMotionValue([idleDustY, scrollDustY], ([idle, scroll]) => idle + scroll);

  const glowStyle = prefersReducedMotion
    ? undefined
    : {
        x: glowX,
        y: glowY,
        scale: idleGlowScale,
        opacity: idleGlowOpacity,
      };

  const ribbonStyle = prefersReducedMotion
    ? undefined
    : {
        x: ribbonX,
        y: ribbonY,
        scale: idleRibbonScale,
        rotate: ribbonRotate,
        opacity: idleRibbonOpacity,
      };

  const coreStyle = prefersReducedMotion
    ? undefined
    : {
        x: coreX,
        y: coreY,
        scale: idleCoreScale,
        opacity: idleCoreOpacity,
      };

  const lowerStyle = prefersReducedMotion
    ? undefined
    : {
        x: lowerX,
        y: lowerY,
        opacity: idleLowerOpacity,
      };

  const dustStyle = prefersReducedMotion
    ? undefined
    : {
        x: idleDustX,
        y: dustY,
        opacity: idleDustOpacity,
      };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "var(--cinematic-ribbon-stage-bg)",
        }}
      />

      <motion.div aria-hidden="true" style={glowStyle} className="absolute inset-0">
        <div
          className="absolute right-[-6vw] top-[-10vh] h-[46rem] w-[46rem] rounded-full blur-3xl"
          style={{ background: "var(--cinematic-ribbon-glow-outer)" }}
        />
        <div
          className="absolute right-[10vw] top-[10vh] h-[20rem] w-[20rem] rounded-full blur-2xl"
          style={{ background: "var(--cinematic-ribbon-glow-mid)" }}
        />
        <div
          className="absolute bottom-[14vh] right-[16vw] h-[15rem] w-[15rem] rounded-full blur-[120px]"
          style={{ background: "var(--cinematic-ribbon-glow-low)" }}
        />
      </motion.div>

      <motion.div aria-hidden="true" style={dustStyle} className="absolute inset-0">
        {STAR_POINTS.map((star) => (
          <span
            key={`${star.left}-${star.top}`}
            className="absolute rounded-full bg-[rgba(255,196,128,0.95)] blur-[0.35px]"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              backgroundColor: "var(--cinematic-ribbon-star)",
              boxShadow: `0 0 ${star.size * 6}px var(--cinematic-ribbon-star-shadow)`,
            }}
          />
        ))}
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={ribbonStyle}
        viewBox="0 0 1200 1400"
        className="absolute inset-y-[-12%] right-[-6%] h-[124%] w-[74%] min-w-[780px] opacity-[0.98]"
      >
        <defs>
          <linearGradient id="energyWarmA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-a1)" }} />
            <stop offset="18%" style={{ stopColor: "var(--cinematic-ribbon-stop-a2)" }} />
            <stop offset="54%" style={{ stopColor: "var(--cinematic-ribbon-stop-a3)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-a4)" }} />
          </linearGradient>
          <linearGradient id="energyWarmB" x1="0%" x2="100%" y1="10%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-b1)" }} />
            <stop offset="45%" style={{ stopColor: "var(--cinematic-ribbon-stop-b2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-b3)" }} />
          </linearGradient>
          <filter id="energyBlurHeavy" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="energyBlurSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <g filter="url(#energyBlurHeavy)" opacity="0.5">
          <path
            d="M1148 -120C928 42 744 184 724 360C708 496 788 584 934 716C1120 884 1152 1122 988 1438"
            stroke="url(#energyWarmA)"
            strokeWidth="78"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1050 -88C862 62 706 198 688 360C674 488 752 572 886 694C1054 850 1086 1070 958 1360"
            stroke="url(#energyWarmB)"
            strokeWidth="54"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        <g filter="url(#energyBlurSoft)" opacity="0.94">
          <path
            d="M1162 -124C938 44 756 192 736 370C722 502 806 592 952 728C1128 892 1160 1128 992 1448"
            stroke="url(#energyWarmA)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1088 -104C878 56 714 196 696 356C682 478 760 566 898 694C1068 852 1104 1082 968 1378"
            stroke="url(#energyWarmB)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        style={coreStyle}
        viewBox="0 0 1200 1400"
        className="absolute inset-y-[-12%] right-[-6%] h-[124%] w-[74%] min-w-[780px] opacity-[0.95]"
      >
        <defs>
          <linearGradient id="energyCoreA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-core-a1)" }} />
            <stop offset="16%" style={{ stopColor: "var(--cinematic-ribbon-core-a2)" }} />
            <stop offset="52%" style={{ stopColor: "var(--cinematic-ribbon-core-a3)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-core-a4)" }} />
          </linearGradient>
          <linearGradient id="energyCoreB" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-core-b1)" }} />
            <stop offset="46%" style={{ stopColor: "var(--cinematic-ribbon-core-b2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-core-b3)" }} />
          </linearGradient>
          <filter id="energyCoreGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <g filter="url(#energyCoreGlow)" opacity="0.9">
          <path
            d="M1122 -114C914 52 752 196 734 364C720 486 804 582 946 716C1112 876 1144 1114 1002 1408"
            stroke="url(#energyCoreA)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1048 -92C856 64 712 200 694 352C682 470 758 560 888 682C1048 838 1084 1068 968 1326"
            stroke="url(#energyCoreB)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M999 -68C824 66 694 194 682 342C670 452 732 538 846 658C1004 828 1042 1054 946 1268"
            stroke="url(#energyCoreB)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.82"
          />
        </g>
      </motion.svg>

      <motion.div aria-hidden="true" style={coreStyle} className="absolute inset-0">
        <div
          className="absolute right-[11vw] top-[12vh] h-[11rem] w-[11rem] rounded-full blur-[60px]"
          style={{ background: "var(--cinematic-ribbon-core-halo)" }}
        />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={lowerStyle}
        viewBox="0 0 1400 900"
        className="absolute bottom-[-10%] left-[-8%] h-[62%] w-[88%] min-w-[760px] opacity-[0.88]"
      >
        <defs>
          <linearGradient id="lowerStream" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-lower-a1)" }} />
            <stop offset="42%" style={{ stopColor: "var(--cinematic-ribbon-lower-a2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-lower-a3)" }} />
          </linearGradient>
          <filter id="lowerGlow" x="-30%" y="-30%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <g filter="url(#lowerGlow)">
          <path
            d="M-120 742C186 598 392 556 612 560C786 562 958 586 1174 542C1296 516 1396 466 1516 362"
            stroke="url(#lowerStream)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
            opacity="0.74"
          />
          <path
            d="M-180 806C124 678 334 636 560 642C760 646 940 680 1208 632C1324 612 1418 566 1538 470"
            stroke="url(#lowerStream)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.54"
          />
        </g>
      </motion.svg>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--cinematic-ribbon-mask)" }}
      />
    </div>
  );
}
