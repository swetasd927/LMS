import type { Enrollment } from "../../../types/enrollment.types";

const STORAGE_KEY = "lms_enrollments_v1";

const readDb = () : Enrollment[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Enrollment[]) : [];
};

const writeDb = (enrollments: Enrollment[]) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));

export const enrollmentDb = {
    read: readDb,
    write: writeDb,
}
