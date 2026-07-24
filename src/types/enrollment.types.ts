export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrolledAt: string;
    lastAccessedAt: string;
    completedLectureIds: string[];
}
