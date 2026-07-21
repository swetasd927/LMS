import type { Course } from "./course.types";

export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrolledAt: string;
    lastAccessedAt: string;
    completedLectureIds: string[];
}

export interface MyLearningItem {
    course: Course;
    enrollmentId: string;
    completedCount: number;
    totalLectures: number;
    progressPercent: number;
    completedLectureIds: string[];
    lastAccessedAt: string;
}