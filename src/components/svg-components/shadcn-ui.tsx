"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const YourAppVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 0.2,
    scale: 1,
  },
};

const YourAppTransition = {
  duration: 0.2,
  type: "spring",
  damping: 20,
  bounce: 0.1,
  mass: 2,
};

interface ShadCnUIProps {
  className?: string;
  circleText?: string;
  triangleText?: string;
  diamondText?: string;
  animatedText?: string;
  animatedBoxText?: string;
  hintText?: string;
  appName?: string;
  showPersonIcon?: boolean;
}

export default function ShadCnUI({
  className,
  animatedBoxText = "Sidebar",
  animatedText = "npx shadcn add",
  appName = "Your App",
  circleText = "Registry",
  diamondText = "Registry",
  hintText = "(components.json)",
  triangleText = "AI",
  showPersonIcon = false,
}: ShadCnUIProps) {
  return (
    <div className={cn("relative text-muted", className)}>
      {/* SVG */}
      <svg width="100%" height="100%" viewBox="0 0 200 100">
        <defs>
          <mask id="shadn-mask1">
            <path
              d="M 35 14 h 25 q 5 0 5 5 v 23 q 0 5 5 5 h 15"
              strokeWidth="1"
              stroke="white"
            />
          </mask>
          <mask id="shadn-mask2">
            <path d="M 30 50 h 52" strokeWidth="1" stroke="white" />
          </mask>
          <mask id="shadn-mask3">
            <path
              d="M 36.3 87 h 24 q 5 0 5 -5 v -24 q 0 -5 5 -5 h 15"
              strokeWidth="1"
              stroke="white"
            />
          </mask>
          <radialGradient id="shadcn-white-grad" fx="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Paths */}
        <g
          stroke="white"
          fill="none"
          strokeWidth="0.5"
          strokeDasharray="100 100"
          pathLength="100"
          strokeOpacity="0.3"
        >
          <path d="M 35 14 h 25 q 5 0 5 5 v 23 q 0 5 5 5 h 15" />
          <path d="M 30 50 h 52" />
          <path d="M 36.3 87 h 24 q 5 0 5 -5 v -24 q 0 -5 5 -5 h 15" />
          <path d="M 160 36 h -10 q -5 0 -5 5 v 4 q 0 5 -5 5 h -20" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
            begin="1.2s"
          />
          <animate
            attributeName="stroke-opacity"
            dur="0.2s"
            from="0"
            to="0.3"
            fill="freeze"
            begin="1.2s"
          />
        </g>
        {/* Left-Hand Shapes */}
        <g stroke="#4d4d4d" strokeWidth="0.3" fill="none">
          {/* Registry Circle */}
          <circle
            cx="23"
            cy="14"
            r="14"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.25"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <text
            x="23"
            y="14"
            textAnchor="middle"
            dy=".3em"
            fontSize="4.5"
            fontWeight="400"
            fill="white"
            opacity="0.9"
          >
            {circleText}
          </text>
          {/* AI Trinangle */}
          <path
            d="M 23 40 l 17 22 h -34 z"
            strokeDasharray="2 3"
            opacity="0.25"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <text
            x="21"
            y="54"
            textAnchor="middle"
            dy=".3em"
            fontSize="5"
            fontWeight="400"
            fill="white"
            opacity="0.9"
          >
            {triangleText}
          </text>
          <path
            transform="scale(0.25)"
            opacity={0.7}
            d="M130 260 a6 6 0 0 1-6 6 6 6 0 0 1 6 6 6 6 0 0 1 6-6 6 6 0 0 1-6-6m7.5 11a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1-2.5-2.5"
            fill="#9ca3af"
            strokeWidth="1"
          />
          {/* Registry Polygon */}
          <path
            d="M 23 73 l 16 16 l -16 16 l -16 -16 z"
            strokeDasharray="2 3"
            opacity="0.25"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <text
            x="23"
            y="87"
            textAnchor="middle"
            dy=".3em"
            fontSize="4.5"
            stroke="#ffffff"
            fill="white"
            opacity="0.9"
            fontWeight="400"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {diamondText}
          </text>
        </g>
        {/* Right-Hand Shapes */}
        <g stroke="currentColor" strokeWidth="0.3" fill="none">
          <motion.rect
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 0.4 },
            }}
            initial="hidden"
            animate="visible"
            transition={YourAppTransition}
            x="160"
            y="29.5"
            width="16"
            height="16"
            rx="3"
            strokeOpacity="0.9"
            stroke="white"
            strokeDasharray="2 2"
            filter="url(#glow)"
          />
          <motion.rect
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 0.4 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.3 }}
            x="178"
            y="29.5"
            width="16"
            height="16"
            rx="3"
            fill="#131313"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <motion.rect
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 0.4 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.6 }}
            x="160"
            y="48.5"
            width="16"
            height="16"
            rx="3"
            fill="#131313"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <motion.rect
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 0.4 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 0.9 }}
            x="178"
            y="48.5"
            width="16"
            height="16"
            rx="3"
            fill="#131313"
            strokeOpacity="0.9"
            stroke="white"
            filter="url(#glow)"
          />
          <motion.text
            variants={{
              ...YourAppVariants,
              visible: { ...YourAppVariants.visible, opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ ...YourAppTransition, delay: 1.5 }}
            x="175"
            y="70"
            textAnchor="middle"
            dy=".3em"
            fontSize="4.5"
            fill="white"
            opacity="0.9"
            fontWeight="300"
            filter="url(#glow)"
          >
            {appName}
          </motion.text>
        </g>
        {/* Animated Lights */}
        <g mask="url(#shadn-mask1)">
          <circle
            className="shadcn shadcn-line-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#shadcn-white-grad)"
            filter="url(#glow-strong)"
          />
        </g>
        <g mask="url(#shadn-mask2)">
          <circle
            className="shadcn shadcn-line-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#shadcn-white-grad)"
            filter="url(#glow-strong)"
          />
        </g>
        <g mask="url(#shadn-mask3)">
          <circle
            className="shadcn shadcn-line-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#shadcn-white-grad)"
            filter="url(#glow-strong)"
          />
        </g>
        {/* Animated - Comp Box */}
        <g
          className="compBox"
          stroke="white"
          strokeWidth="0.3"
          style={{
            transform: "translateX(0px) translateY(-0.5px)",
            transformOrigin: "7px 7px",
          }}
          filter="url(#glow)"
        >
          <rect width="16" height="16" rx="3" fill="#131313" stroke="#ffffff" strokeOpacity="0.6" />
          <text
            x="8"
            y="6"
            textAnchor="middle"
            fontSize="3.5"
            stroke="#ffffff"
            fill="white"
            opacity="0.9"
            fontWeight="300"
          >
            {"</>"}
          </text>
          <text
            x="8"
            y="15"
            textAnchor="middle"
            fontSize="3"
            stroke="#ffffff"
            fill="white"
            opacity="0.9"
            fontWeight="300"
            style={{
              transformOrigin: "8px 12.5px",
              rotate: "180deg",
            }}
          >
            {animatedBoxText}
          </text>
        </g>
      </svg>
      {/* Shadcn Box */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Shadcn TextBox */}
        <div className="relative flex justify-center rounded-md px-7 py-3 text-base">
          <p className="absolute -bottom-6 text-xs font-medium text-gray-400">{hintText}</p>
          {showPersonIcon ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Profile" 
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <span className="text-white text-lg">{animatedText}</span>
          )}
        </div>
      </div>
    </div>
  );
} 