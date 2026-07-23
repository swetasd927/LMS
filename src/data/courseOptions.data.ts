import type { Course } from "../features/auth/context/courses/types/course.types";

/** Shared category list:used by course creation forms and filters. */
export const COURSE_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "AI",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Robotics",
  "DevOps",
  "System Design",
  "Cybersecurity",
] as const;

export const COURSE_LEVELS: Course["level"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
];

export const LECTURE_TYPES: Array<
  Course["days"][number]["lectures"][number]["type"]
> = ["video", "article"];
