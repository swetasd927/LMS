import { useQuery } from "@tanstack/react-query";
import { coursesService } from "../services/courses.services";
import { courseKeys } from "./queryKeys";

//read single courses through react query
export function useCourse(id: string | undefined) {
  const query = useQuery({
    queryKey: courseKeys.detail(id ?? ""),
    queryFn: () => coursesService.getById(id as string),
    enabled: Boolean(id),
  });

  return {
    course: query.data,
    loading: Boolean(id) && query.isLoading,
    error: query.isError ? "Failed to load this course. Please try again." : null,
  };
}