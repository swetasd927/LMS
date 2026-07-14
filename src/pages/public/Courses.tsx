import CourseCard from "../../components/course/CourseCard";

const Courses = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Explore Courses
      </h1>

      <div className="grid gap-6 lg:grid-cols-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default Courses;