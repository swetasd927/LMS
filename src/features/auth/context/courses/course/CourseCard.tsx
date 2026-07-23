import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Course } from "../../../../../courses/types/course.types";
import StarRating from "./starRating";
import { fadeInUp, hoverLiftTransition } from "../../../../../animations/variants";

interface CourseCardProps {
  course: Course;
}

const MotionLink = motion.create(Link);

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <MotionLink
      to={`/course/${course.id}`}
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={hoverLiftTransition}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="h-40 w-full overflow-hidden bg-slate-200">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#1c1d1f]">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-gray-600">{course.instructor.name}</p>

        <div className="mt-1 flex items-center gap-1">
          <span className="text-sm font-bold text-[#b4690e]">
            {course.rating}
          </span>
          <StarRating rating={course.rating} size={12} />
          <span className="text-xs text-gray-500">
            ({course.ratingCount.toLocaleString()})
          </span>
        </div>

        {course.bestseller && (
          <span className="mt-1.5 inline-block bg-[#eceb98] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#3d3c0a]">
            Bestseller
          </span>
        )}

        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-base font-bold text-[#1c1d1f]">
            Rs. {course.price.toLocaleString()}
          </span>
          {course.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {course.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </MotionLink>
  );
};

export default CourseCard;