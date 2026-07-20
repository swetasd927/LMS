import type { EnrollmentApi } from "../../../types/api.types";
import type { Enrollment } from "../../../types/enrollment.types";
import { MOCK_LATENCY_MS } from "../../../config/env";
import { generateId } from "./db";
import { enrollmentDb } from "./enrollmentDb";

const delay = (ms = MOCK_LATENCY_MS) => new Promise((r) => setTimeout(r, ms));
const nowIso = () => new Date().toISOString();

export const mockEnrollmentAdapter: EnrollmentApi = {
  async getByStudent(studentId) {
    await delay();
    return enrollmentDb.read().filter((e) => e.studentId === studentId);
  },

  async isEnrolled(studentId, courseId) {
    await delay();
    return enrollmentDb
      .read()
      .some((e) => e.studentId === studentId && e.courseId === courseId);
  },

  async enroll(studentId, courseId) {
    await delay();
    const enrollments = enrollmentDb.read();

    const existing = enrollments.find(
      (e) => e.studentId === studentId && e.courseId === courseId
    );
    if (existing) return existing;

    const enrollment: Enrollment = {
      id: generateId("enroll"),
      studentId,
      courseId,
      enrolledAt: nowIso(),
      lastAccessedAt: nowIso(),
      completedLectureIds: [],
    };

    enrollmentDb.write([...enrollments, enrollment]);
    return enrollment;
  },

  async toggleLecture(studentId, courseId, lectureId) {
    await delay();
    const enrollments = enrollmentDb.read();
    const index = enrollments.findIndex(
      (e) => e.studentId === studentId && e.courseId === courseId
    );
    if (index === -1) throw new Error("Not enrolled in this course");

    const enrollment = enrollments[index];
    const isDone = enrollment.completedLectureIds.includes(lectureId);

    const updated: Enrollment = {
      ...enrollment,
      completedLectureIds: isDone
        ? enrollment.completedLectureIds.filter((id) => id !== lectureId)
        : [...enrollment.completedLectureIds, lectureId],
      lastAccessedAt: nowIso(),
    };

    enrollments[index] = updated;
    enrollmentDb.write(enrollments);
    return updated;
  },
};