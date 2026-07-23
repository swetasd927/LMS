import CourseCard from "../../features/courses/components/course/CourseCard";
import BecomeInstructor from "../../components/home/BecomeInstructor";
import Categories from "../../components/home/Categories";
import Hero from "../../components/home/Hero";
import { useCourses } from "../../features/auth/context/courses/hooks/useCourses";
import { motion, type Variants } from "framer-motion";

const Home = () => {
  const { courses, loading, error } = useCourses();

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <>
      <Hero />
      <Categories />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-3xl font-bold">Featured Courses</h2>

          {loading && (
            <div className="grid gap-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-lg bg-gray-100"
                />
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && !error && (
            <motion.div
              className="grid gap-6 md:grid-cols-4"
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <BecomeInstructor />
    </>
  );
};

export default Home;
