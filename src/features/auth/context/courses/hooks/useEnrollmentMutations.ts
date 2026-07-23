import { useState } from "react";
import { enrollmentService } from "../../../../../services/enrollment.services";

export function useEnrollmentMutations() {
  const [enrolling, setEnrolling] = useState(false);
  const [togglingLectureId, setTogglingLectureId] = useState<string | null>(
    null
  );

  const enrollInCourse = async (studentId: string, courseId: string) => {
    setEnrolling(true);
    try {
      return await enrollmentService.enroll(studentId, courseId);
    } finally {
      setEnrolling(false);
    }
  };

  const toggleLectureComplete = async (
    studentId: string,
    courseId: string,
    lectureId: string
  ) => {
    setTogglingLectureId(lectureId);
    try {
      return await enrollmentService.toggleLecture(
        studentId,
        courseId,
        lectureId
      );
    } finally {
      setTogglingLectureId(null);
    }
  };

  return {
    enrollInCourse,
    enrolling,
    toggleLectureComplete,
    togglingLectureId,
  };
}