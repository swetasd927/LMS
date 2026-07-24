import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  PlayCircle,
} from "lucide-react";

import type { MyLearningItem } from "../../types/course.types";
import { hoverLiftTransition } from "../../../../animations/variants";

interface ProgressRingProps {
  percent: number;
  size?: number;
}

const ProgressRing = ({ percent, size = 52 }: ProgressRingProps) => {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-white/25"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">
        {percent}%
      </span>
    </div>
  );
};

interface ContinueLearningCardProps {
  item: MyLearningItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleLecture: (lectureId: string) => void;
  togglingLectureId: string | null;
}

const ContinueLearningCard = ({
  item,
  isExpanded,
  onToggleExpand,
  onToggleLecture,
  togglingLectureId,
}: ContinueLearningCardProps) => {
  const [openDayIndex, setOpenDayIndex] = useState(0);

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={hoverLiftTransition}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-200/60 transition-shadow hover:shadow-xl hover:shadow-indigo-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
    >
      {/* Thumbnail + gradient progress overlay */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-200 dark:bg-gray-800">
        <img
          src={item.course.thumbnail}
          alt={item.course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="pr-2">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">
              {item.course.category}
            </p>
            <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">
              {item.course.title}
            </h3>
          </div>
          <ProgressRing percent={item.progressPercent} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.course.instructor.name}</p>

        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              {item.completedCount}/{item.totalLectures} lectures
            </span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {item.progressPercent === 100 ? "Completed" : "In progress"}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.progressPercent}%` }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="h-full rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleExpand}
            className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-300 transition-transform active:scale-95"
          >
            <PlayCircle size={14} />
            {isExpanded ? "Hide lectures" : "Continue learning"}
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <Link
            to={`/course/${item.course.id}`}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
          >
            Course details
          </Link>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="lectures"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
                {item.course.days.map((day, dayIndex) => {
                  const dayOpen = openDayIndex === dayIndex;
                  return (
                    <div key={day.id} className="mb-1.5 last:mb-0">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDayIndex(dayOpen ? -1 : dayIndex)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>
                          Day {day.dayNumber}: {day.title}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                            dayOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {dayOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden pl-1"
                          >
                            {day.lectures.map((lecture) => {
                              const isDone =
                                item.completedLectureIds.includes(lecture.id);
                              const isSaving =
                                togglingLectureId === lecture.id;

                              return (
                                <li key={lecture.id}>
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() =>
                                      onToggleLecture(lecture.id)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                  >
                                    {isDone ? (
                                      <CheckCircle2
                                        size={16}
                                        className="shrink-0 text-emerald-600 dark:text-emerald-500"
                                      />
                                    ) : (
                                      <Circle
                                        size={16}
                                        className="shrink-0 text-gray-300 dark:text-gray-600"
                                      />
                                    )}
                                    <span
                                      className={
                                        isDone
                                          ? "text-gray-400 line-through dark:text-gray-500"
                                          : ""
                                      }
                                    >
                                      {lecture.title}
                                    </span>
                                    <span className="ml-auto shrink-0 text-xs text-gray-400">
                                      {lecture.duration}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContinueLearningCard;