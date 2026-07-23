import type { Course } from "../../../types/course.types";
import { courses as seedCourses } from "../../../../../data/courses.data";

const STORAGE_KEY = "lms_db_v2";
interface Db {
  courses: Course[];
}
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

const readDb = (): Db => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial: Db = { courses: clone(seedCourses) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw) as Db;
};

const writeDb = (db: Db) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));

export const mockDb = {
  read: readDb,
  write: writeDb,
  reset: () => {
    const initial = { courses: clone(seedCourses) };
    writeDb(initial);
    return initial;
  },
  readRaw: () => JSON.stringify(readDb(), null, 2),
};

export const generateId = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
