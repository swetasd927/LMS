import { useEffect, useState } from "react";
import type { Course } from "../types/course.types";
import { coursesService } from "../types/services/courses.services";



interface UseCoursesFilter {
  instructorId?: string;
}


interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export function useCourses(filter?: UseCoursesFilter): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const instructorId = filter?.instructorId;

  useEffect(() => {
    let cancelled = false;

    const fetchCourses = async () => {
      setLoading(true);

      try {
        const data = await coursesService.getAll(
          instructorId ? {instructorId} : undefined,
        );

        if (!cancelled) {
          setCourses(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load courses. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      cancelled = true;
    };
  }, [instructorId]);

  return {
    courses,
    loading,
    error,
  };
}