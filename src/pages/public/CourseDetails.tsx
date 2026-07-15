import { useParams, Link } from "react-router-dom";
import { Button, Collapse, Rate } from "antd";
import { Users, Clock, Globe } from "lucide-react";
import { getCourseById } from "../../data/courses.data";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : undefined;

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-blue-600">
          Back to all courses
        </Link>
      </div>
    );
  }

  const discount = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {course.bestSeller && (
            <span className="mb-3 inline-block rounded bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
              Bestseller
            </span>
          )}

          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{course.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-amber-600">
                {course.rating}
              </span>
              <Rate disabled allowHalf defaultValue={course.rating} />
              <span className="text-gray-500">
                ({course.ratingCount.toLocaleString()} ratings)
              </span>
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="h-4 w-4" />
              {course.studentsCount.toLocaleString()} students
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Created by{" "}
            <span className="font-medium text-slate-800">
              {course.instructor.name}
            </span>
            {course.instructor.title && ` · ${course.instructor.title}`}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Updated {course.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" /> {course.language}
            </span>
          </div>

          <div className="mt-10 h-96 w-full overflow-hidden rounded-xl bg-slate-200">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">What you'll learn</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {course.whatYouWillLearn.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="text-green-600">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">Course content</h2>
            <Collapse
              items={course.curriculum.map((section, i) => ({
                key: i,
                label: section.title,
                children: (
                  <p className="text-sm text-gray-500">
                    {section.lectures} lectures · {section.duration}
                  </p>
                ),
              }))}
            />
          </section>
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border p-6 shadow-sm">
            <div className="mb-6 h-48 overflow-hidden rounded-lg bg-slate-200">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold">
                Rs. {course.price.toLocaleString()}
              </h2>
              {course.originalPrice && (
                <span className="text-gray-400 line-through">
                  Rs. {course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {discount && (
              <p className="mt-1 text-sm font-medium text-green-600">
                {discount}% off — limited time
              </p>
            )}

            <Button type="primary" size="large" className="mt-6 w-full">
              Enroll Now
            </Button>
            <Button size="large" className="mt-3 w-full">
              Add to Cart
            </Button>

            <p className="mt-4 text-center text-xs text-gray-500">
              30-Day Money-Back Guarantee · Full Lifetime Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;