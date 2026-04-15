import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useTheme } from "@/lib/theme";

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
];

export function CinematicEnergyBackground() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { resolvedTheme } = useTheme();
  const { scrollYProgress } = useScroll();

  const isDark = resolvedTheme === "dark";
  const coreYOffset = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const haloYOffset = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const lowerTrailYOffset = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const lowerTrailX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ribbonScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 2.5]);

  const staticStyle = prefersReducedMotion
    ? undefined
    : {
        y: coreYOffset,
        scale: ribbonScale,
        rotate: ribbonRotate,
      };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 72% 18%, rgba(140, 58, 14, 0.16), transparent 24%), linear-gradient(180deg, #060507 0%, #080609 48%, #040405 100%)"
            : "radial-gradient(circle at 74% 20%, rgba(131, 48, 14, 0.16), transparent 24%), linear-gradient(180deg, #110d10 0%, #120c0f 52%, #0a090a 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: haloYOffset }}
        className="absolute inset-0"
      >
        <div className="absolute right-[-6vw] top-[-10vh] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(255,198,123,0.2)_0%,rgba(255,122,0,0.14)_28%,rgba(255,82,0,0.04)_54%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[10vw] top-[10vh] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,215,137,0.14)_24%,rgba(255,150,42,0.03)_48%,transparent_68%)] blur-2xl" />
        <div className="absolute bottom-[14vh] right-[16vw] h-[15rem] w-[15rem] rounded-full bg-[radial-gradient(circle,rgba(255,108,0,0.14)_0%,rgba(255,92,0,0.04)_44%,transparent_72%)] blur-[120px]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
        className="absolute inset-0"
      >
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
              boxShadow: `0 0 ${star.size * 6}px rgba(255,165,87,0.22)`,
            }}
          />
        ))}
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={staticStyle}
        viewBox="0 0 1200 1400"
        className="absolute inset-y-[-12%] right-[-6%] h-[124%] w-[74%] min-w-[780px] opacity-[0.98]"
      >
        <defs>
          <linearGradient id="energyWarmA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,250,237,0.95)" />
            <stop offset="18%" stopColor="rgba(255,230,165,0.98)" />
            <stop offset="54%" stopColor="rgba(255,146,27,0.92)" />
            <stop offset="100%" stopColor="rgba(201,33,20,0.88)" />
          </linearGradient>
          <linearGradient id="energyWarmB" x1="0%" x2="100%" y1="10%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,222,149,0.72)" />
            <stop offset="45%" stopColor="rgba(255,105,0,0.84)" />
            <stop offset="100%" stopColor="rgba(216,34,24,0.72)" />
          </linearGradient>
          <linearGradient id="energyWarmC" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,239,210,0.82)" />
            <stop offset="34%" stopColor="rgba(255,174,45,0.78)" />
            <stop offset="100%" stopColor="rgba(173,18,18,0.56)" />
          </linearGradient>
          <filter id="energyBlurHeavy" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="energyBlurSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <g filter="url(#energyBlurHeavy)" opacity="0.48">
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

        <g filter="url(#energyBlurSoft)" opacity="0.92">
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
          <path
            d="M1014 -76C824 66 688 194 674 342C662 454 726 542 842 662C1010 836 1054 1066 946 1308"
            stroke="url(#energyWarmC)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: lowerTrailYOffset, x: lowerTrailX }}
        viewBox="0 0 1400 900"
        className="absolute bottom-[-10%] left-[-8%] h-[62%] w-[88%] min-w-[760px] opacity-[0.88]"
      >
        <defs>
          <linearGradient id="lowerStream" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,197,103,0.82)" />
            <stop offset="42%" stopColor="rgba(255,143,31,0.72)" />
            <stop offset="100%" stopColor="rgba(178,21,14,0.12)" />
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(255,186,84,0.22),transparent_14%),radial-gradient(circle_at_74%_52%,rgba(255,86,22,0.18),transparent_18%),linear-gradient(to_right,rgba(4,4,5,0.985)_0%,rgba(4,4,5,0.92)_30%,rgba(4,4,5,0.62)_46%,rgba(4,4,5,0.18)_60%,rgba(4,4,5,0.42)_100%)]"
      />
    </div>
  );
}
