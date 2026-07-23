import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "../../shared/useCountUp";

interface StatPillProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatPill = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  delay = 0,
}: StatPillProps) => {
  const count = useCountUp(value, 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="flex min-w-38 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-lg shadow-black/10 backdrop-blur-xl"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums text-white">
          {count}
          {suffix}
        </p>
        <p className="text-xs font-medium text-white/60">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatPill;
