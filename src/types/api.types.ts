import type {
  Course,
  CourseDay,
  CreateCourseInput,
  CreateDayInput,
  CreateLectureInput,
  Lecture,
  UpdateCourseInput,
  UpdateDayInput,
  UpdateLectureInput,
} from "./course.types";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Contract both the mock adapter and the future real API must satisfy. */
export interface CoursesApi {
  getAll(filters?: {
    instructorId?: string;
    status?: string;
  }): Promise<Course[]>;
  getById(id: string): Promise<Course | undefined>;
  create(payload: CreateCourseInput): Promise<Course>;
  update(id: string, payload: UpdateCourseInput): Promise<Course>;
  remove(id: string): Promise<void>;

  addDay(courseId: string, payload: CreateDayInput): Promise<CourseDay>;
  updateDay(
    courseId: string,
    dayId: string,
    payload: UpdateDayInput,
  ): Promise<CourseDay>;
  removeDay(courseId: string, dayId: string): Promise<void>;

  addLecture(
    courseId: string,
    dayId: string,
    payload: CreateLectureInput,
  ): Promise<Lecture>;
  updateLecture(
    courseId: string,
    dayId: string,
    lectureId: string,
    payload: UpdateLectureInput,
  ): Promise<Lecture>;
  removeLecture(
    courseId: string,
    dayId: string,
    lectureId: string,
  ): Promise<void>;
}
