import CourseCard from "../../components/course/CourseCard";
import BecomeInstructor from "../../components/home/BecomeInstructor";
import Categories from "../../components/home/Categories";
import Hero from "../../components/home/Hero";

const Home = () => {
  return(
    <>
    <Hero />
    <Categories />

    <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-3xl font-bold">
                Featured Courses
            </h2>

            <div className="grid gap-6 md: grid-cols-4">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                
            </div>
        </div>
    </section>

    <BecomeInstructor />
    </>
  )
   
};

export default Home;