export interface Instructor {
  id: string;
  name: string;
  title?: string;
}

export interface Lecture {
  id: string;
  title: string;
  videoUrl: string;
  duration: string; // "mm:ss"
  type: "video" | "article";
  isPreview?: boolean;
  order: number;
  description?: string;
}

export interface CourseDay {
  id: string;
  dayNumber: number;
  title: string; 
  description?: string;
  lectures: Lecture[];
  order: number;
}

export type CourseStatus = "draft" | "published";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: Instructor;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  bestseller?: boolean;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  lastUpdated: string;
  language: string;
  resourcesCount: number;
  hasCertificate: boolean;
  status: CourseStatus;
  whatYouWillLearn: string[];
  requirements: string[];
  topics: string[];
  days: CourseDay[];
  createdAt: string;
  updatedAt: string;
}

export type CreateCourseInput = Pick<
  Course,
  "title" | "subtitle" | "description" | "instructor" | "category" | "level" | "language"
> &
  Partial<Omit<Course, "title" | "subtitle" | "description" | "instructor" | "category" | "level" | "language">>;

export type UpdateCourseInput = Partial<Omit<Course, "id" | "days" | "createdAt">>;

export interface CreateDayInput {
  title: string;
  dayNumber?: number;
  description?: string;
}
export type UpdateDayInput = Partial<CreateDayInput>;

export interface CreateLectureInput {
  title: string;
  videoUrl: string;
  duration?: string;
  type?: "video" | "article";
  isPreview?: boolean;
  description?: string;
}
export type UpdateLectureInput = Partial<CreateLectureInput>;