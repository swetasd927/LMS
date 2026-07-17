import { useEffect, useState } from "react";
import type { Course } from "../types/course.types";
import { coursesService } from "../services/courses.services";

interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCourses = async () => {
      try {
        const data = await coursesService.getAll();

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
  }, []);

  return {
    courses,
    loading,
    error,
  };
}