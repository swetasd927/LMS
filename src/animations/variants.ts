import type { Variants } from "framer-motion";

// fade and slide up: headings, hero text, single elements
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

//fade in: scale: banners.callouts, eg: become instructor
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

//fade and slide in from right: use for drawer/panel list item

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

//wrap grid list
export const staggerContainer = (
  staggerChildren = 0.06,
  delayChildren = 0.1,
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

//spring used for hover lifts on cards
export const hoverLiftTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 22,
};
