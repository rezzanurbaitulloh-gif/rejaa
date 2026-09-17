"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";

interface SocialIconProps {
  className?: string;
  size?: number;
  fill?: string;
  animated?: boolean;
}

/**
 * Instagram logo
 */
export function InstagramIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15, rotate: 6, transition: { duration: 0.3 } } : undefined}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </motion.svg>
  );
}

/**
 * Behance logo
 */
export function BehanceIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15 } : undefined}
    >
      <path
        d="M20.42 19.88c0 2.17-1.47 3.37-3.53 3.37-1.59 0-2.91-.79-3.93-1.77h1.64c.72.75 1.64 1.43 2.72 1.43 1.6 0 2.78-1.09 2.78-2.77v-2.76h-1.67v6.01h-3.21v-6h-3.2v6h-3.2v-9.44h3.2v4.26h1.54v-2.44c0-1.27.76-1.96 1.84-1.96 1.23 0 2.04.86 2.04 2.09v3.7h-3.21v3.52h3.11zM7.11 19.88h3.19v-9.44h-3.19v9.44zm6.31-11.64c2.2 0 3.69-1.53 3.69-3.56 0-2.2-1.58-3.56-3.77-3.56-2.19 0-3.69 1.5-3.69 3.56 0 2.06 1.5 3.56 3.69 3.56z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * LinkedIn logo
 */
export function LinkedinIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15 } : undefined}
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.455C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * Email/Mail icon
 */
export function EmailIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15, y: -2 } : undefined}
    >
      <path
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v12z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * GitHub icon (bonus)
 */
export function GithubIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15 } : undefined}
    >
      <path
        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.804 2.807 1.28 3.492.98.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.793.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * Twitter/X icon
 */
export function TwitterIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15, rotate: -6 } : undefined}
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-7.32L.44 21.75h7.75l4.23-6.33 5.68 7.32H21.55l-7.227-8.26L.77 2.25h7.472z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * Dribbble icon
 */
export function DribbbleIcon({ className = "", size = 20, fill = "currentColor", animated = false }: SocialIconProps) {
  const reduce = animated ? false : true;
  const shouldAnimate = animated && !reduce;

  return (
    <motion.svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
      transition={springs.bouncy}
      whileHover={shouldAnimate ? { scale: 1.15, rotate: 180 } : undefined}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1.25-5.75c0 1.83-.58 3.22-1.57 4.31-1.2.09-2.51-.12-3.44-.55-.93-.43-1.87-.97-2.85-1.6-.98-.63-1.9-1.37-2.75-2.18.54-.78 1.08-1.51 1.59-2.21.5-.71.9-1.55 1.3-2.54.38-.99.66-2.04.8-3.15.13-1.05-.09-2.07-.46-2.99-.37-.92-.9-1.73-1.56-2.41-.66-.69-1.46-1.22-2.42-1.56-1.07-.34-2.26-.49-3.57-.49-1.56 0-2.92.28-4.07.76-.03.1-.05.2-.05.31v.03c0 1.8.66 3.45 1.7 4.68 1.25 1.46 3.05 2.35 5.1 2.35 2.32 0 4.27-1.17 5.2-2.67.12-.19.24-.37.36-.56.17-.27.34-.52.51-.76.16-.24.33-.46.5-.66z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/**
 * Map of platform names to icon components
 */
export const SocialIcons = {
  instagram: InstagramIcon,
  behance: BehanceIcon,
  linkedin: LinkedinIcon,
  email: EmailIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  dribbble: DribbbleIcon,
} as const;

/**
 * Get icon component by platform name (case-insensitive)
 */
export function getSocialIcon(platform: string) {
  const key = platform.toLowerCase().replace(/\s+/g, '');
  return SocialIcons[key as keyof typeof SocialIcons] || null;
}