import { useCallback, useEffect, useState } from "react";
import type { MyLearningItem } from "../../types/enrollment.types";
import { coursesService } from "../infrastructure/courses.services";
import { enrollmentService } from "../../services/enrollment.services";
import { getCourseStats } from "../../utils/duration";

interface UseEnrollmentsResult {
  items: MyLearningItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEnrollments(
  studentId: string | undefined
): UseEnrollmentsResult {
  const [items, setItems] = useState<MyLearningItem[]>([]);
  const [loading, setLoading] = useState(Boolean(studentId));
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = useCallback(() => setReloadFlag((n) => n + 1), []);

  useEffect(() => {
    if (!studentId) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const enrollments = await enrollmentService.getByStudent(studentId);

        const withCourses = await Promise.all(
          enrollments.map(async (enrollment) => {
            const course = await coursesService.getById(enrollment.courseId);
            if (!course) return null;

            const { lectureCount } = getCourseStats(course.days);
            const completedCount = enrollment.completedLectureIds.length;

            const item: MyLearningItem = {
              course,
              enrollmentId: enrollment.id,
              completedCount,
              totalLectures: lectureCount,
              progressPercent:
                lectureCount === 0
                  ? 0
                  : Math.round((completedCount / lectureCount) * 100),
              completedLectureIds: enrollment.completedLectureIds,
              lastAccessedAt: enrollment.lastAccessedAt,
            };

            return item;
          })
        );

        if (!cancelled) {
          setItems(
            withCourses
              .filter((i): i is MyLearningItem => i !== null)
              .sort(
                (a, b) =>
                  new Date(b.lastAccessedAt).getTime() -
                  new Date(a.lastAccessedAt).getTime()
              )
          );
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load your courses. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [studentId, reloadFlag]);

  if (!studentId) {
    return { items: [], loading: false, error: null, refetch };
  }

  return { items, loading, error, refetch };
}