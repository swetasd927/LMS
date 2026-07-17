import type { Course } from "../types/course.types";
import {
  courses as staticCourses,
  getCourseById as getStaticCourseById,
} from "../data/courses.data";

const SIMULATED_DELAY_MS = 300;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    await delay(SIMULATED_DELAY_MS);
    return staticCourses;
  },

  getById: async (id: string): Promise<Course | undefined> => {
    await delay(SIMULATED_DELAY_MS);
    return getStaticCourseById(id);
  },
};