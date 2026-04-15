import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useTheme } from "@/lib/theme";

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
            ? "radial-gradient(circle at 22% 18%, rgba(107, 44, 16, 0.18), transparent 34%), linear-gradient(180deg, #070608 0%, #08070a 46%, #050507 100%)"
            : "radial-gradient(circle at 18% 14%, rgba(131, 48, 14, 0.12), transparent 30%), linear-gradient(180deg, #110d10 0%, #120c0f 52%, #0a090a 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: haloYOffset }}
        className="absolute inset-0"
      >
        <div className="absolute right-[-10vw] top-[-8vh] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,196,112,0.24)_0%,rgba(255,143,31,0.16)_26%,rgba(255,111,0,0.04)_52%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[6vw] top-[14vh] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,212,133,0.18)_18%,rgba(255,150,42,0.06)_40%,transparent_66%)] blur-2xl" />
        <div className="absolute bottom-[10vh] right-[18vw] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,140,0,0.18)_0%,rgba(255,92,0,0.08)_36%,transparent_68%)] blur-[110px]" />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={staticStyle}
        viewBox="0 0 1200 1400"
        className="absolute inset-y-[-12%] right-[-14%] h-[124%] w-[78%] min-w-[760px] opacity-95 [mask-image:linear-gradient(to_left,black_68%,black_48%,transparent_0%)]"
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
            d="M1120 -120C890 120 766 346 822 588C866 772 1000 930 1036 1130C1066 1296 988 1456 830 1606"
            stroke="url(#energyWarmA)"
            strokeWidth="78"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1030 -96C818 120 706 340 752 566C792 754 916 920 952 1120C984 1290 926 1458 796 1602"
            stroke="url(#energyWarmB)"
            strokeWidth="54"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        <g filter="url(#energyBlurSoft)" opacity="0.92">
          <path
            d="M1148 -132C904 122 780 354 838 600C882 782 1022 936 1058 1142C1086 1302 1000 1462 834 1618"
            stroke="url(#energyWarmA)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1074 -114C846 116 724 344 778 584C822 770 944 922 978 1128C1006 1292 938 1454 798 1602"
            stroke="url(#energyWarmB)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1008 -88C804 118 704 332 754 550C798 736 900 896 928 1098C950 1250 900 1398 790 1534"
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
        className="absolute bottom-[-8%] left-[-8%] h-[62%] w-[82%] min-w-[760px] opacity-80"
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
            d="M-120 700C160 580 350 548 604 586C770 612 938 662 1184 642C1288 634 1374 606 1480 546"
            stroke="url(#lowerStream)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M-180 760C124 648 322 618 566 654C766 682 930 736 1188 714C1298 704 1402 668 1512 598"
            stroke="url(#lowerStream)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </g>
      </motion.svg>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,175,77,0.18),transparent_16%),radial-gradient(circle_at_74%_58%,rgba(255,94,0,0.14),transparent_18%),linear-gradient(to_right,rgba(4,4,5,0.96)_0%,rgba(4,4,5,0.82)_24%,rgba(4,4,5,0.44)_44%,rgba(4,4,5,0.2)_58%,rgba(4,4,5,0.4)_100%)]"
      />
    </div>
  );
}
