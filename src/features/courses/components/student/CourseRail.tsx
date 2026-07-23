import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { Course } from "../../../auth/context/courses/types/course.types";
import { fadeInUp, staggerContainer } from "../../../../animations/variants";
import RelatedCourseCard from "./RelatedCourseCard";

interface CourseRailProps {
  title: string;
  subtitle?: string;
  courses: Course[];
}

const railVariants = staggerContainer(0.06, 0.05);

const CourseRail = ({ title, subtitle, courses }: CourseRailProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  if (courses.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1c1d1f] sm:text-2xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/courses"
            className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800 sm:flex"
          >
            Browse all <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-indigo-400 hover:text-indigo-600 sm:flex"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-indigo-400 hover:text-indigo-600 sm:flex"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <motion.div
        ref={scrollerRef}
        variants={railVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {courses.map((course) => (
          <motion.div key={course.id} variants={fadeInUp}>
            <RelatedCourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      <Link
        to="/courses"
        className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-indigo-600 sm:hidden"
      >
        Browse all courses <ArrowRight size={14} />
      </Link>
    </section>
  );
};

export default CourseRail;
