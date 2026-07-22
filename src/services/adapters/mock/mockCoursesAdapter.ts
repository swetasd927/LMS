import type { CoursesApi } from "../../../types/api.types";
import type { Course, CourseDay, Lecture } from "../../../types/course.types";
import { MOCK_LATENCY_MS } from "../../../config/env";
import { generateId, mockDb } from "./db";

const delay = (ms = MOCK_LATENCY_MS) => new Promise((r) => setTimeout(r, ms));
const notFound = (what: string, id: string): never => { throw new Error(`${what} "${id}" not found`); };
const nowIso = () => new Date().toISOString();

export const mockCoursesAdapter: CoursesApi = {
  async getAll(filters) {
    await delay();
    const { courses } = mockDb.read();
    return courses.filter(c =>
      (!filters?.instructorId || c.instructor.id === filters.instructorId) &&
      (!filters?.status || c.status === filters.status)
    );
  },

  async getById(id) {
    await delay();
    return mockDb.read().courses.find(c => c.id === id);
  },

  async create(payload) {
    await delay();
    const db = mockDb.read();
    const course: Course = {
      id: generateId("course"), thumbnail: "", price: 0, rating: 0, ratingCount: 0,
      studentsCount: 0, bestseller: false, lastUpdated: "", resourcesCount: 0,
      hasCertificate: false, status: "draft", whatYouWillLearn: [], requirements: [],
      topics: [], days: [], createdAt: nowIso(), updatedAt: nowIso(), ...payload,
    };
    db.courses.push(course);
    mockDb.write(db);
    return course;
  },

  async update(id, payload) {
    await delay();
    const db = mockDb.read();
    const i = db.courses.findIndex(c => c.id === id);
    if (i === -1) notFound("Course", id);
    db.courses[i] = { ...db.courses[i], ...payload, updatedAt: nowIso() };
    mockDb.write(db);
    return db.courses[i];
  },

  async remove(id) {
    await delay();
    const db = mockDb.read();
    db.courses = db.courses.filter(c => c.id !== id);
    mockDb.write(db);
  },

  async addDay(courseId, payload) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    const day: CourseDay = {
      id: generateId("day"), dayNumber: payload.dayNumber ?? course.days.length + 1,
      title: payload.title, description: payload.description, lectures: [],
      order: course.days.length + 1,
    };
    course.days.push(day);
    course.updatedAt = nowIso();
    mockDb.write(db);
    return day;
  },

  async updateDay(courseId, dayId, payload) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    const day = course.days.find(d => d.id === dayId);
    if (!day) return notFound("Day", dayId);
    Object.assign(day, payload);
    course.updatedAt = nowIso();
    mockDb.write(db);
    return day;
  },

  async removeDay(courseId, dayId) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    course.days = course.days.filter(d => d.id !== dayId);
    mockDb.write(db);
  },

  async addLecture(courseId, dayId, payload) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    const day = course.days.find(d => d.id === dayId);
    if (!day) return notFound("Day", dayId);
    const lecture: Lecture = {
      id: generateId("lec"), title: payload.title, description: payload.description,
      videoUrl: payload.videoUrl, duration: payload.duration ?? "0:00", type: payload.type ?? "video",
      isPreview: payload.isPreview ?? false, order: day.lectures.length + 1,
    };
    day.lectures.push(lecture);
    mockDb.write(db);
    return lecture;
  },

  async updateLecture(courseId, dayId, lectureId, payload) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    const day = course.days.find(d => d.id === dayId);
    if (!day) return notFound("Day", dayId);
    const lecture = day.lectures.find(l => l.id === lectureId);
    if (!lecture) return notFound("Lecture", lectureId);
    Object.assign(lecture, payload);
    mockDb.write(db);
    return lecture;
  },

  async removeLecture(courseId, dayId, lectureId) {
    await delay();
    const db = mockDb.read();
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return notFound("Course", courseId);
    const day = course.days.find(d => d.id === dayId);
    if (!day) return notFound("Day", dayId);
    day.lectures = day.lectures.filter(l => l.id !== lectureId);
    mockDb.write(db);
  },
};