import CourseCard from "../../components/course/CourseCard";
import BecomeInstructor from "../../components/home/BecomeInstructor";
import Categories from "../../components/home/Categories";
import Hero from "../../components/home/Hero";
import { useCourses } from "../../hooks/useCourses";

const Home = () => {
  const { courses, loading, error } = useCourses();

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
            <div className="grid gap-6 md:grid-cols-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BecomeInstructor />
    </>
  );
};

export default Home;