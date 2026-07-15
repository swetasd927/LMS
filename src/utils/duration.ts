import type { CurriculumSection } from "../types/course.types";

/** "10:44" -> 644 (seconds) */
export const parseDuration = (duration: string): number => {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + (seconds || 0);
};

/** 12080 -> "3h 21m" */
export const formatTotalDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
};

export const getSectionStats = (section: CurriculumSection) => {
  const totalSeconds = section.lectures.reduce(
    (sum, lecture) => sum + parseDuration(lecture.duration),
    0
  );
  return {
    lectureCount: section.lectures.length,
    duration: formatTotalDuration(totalSeconds),
  };
};

export const getCourseStats = (curriculum: CurriculumSection[]) => {
  const allLectures = curriculum.flatMap((s) => s.lectures);
  const totalSeconds = allLectures.reduce(
    (sum, lecture) => sum + parseDuration(lecture.duration),
    0
  );
  return {
    sectionCount: curriculum.length,
    lectureCount: allLectures.length,
    duration: formatTotalDuration(totalSeconds),
  };
};