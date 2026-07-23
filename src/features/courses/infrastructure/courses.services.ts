import type { CoursesApi } from "../../../types/api.types";
import { USE_MOCK_API } from "../../../config/env";
import { mockCoursesAdapter } from "./mockCoursesAdapter";
import { httpCoursesAdapter } from "./httpCoursesAdapter";

// Flip VITE_USE_MOCK_API=false later — nothing else in the app changes.
export const coursesService: CoursesApi = USE_MOCK_API ? mockCoursesAdapter : httpCoursesAdapter;
export { mockDb } from "./adapters/mock/db";