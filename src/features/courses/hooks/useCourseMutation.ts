import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "../infrastructure/courses.services.ts";

import { courseKeys } from "./queryKeys.ts";
import type { 
  CreateCourseInput, CreateDayInput, CreateLectureInput,
  UpdateCourseInput, UpdateDayInput, UpdateLectureInput 
} from "../types/course.types.ts";

export function useCourseMutations() {
  const qc = useQueryClient();
  
  const invalidateCourse = (id: string) => {
    qc.invalidateQueries({ queryKey: courseKeys.detail(id) });
    qc.invalidateQueries({ queryKey: courseKeys.lists() });
  };

  const createCourse = useMutation({
    mutationFn: (payload: CreateCourseInput) => coursesService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: courseKeys.lists() }),
  });

  const updateCourse = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCourseInput }) =>
      coursesService.update(id, payload),
    onSuccess: (_d, { id }) => invalidateCourse(id),
  });

  const removeCourse = useMutation({
    mutationFn: (id: string) => coursesService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: courseKeys.lists() }),
  });

  const addDay = useMutation({
    mutationFn: ({ courseId, payload }: { courseId: string; payload: CreateDayInput }) =>
      coursesService.addDay(courseId, payload),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  const updateDay = useMutation({
    mutationFn: ({ courseId, dayId, payload }: { courseId: string; dayId: string; payload: UpdateDayInput }) =>
      coursesService.updateDay(courseId, dayId, payload),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  const removeDay = useMutation({
    mutationFn: ({ courseId, dayId }: { courseId: string; dayId: string }) =>
      coursesService.removeDay(courseId, dayId),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  const addLecture = useMutation({
    mutationFn: ({ courseId, dayId, payload }: { courseId: string; dayId: string; payload: CreateLectureInput }) =>
      coursesService.addLecture(courseId, dayId, payload),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  const updateLecture = useMutation({
    mutationFn: ({ courseId, dayId, lectureId, payload }: { courseId: string; dayId: string; lectureId: string; payload: UpdateLectureInput }) =>
      coursesService.updateLecture(courseId, dayId, lectureId, payload),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  const removeLecture = useMutation({
    mutationFn: ({ courseId, dayId, lectureId }: { courseId: string; dayId: string; lectureId: string }) =>
      coursesService.removeLecture(courseId, dayId, lectureId),
    onSuccess: (_d, { courseId }) => invalidateCourse(courseId),
  });

  return { 
    createCourse, 
    updateCourse, 
    removeCourse,
    addDay, 
    updateDay,
    removeDay,
    addLecture,
    updateLecture,
    removeLecture
  };
}