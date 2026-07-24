import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, PlayCircle, Sparkles } from "lucide-react";
import type { Course } from "../../types/course.types";
import StarRating from "../course/starRating";
import { hoverLiftTransition } from "../../../../animations/variants";

interface RelatedCourseCardProps {
  course: Course;
}

const MotionLink = motion.create(Link);
const SIXTY_DAYS_MS = 1000 * 60 * 60 * 24 * 60;
const NOW_MS = Date.now();

const RelatedCourseCard = ({ course }: RelatedCourseCardProps) => {
  const isNew = useMemo(
    () => new Date(course.createdAt).getTime() > NOW_MS - SIXTY_DAYS_MS,
    [course.createdAt]
  );

  return (
    <MotionLink
      to={`/course/${course.id}`}
      whileHover={{ y: -6 }}
      transition={hoverLiftTransition}
      className="group relative block w-65 shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-200/50 sm:w-68 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
    >
      <div className="relative h-36 w-full overflow-hidden bg-slate-200 dark:bg-gray-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {isNew && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700 shadow-sm">
              <Sparkles size={10} /> New
            </span>
          )}
          {course.bestseller && (
            <span className="rounded-full bg-[#eceb98] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#3d3c0a] shadow-sm">
              Bestseller
            </span>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-lg">
            <PlayCircle size={14} /> View course
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-[#1c1d1f] dark:text-gray-100">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{course.instructor.name}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <span className="text-sm font-bold text-[#b4690e] dark:text-[#e0a24d]">
            {course.rating}
          </span>
          <StarRating rating={course.rating} size={12} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({course.ratingCount.toLocaleString()})
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={12} />
          <span>{course.level}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-[#1c1d1f] dark:text-gray-100">
            Rs. {course.price.toLocaleString()}
          </span>
          {course.originalPrice && (
            <span className="text-xs text-gray-500 line-through dark:text-gray-500">
              Rs. {course.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </MotionLink>
  );
};

export default RelatedCourseCard;