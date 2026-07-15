import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";
import type { Course } from "../../types/course.types";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const discount = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : null;

  return (
    <Link
      to={`/course/${course.id}`}
      className="block overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden bg-slate-200">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        {course.bestSeller && (
          <span className="absolute left-2 top-2 rounded bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
            Bestseller
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{course.instructor.name}</p>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="font-bold text-amber-600">{course.rating}</span>
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-gray-500">
            ({course.ratingCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Users className="h-3.5 w-3.5" />
          {course.studentsCount.toLocaleString()} students
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-bold">Rs. {course.price.toLocaleString()}</span>
          {course.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                Rs. {course.originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-green-600">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;