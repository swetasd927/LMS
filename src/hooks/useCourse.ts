import { useEffect, useState } from "react";
import type { Course } from "../types/course.types";
import { coursesService } from "../services/courses.services";

interface UseCourseResult {
  course: Course | undefined;
  loading: boolean;
  error: string | null;
}

export function useCourse(
  id: string | undefined
): UseCourseResult {
  const [course, setCourse] = useState<Course | undefined>();
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let ignore = false;

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await coursesService.getById(id);

        if (!ignore) {
          setCourse(data);
        }
      } catch {
        if (!ignore) {
          setError(
            "Failed to load this course. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCourse();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (!id) {
    return {
      course: undefined,
      loading: false,
      error: null,
    };
  }

  return {
    course,
    loading,
    error,
  };
}