import { useMemo, useState } from "react";
import { Select } from "antd";
import CourseCard from "../../components/course/CourseCard";
import { courses } from "../../data/courses.data";

const categories = ["All", ...new Set(courses.map((c) => c.category))];

const Courses = () => {
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "price">(
    "popular"
  );

  const filteredCourses = useMemo(() => {
    let result =
      activeCategory === "All"
        ? [...courses]
        : courses.filter((c) => c.category === activeCategory);

    if (sortBy === "rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      result = result.sort((a, b) => a.price - b.price);
    } else {
      result = result.sort((a, b) => b.studentsCount - a.studentsCount);
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Explore Courses</h1>
      <p className="mb-8 text-gray-500">
        {filteredCourses.length} courses available
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

      <div className="grid gap-6 lg:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;