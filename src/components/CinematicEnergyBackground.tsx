import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Transition,
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

const RIBBON_FRAME_CLASS =
  "absolute inset-y-[-14%] right-[-8%] h-[128%] w-[76%] min-w-[780px] max-w-[1180px]";
const BACK_RIBBON_PATH =
  "M1162 -150C972 8 810 174 776 366C748 516 804 634 924 804C1064 998 1098 1212 970 1512";
const MID_RIBBON_PATH =
  "M1094 -116C904 38 754 190 728 362C706 500 760 614 874 776C1008 966 1044 1176 950 1440";
const FRONT_RIBBON_PATH =
  "M1128 -124C930 28 774 184 748 364C726 508 782 622 902 790C1044 982 1072 1192 964 1470";
const INNER_RIBBON_PATH =
  "M1064 -96C878 54 736 198 716 358C700 486 756 594 864 752C996 934 1030 1148 952 1400";
const STRAND_RIBBON_PATH_A =
  "M1098 -108C914 44 772 194 752 362C736 492 790 598 902 766C1038 952 1070 1168 978 1422";
const STRAND_RIBBON_PATH_B =
  "M1038 -82C862 64 730 202 712 352C696 470 748 570 848 720C972 900 1012 1112 950 1322";
const STRAND_RIBBON_PATH_C =
  "M998 -58C834 74 710 206 698 342C684 452 728 548 820 684C944 864 990 1070 944 1248";

const SWEEP_TRANSITION_A: Transition = {
  duration: 18.6,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
  times: [0, 0.32, 0.68, 1],
};

const SWEEP_TRANSITION_B: Transition = {
  duration: 16.8,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
  times: [0, 0.28, 0.62, 1],
};

const STRAND_TRANSITION_A: Transition = {
  duration: 14.8,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
  times: [0, 0.34, 0.74, 1],
};

