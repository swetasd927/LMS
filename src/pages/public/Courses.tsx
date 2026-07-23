import { useState } from "react";
import { Select } from "antd";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import CourseCard from "../../features/courses/components/course/CourseCard";
import { useCourses } from "../../features/auth/context/courses/hooks/useCourses";

const Courses = () => {
  const { courses, loading, error } = useCourses();

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "price">(
    "popular",
  );

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filteredCourses =
    activeCategory === "All"
      ? [...courses]
      : courses.filter((c) => c.category === activeCategory);

  if (sortBy === "rating") {
    filteredCourses.sort((a, b) => b.rating - a.rating); // desc order 4.8 4.4 4.2
  } else if (sortBy === "price") {
    filteredCourses.sort((a, b) => a.price - b.price); // asc order 300 500 1200
  } else {
    filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Explore Courses</h1>
      <p className="mb-8 text-gray-500">
        {loading
          ? "Loading courses..."
          : `${filteredCourses.length} courses available`}
      </p>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-slate-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Select
          value={sortBy}
          onChange={setSortBy}
          className="w-48"
          options={[
            { value: "popular", label: "Most Popular" },
            { value: "rating", label: "Highest Rated" },
            { value: "price", label: "Price: Low to High" },
          ]}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}`}
            className="grid gap-6 lg:grid-cols-4"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Courses;
