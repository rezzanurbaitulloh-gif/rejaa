"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";

/**
 * AKUNSTOK Logo — SVG component with optional animation.
 * Usage: <Logo className="w-6 h-6" animated />
 */
interface LogoProps {
  className?: string;
  animated?: boolean;
  fill?: string;
}

export function Logo({ className = "", animated = false, fill = "currentColor" }: LogoProps) {
  const reduce = animated ? false : true; // if animated prop is false, don't animate
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      style={{ fill }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="100%" stopColor="#FF9F1A" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#logoGradient)" opacity="0.15" />
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
      
      {/* A - First letter */}
      <path
        d="M60 28 L48 82 L72 82 Z"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crossbar of A */}
      <path
        d="M52 55 L68 55"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* K - Second letter (stylized) */}
      <g transform="translate(80, 28)">
        <path
          d="M0 0 L0 54 M0 27 L18 0 M0 27 L18 54"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* U - Third letter */}
      <g transform="translate(102, 28)">
        <path
          d="M0 0 L0 40 Q0 54 14 54 L14 54"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M28 0 L28 54"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* N - Fourth letter */}
      <g transform="translate(130, 28)">
        <path
          d="M0 54 L0 0 L18 54 L18 0"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* S - Fifth letter */}
      <g transform="translate(152, 28)">
        <path
          d="M18 0 Q0 0 0 14 Q0 27 18 27 Q18 27 36 27 Q36 27 36 40 Q36 54 18 54 Q0 54 0 40"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* T - Sixth letter */}
      <g transform="translate(180, 28)">
        <path
          d="M0 0 L24 0 M12 0 L12 54"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* O - Seventh letter */}
      <g transform="translate(198, 28)">
        <circle cx="12" cy="27" r="12" stroke="url(#logoGradient)" strokeWidth="3.5" fill="none" />
      </g>
      
      {/* K - Eighth letter */}
      <g transform="translate(218, 28)">
        <path
          d="M0 0 L0 54 M0 27 L18 0 M0 27 L18 54"
          stroke="url(#logoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </motion.svg>
  );
}

/**
 * Simplified wordmark logo - "AKUNSTOK" text with custom styling
 */
export function LogoWordmark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.div
      className={`inline-flex items-center gap-1 ${className}`}
      initial={false}
      animate={shouldAnimate ? { opacity: 1 } : false}
    >
      <span className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF9F1A] bg-clip-text text-transparent tracking-tight">
        AKUNSTOK
      </span>
      <motion.span
        className="w-2 h-2 rounded-full ml-1"
        animate={shouldAnimate ? { scale: [1, 1.3, 1] } : false}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, #FF6A00, #FF9F1A)" }}
      />
    </motion.div>
  );
}

/**
 * Minimal logo mark - just the "A" symbol
 */
export function LogoMark({ className = "", fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg className={`inline-block ${className}`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill }}>
      <circle cx="30" cy="30" r="28" fill="#FF6A00" opacity="0.15" />
      <path
        d="M30 10 L20 50 L40 50 Z"
        fill="none"
        stroke="#FF6A00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 32 L35 32"
        stroke="#FF6A00"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}