const STRAND_TRANSITION_B: Transition = {
  duration: 17.2,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut",
  times: [0, 0.3, 0.64, 1],
};

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
    stiffness: 54,
    damping: 24,
    mass: 0.72,
  });

  const idleHazeY = useTransform(idlePhase, (time) => Math.sin(time / 12400) * 22);
  const idleHazeX = useTransform(idlePhase, (time) => Math.sin(time / 15100) * 14);
  const idleHazeScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 16400) * 0.04);
  const idleHazeRotate = useTransform(idlePhase, (time) => Math.sin(time / 21400) * 1.8);
  const idleHazeOpacity = useTransform(
    idlePhase,
    (time) => 0.8 + ((Math.sin(time / 7600) + 1) / 2) * 0.12,
  );
  const scrollHazeY = useTransform(smoothedScroll, [0, 1], [0, 58]);
  const scrollHazeX = useTransform(smoothedScroll, [0, 1], [0, -10]);
  const scrollHazeRotate = useTransform(smoothedScroll, [0, 1], [-0.6, 1]);

  const hazeY = useCombinedMotionValue([idleHazeY, scrollHazeY], ([idle, scroll]) => idle + scroll);
  const hazeX = useCombinedMotionValue([idleHazeX, scrollHazeX], ([idle, scroll]) => idle + scroll);
  const hazeRotate = useCombinedMotionValue(
    [idleHazeRotate, scrollHazeRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleBackY = useTransform(idlePhase, (time) => Math.sin(time / 9800) * 22);
  const idleBackX = useTransform(idlePhase, (time) => Math.sin(time / 13600) * 14);
  const idleBackScaleX = useTransform(idlePhase, (time) => 1 + Math.sin(time / 14800) * 0.055);
  const idleBackScaleY = useTransform(idlePhase, (time) => 1 + Math.sin(time / 17200 + 0.8) * 0.046);
  const idleBackRotate = useTransform(idlePhase, (time) => Math.sin(time / 18600) * 3.2);
  const idleBackOpacity = useTransform(
    idlePhase,
    (time) => 0.42 + ((Math.sin(time / 7200) + 1) / 2) * 0.16,
  );
  const scrollBackY = useTransform(smoothedScroll, [0, 1], [0, 78]);
  const scrollBackX = useTransform(smoothedScroll, [0, 1], [0, -18]);
  const scrollBackRotate = useTransform(smoothedScroll, [0, 1], [-1.2, 1.7]);

  const backY = useCombinedMotionValue([idleBackY, scrollBackY], ([idle, scroll]) => idle + scroll);
  const backX = useCombinedMotionValue([idleBackX, scrollBackX], ([idle, scroll]) => idle + scroll);
  const backRotate = useCombinedMotionValue(
    [idleBackRotate, scrollBackRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleFoldY = useTransform(idlePhase, (time) => Math.sin(time / 9100 + 1.2) * 18);
  const idleFoldX = useTransform(idlePhase, (time) => Math.sin(time / 11800 + 0.6) * -12);
  const idleFoldScaleX = useTransform(idlePhase, (time) => 1 + Math.sin(time / 12600 + 1.1) * 0.065);
  const idleFoldScaleY = useTransform(idlePhase, (time) => 1 + Math.sin(time / 16200 + 0.35) * 0.05);
  const idleFoldRotate = useTransform(idlePhase, (time) => Math.sin(time / 13200 + 1.4) * 4.1);
  const idleFoldOpacity = useTransform(
    idlePhase,
    (time) => 0.54 + ((Math.sin(time / 6800 + 0.7) + 1) / 2) * 0.14,
  );
  const scrollFoldY = useTransform(smoothedScroll, [0, 1], [0, 56]);
  const scrollFoldX = useTransform(smoothedScroll, [0, 1], [0, -8]);
  const scrollFoldRotate = useTransform(smoothedScroll, [0, 1], [0.9, -1.4]);

  const foldY = useCombinedMotionValue([idleFoldY, scrollFoldY], ([idle, scroll]) => idle + scroll);
  const foldX = useCombinedMotionValue([idleFoldX, scrollFoldX], ([idle, scroll]) => idle + scroll);
  const foldRotate = useCombinedMotionValue(
    [idleFoldRotate, scrollFoldRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleBodyY = useTransform(idlePhase, (time) => Math.sin(time / 10200 + 0.35) * 17);
  const idleBodyX = useTransform(idlePhase, (time) => Math.sin(time / 14200) * 10);
  const idleBodyScaleX = useTransform(idlePhase, (time) => 1 + Math.sin(time / 15800 + 0.4) * 0.045);
  const idleBodyScaleY = useTransform(idlePhase, (time) => 1 + Math.sin(time / 17600 + 0.9) * 0.03);
  const idleBodyRotate = useTransform(idlePhase, (time) => Math.sin(time / 16800 + 0.6) * 2.2);
  const idleBodyOpacity = useTransform(
    idlePhase,
    (time) => 0.84 + ((Math.sin(time / 7600 + 0.4) + 1) / 2) * 0.1,
  );
  const scrollBodyY = useTransform(smoothedScroll, [0, 1], [0, 62]);
  const scrollBodyX = useTransform(smoothedScroll, [0, 1], [0, -12]);
  const scrollBodyRotate = useTransform(smoothedScroll, [0, 1], [-0.7, 1.1]);

  const bodyY = useCombinedMotionValue([idleBodyY, scrollBodyY], ([idle, scroll]) => idle + scroll);
  const bodyX = useCombinedMotionValue([idleBodyX, scrollBodyX], ([idle, scroll]) => idle + scroll);
  const bodyRotate = useCombinedMotionValue(
    [idleBodyRotate, scrollBodyRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleEdgeY = useTransform(idlePhase, (time) => Math.sin(time / 8400 + 0.9) * 14);
  const idleEdgeX = useTransform(idlePhase, (time) => Math.sin(time / 12200 + 0.2) * 11);
  const idleEdgeScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 11300 + 1.1) * 0.05);
  const idleEdgeRotate = useTransform(idlePhase, (time) => Math.sin(time / 12800 + 1.35) * 3.5);
  const idleEdgeOpacity = useTransform(
    idlePhase,
    (time) => 0.46 + ((Math.sin(time / 5600 + 0.5) + 1) / 2) * 0.18,
  );
  const scrollEdgeY = useTransform(smoothedScroll, [0, 1], [0, 44]);
  const scrollEdgeX = useTransform(smoothedScroll, [0, 1], [0, -7]);
  const scrollEdgeRotate = useTransform(smoothedScroll, [0, 1], [-0.4, 0.8]);

  const edgeY = useCombinedMotionValue([idleEdgeY, scrollEdgeY], ([idle, scroll]) => idle + scroll);
  const edgeX = useCombinedMotionValue([idleEdgeX, scrollEdgeX], ([idle, scroll]) => idle + scroll);
  const edgeRotate = useCombinedMotionValue(
    [idleEdgeRotate, scrollEdgeRotate],
    ([idle, scroll]) => idle + scroll,
  );

  const idleCoreY = useTransform(idlePhase, (time) => Math.sin(time / 7600 + 0.3) * 12);
  const idleCoreX = useTransform(idlePhase, (time) => Math.sin(time / 10800 + 0.9) * 7);
  const idleCoreScaleX = useTransform(idlePhase, (time) => 1 + Math.sin(time / 13400 + 0.25) * 0.03);
  const idleCoreScaleY = useTransform(idlePhase, (time) => 1 + Math.sin(time / 14800 + 1.1) * 0.024);
  const idleCoreRotate = useTransform(idlePhase, (time) => Math.sin(time / 14600 + 0.75) * 1.9);
  const idleCoreOpacity = useTransform(
    idlePhase,
    (time) => 0.76 + ((Math.sin(time / 5200 + 0.2) + 1) / 2) * 0.16,
  );
  const scrollCoreY = useTransform(smoothedScroll, [0, 1], [0, 38]);
  const scrollCoreX = useTransform(smoothedScroll, [0, 1], [0, -6]);

  const coreY = useCombinedMotionValue([idleCoreY, scrollCoreY], ([idle, scroll]) => idle + scroll);
  const coreX = useCombinedMotionValue([idleCoreX, scrollCoreX], ([idle, scroll]) => idle + scroll);

  const idleHotspotY = useTransform(idlePhase, (time) => Math.sin(time / 9300 + 1.2) * 24);
  const idleHotspotX = useTransform(idlePhase, (time) => Math.sin(time / 12600 + 0.6) * 16);
  const idleHotspotScale = useTransform(idlePhase, (time) => 1 + Math.sin(time / 10900 + 0.5) * 0.07);
  const idleHotspotRotate = useTransform(idlePhase, (time) => Math.sin(time / 17400 + 0.9) * 2.4);
  const idleHotspotOpacity = useTransform(
    idlePhase,
    (time) => 0.5 + ((Math.sin(time / 6100 + 0.4) + 1) / 2) * 0.18,
  );
  const scrollHotspotY = useTransform(smoothedScroll, [0, 1], [0, 52]);
  const scrollHotspotX = useTransform(smoothedScroll, [0, 1], [0, -10]);

  const hotspotY = useCombinedMotionValue(
    [idleHotspotY, scrollHotspotY],
    ([idle, scroll]) => idle + scroll,
  );
  const hotspotX = useCombinedMotionValue(
    [idleHotspotX, scrollHotspotX],
    ([idle, scroll]) => idle + scroll,
  );

  const idleLowerY = useTransform(idlePhase, (time) => Math.sin(time / 8600) * 9);
  const idleLowerX = useTransform(idlePhase, (time) => Math.sin(time / 11200 + 0.4) * 10);
  const idleLowerOpacity = useTransform(
    idlePhase,
    (time) => 0.76 + ((Math.sin(time / 7000 + 0.4) + 1) / 2) * 0.08,
  );
  const scrollLowerY = useTransform(smoothedScroll, [0, 1], [0, 118]);
  const scrollLowerX = useTransform(smoothedScroll, [0, 1], [0, -52]);

  const lowerY = useCombinedMotionValue([idleLowerY, scrollLowerY], ([idle, scroll]) => idle + scroll);
  const lowerX = useCombinedMotionValue([idleLowerX, scrollLowerX], ([idle, scroll]) => idle + scroll);

  const idleDustY = useTransform(idlePhase, (time) => Math.sin(time / 9400) * 8);
  const idleDustX = useTransform(idlePhase, (time) => Math.sin(time / 14700) * 5);
  const idleDustOpacity = useTransform(
    idlePhase,
    (time) => 0.58 + ((Math.sin(time / 5800) + 1) / 2) * 0.08,
  );
  const scrollDustY = useTransform(smoothedScroll, [0, 1], [0, 108]);

  const dustY = useCombinedMotionValue([idleDustY, scrollDustY], ([idle, scroll]) => idle + scroll);

  const hazeStyle = prefersReducedMotion
    ? undefined
    : {
        x: hazeX,
        y: hazeY,
        rotate: hazeRotate,
        scale: idleHazeScale,
        opacity: idleHazeOpacity,
        transformOrigin: "76% 32%",
      };

  const backRibbonStyle = prefersReducedMotion
    ? undefined
    : {
        x: backX,
        y: backY,
        rotate: backRotate,
        scaleX: idleBackScaleX,
        scaleY: idleBackScaleY,
        opacity: idleBackOpacity,
        transformOrigin: "78% 36%",
      };

  const foldStyle = prefersReducedMotion
    ? undefined
    : {
        x: foldX,
        y: foldY,
        rotate: foldRotate,
        scaleX: idleFoldScaleX,
        scaleY: idleFoldScaleY,
        opacity: idleFoldOpacity,
        transformOrigin: "80% 36%",
      };

  const bodyRibbonStyle = prefersReducedMotion
    ? undefined
    : {
        x: bodyX,
        y: bodyY,
        rotate: bodyRotate,
        scaleX: idleBodyScaleX,
        scaleY: idleBodyScaleY,
        opacity: idleBodyOpacity,
        transformOrigin: "78% 36%",
      };

  const edgeStyle = prefersReducedMotion
    ? undefined
    : {
        x: edgeX,
        y: edgeY,
        rotate: edgeRotate,
        scale: idleEdgeScale,
        opacity: idleEdgeOpacity,
        transformOrigin: "80% 36%",
      };

  const coreStyle = prefersReducedMotion
    ? undefined
    : {
        x: coreX,
        y: coreY,
        rotate: idleCoreRotate,
        scaleX: idleCoreScaleX,
        scaleY: idleCoreScaleY,
        opacity: idleCoreOpacity,
        transformOrigin: "78% 36%",
      };

  const hotspotStyle = prefersReducedMotion
    ? undefined
    : {
        x: hotspotX,
        y: hotspotY,
        rotate: idleHotspotRotate,
        scale: idleHotspotScale,
        opacity: idleHotspotOpacity,
        transformOrigin: "78% 34%",
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

      <motion.div aria-hidden="true" style={hazeStyle} className="absolute inset-0">
        <div
          className="absolute right-[-10vw] top-[-14vh] h-[54rem] w-[34rem] rounded-full blur-[165px]"
          style={{ background: "var(--cinematic-ribbon-glow-outer)" }}
        />
        <div
          className="absolute right-[8vw] top-[2vh] h-[48rem] w-[16rem] rounded-full blur-[122px]"
          style={{ background: "var(--cinematic-ribbon-glow-mid)" }}
        />
        <div
          className="absolute right-[6vw] top-[34vh] h-[26rem] w-[18rem] rounded-full blur-[118px]"
          style={{ background: "var(--cinematic-ribbon-glow-low)" }}
        />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={backRibbonStyle}
        viewBox="0 0 1200 1500"
        className={`${RIBBON_FRAME_CLASS} opacity-[0.72]`}
      >
        <defs>
          <linearGradient id="energyBackA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-a1)" }} />
            <stop offset="22%" style={{ stopColor: "var(--cinematic-ribbon-stop-a2)" }} />
            <stop offset="58%" style={{ stopColor: "var(--cinematic-ribbon-stop-a3)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-a4)" }} />
          </linearGradient>
          <linearGradient id="energyBackB" x1="0%" x2="100%" y1="4%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-b1)" }} />
            <stop offset="48%" style={{ stopColor: "var(--cinematic-ribbon-stop-b2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-b3)" }} />
          </linearGradient>
          <filter id="energyBackBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>

        <g filter="url(#energyBackBlur)" opacity="0.78">
          <path
            d={BACK_RIBBON_PATH}
            stroke="url(#energyBackA)"
            strokeWidth="112"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={MID_RIBBON_PATH}
            stroke="url(#energyBackB)"
            strokeWidth="78"
            strokeLinecap="round"
            fill="none"
            opacity="0.82"
          />
        </g>
      </motion.svg>

      <motion.div aria-hidden="true" style={foldStyle} className="absolute inset-0">
        <div
          className="absolute right-[14vw] top-[4vh] h-[24rem] w-[11rem] rounded-full blur-[76px]"
          style={{
            background: "var(--cinematic-ribbon-fold-top)",
            transform: "rotate(16deg)",
          }}
        />
        <div
          className="absolute right-[17vw] top-[34vh] h-[30rem] w-[12rem] rounded-full blur-[88px]"
          style={{
            background: "var(--cinematic-ribbon-fold-mid)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="absolute bottom-[5vh] right-[10vw] h-[24rem] w-[10rem] rounded-full blur-[82px]"
          style={{
            background: "var(--cinematic-ribbon-fold-low)",
            transform: "rotate(14deg)",
          }}
        />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={bodyRibbonStyle}
        viewBox="0 0 1200 1500"
        className={`${RIBBON_FRAME_CLASS} opacity-[0.94]`}
      >
        <defs>
          <linearGradient id="energyBodyA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-a1)" }} />
            <stop offset="18%" style={{ stopColor: "var(--cinematic-ribbon-stop-a2)" }} />
            <stop offset="54%" style={{ stopColor: "var(--cinematic-ribbon-stop-a3)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-a4)" }} />
          </linearGradient>
          <linearGradient id="energyBodyB" x1="0%" x2="100%" y1="10%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-stop-b1)" }} />
            <stop offset="46%" style={{ stopColor: "var(--cinematic-ribbon-stop-b2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-stop-b3)" }} />
          </linearGradient>
          <linearGradient id="energyBodySweepA" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="16%" style={{ stopColor: "var(--cinematic-ribbon-core-a1)" }} />
            <stop offset="38%" style={{ stopColor: "var(--cinematic-ribbon-core-a2)" }} />
            <stop offset="64%" style={{ stopColor: "var(--cinematic-ribbon-stop-a3)" }} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="energyBodySweepB" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="24%" style={{ stopColor: "var(--cinematic-ribbon-stop-b1)" }} />
            <stop offset="46%" style={{ stopColor: "var(--cinematic-ribbon-stop-a2)" }} />
            <stop offset="72%" style={{ stopColor: "var(--cinematic-ribbon-core-a3)" }} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="energyBodyShadowSweep" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="26%" style={{ stopColor: "var(--cinematic-ribbon-core-b3)" }} />
            <stop offset="58%" style={{ stopColor: "var(--cinematic-ribbon-stop-a4)" }} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <filter id="energyBodyBlur" x="-34%" y="-34%" width="168%" height="168%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="energySweepBlur" x="-44%" y="-44%" width="188%" height="188%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <mask id="energyBodyMask">
            <path
              d={FRONT_RIBBON_PATH}
              stroke="white"
              strokeWidth="56"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={INNER_RIBBON_PATH}
              stroke="white"
              strokeWidth="34"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={STRAND_RIBBON_PATH_A}
              stroke="white"
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
            />
          </mask>
        </defs>

        <g filter="url(#energyBodyBlur)">
          <path
            d={FRONT_RIBBON_PATH}
            stroke="url(#energyBodyA)"
            strokeWidth="52"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={INNER_RIBBON_PATH}
            stroke="url(#energyBodyB)"
            strokeWidth="30"
            strokeLinecap="round"
            fill="none"
            opacity="0.92"
          />
          <path
            d={STRAND_RIBBON_PATH_A}
            stroke="url(#energyBodyB)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.64"
          />
        </g>

        <motion.rect
          mask="url(#energyBodyMask)"
          x={790}
          y={-270}
          width={198}
          height={1900}
          rx={132}
          fill="url(#energyBodySweepA)"
          filter="url(#energySweepBlur)"
          opacity={0.4}
          transform="rotate(10 888 520)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [790, 834, 812, 790],
                  y: [-270, -214, -184, -270],
                  opacity: [0.34, 0.68, 0.44, 0.34],
                }
          }
          transition={SWEEP_TRANSITION_A}
        />
        <motion.rect
          mask="url(#energyBodyMask)"
          x={842}
          y={-210}
          width={156}
          height={1840}
          rx={118}
          fill="url(#energyBodySweepB)"
          filter="url(#energySweepBlur)"
          opacity={0.28}
          transform="rotate(-8 920 540)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [842, 804, 858, 842],
                  y: [-210, -162, -132, -210],
                  opacity: [0.22, 0.5, 0.28, 0.22],
                }
          }
          transition={SWEEP_TRANSITION_B}
        />
        <motion.rect
          mask="url(#energyBodyMask)"
          x={858}
          y={-250}
          width={152}
          height={1880}
          rx={124}
          fill="url(#energyBodyShadowSweep)"
          filter="url(#energySweepBlur)"
          opacity={0.2}
          transform="rotate(-12 930 520)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [858, 824, 874, 858],
                  y: [-250, -202, -170, -250],
                  opacity: [0.16, 0.3, 0.18, 0.16],
                }
          }
          transition={{
            duration: 20.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        />
      </motion.svg>

      <motion.div aria-hidden="true" style={edgeStyle} className="absolute inset-0">
        <div
          className="absolute right-[11vw] top-[12vh] h-[18rem] w-[4rem] rounded-full blur-[26px]"
          style={{
            background: "var(--cinematic-ribbon-sheen-top)",
            transform: "rotate(18deg)",
          }}
        />
        <div
          className="absolute right-[15vw] top-[42vh] h-[20rem] w-[3.5rem] rounded-full blur-[24px]"
          style={{
            background: "var(--cinematic-ribbon-sheen-mid)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="absolute bottom-[10vh] right-[9vw] h-[16rem] w-[4.25rem] rounded-full blur-[24px]"
          style={{
            background: "var(--cinematic-ribbon-sheen-low)",
            transform: "rotate(14deg)",
          }}
        />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        style={coreStyle}
        viewBox="0 0 1200 1500"
        className={`${RIBBON_FRAME_CLASS} opacity-[0.96]`}
      >
        <defs>
          <linearGradient id="energyCoreA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-core-a1)" }} />
            <stop offset="18%" style={{ stopColor: "var(--cinematic-ribbon-core-a2)" }} />
            <stop offset="54%" style={{ stopColor: "var(--cinematic-ribbon-core-a3)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-core-a4)" }} />
          </linearGradient>
          <linearGradient id="energyCoreB" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--cinematic-ribbon-core-b1)" }} />
            <stop offset="44%" style={{ stopColor: "var(--cinematic-ribbon-core-b2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--cinematic-ribbon-core-b3)" }} />
          </linearGradient>
          <filter id="energyCoreGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5.5" />
          </filter>
        </defs>

        <motion.g
          filter="url(#energyCoreGlow)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 16, -8, 0],
                  y: [0, -12, 10, 0],
                  rotate: [0, 1.2, -0.7, 0],
                  opacity: [0.76, 1, 0.84, 0.76],
                }
          }
          transition={STRAND_TRANSITION_A}
        >
          <path
            d={STRAND_RIBBON_PATH_A}
            stroke="url(#energyCoreA)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
        <motion.g
          filter="url(#energyCoreGlow)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, -14, 10, 0],
                  y: [0, 10, -12, 0],
                  rotate: [0, -1.4, 0.8, 0],
                  opacity: [0.7, 0.94, 0.78, 0.7],
                }
          }
          transition={STRAND_TRANSITION_B}
        >
          <path
            d={STRAND_RIBBON_PATH_B}
            stroke="url(#energyCoreB)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d={STRAND_RIBBON_PATH_C}
            stroke="url(#energyCoreB)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.76"
          />
        </motion.g>
      </motion.svg>

      <motion.div aria-hidden="true" style={hotspotStyle} className="absolute inset-0">
        <div
          className="absolute right-[10vw] top-[13vh] h-[12rem] w-[12rem] rounded-full blur-[62px]"
          style={{ background: "var(--cinematic-ribbon-core-halo)" }}
        />
        <div
          className="absolute right-[16vw] top-[45vh] h-[11rem] w-[11rem] rounded-full blur-[58px]"
          style={{ background: "var(--cinematic-ribbon-hotspot-mid)" }}
        />
        <div
          className="absolute bottom-[11vh] right-[11vw] h-[10rem] w-[10rem] rounded-full blur-[52px]"
          style={{ background: "var(--cinematic-ribbon-hotspot-low)" }}
        />
      </motion.div>

      <motion.div aria-hidden="true" style={dustStyle} className="absolute inset-0">
        {STAR_POINTS.map((star) => (
          <span
            key={`${star.left}-${star.top}`}
            className="absolute rounded-full blur-[0.35px]"
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
        style={lowerStyle}
        viewBox="0 0 1400 900"
        className="absolute bottom-[-12%] left-[-8%] h-[58%] w-[88%] min-w-[760px] opacity-[0.78]"
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
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.62"
          />
          <path
            d="M-180 806C124 678 334 636 560 642C760 646 940 680 1208 632C1324 612 1418 566 1538 470"
            stroke="url(#lowerStream)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
            opacity="0.42"
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
