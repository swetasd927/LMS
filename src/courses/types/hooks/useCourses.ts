import { useQuery } from "@tanstack/react-query";
import { coursesService } from "../../infrastructure/courses.services";
import { courseKeys } from "./queryKeys";

interface CourseFilters {
  instructorId?: string;
  status?: string;
}
//read courses through react query
export function useCourses(filters?: CourseFilters) {
  const query = useQuery({
    queryKey: courseKeys.list(filters ?? {}),
    queryFn: () => coursesService.getAll(filters),
  });

  return {
    courses: query.data ?? [],
    loading: query.isLoading,
    error: query.isError ? "Failed to load courses. Please try again." : null,
  };
}