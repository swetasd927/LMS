import type { CoursesApi, ApiResponse } from "../../../../../types/api.types";
import { httpClient } from "../../../../../services/adapters/http/httpClient";
import type { Course, CourseDay, Lecture } from "../../../course.types";

export const httpCoursesAdapter: CoursesApi = {
  async getAll(filters) {
    const { data } = await httpClient.get<ApiResponse<Course[]>>("/courses", { params: filters });
    return data.data;
  },
  async getById(id) {
    const { data } = await httpClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return data.data;
  },
  async create(payload) {
    const { data } = await httpClient.post<ApiResponse<Course>>("/courses", payload);
    return data.data;
  },
  async update(id, payload) {
    const { data } = await httpClient.patch<ApiResponse<Course>>(`/courses/${id}`, payload);
    return data.data;
  },
  async remove(id) {
    await httpClient.delete(`/courses/${id}`);
  },
  async addDay(courseId, payload) {
    const { data } = await httpClient.post<ApiResponse<CourseDay>>(`/courses/${courseId}/days`, payload);
    return data.data;
  },
  async updateDay(courseId, dayId, payload) {
    const { data } = await httpClient.patch<ApiResponse<CourseDay>>(`/courses/${courseId}/days/${dayId}`, payload);
    return data.data;
  },
  async removeDay(courseId, dayId) {
    await httpClient.delete(`/courses/${courseId}/days/${dayId}`);
  },
  async addLecture(courseId, dayId, payload) {
    const { data } = await httpClient.post<ApiResponse<Lecture>>(`/courses/${courseId}/days/${dayId}/lectures`, payload);
    return data.data;
  },
  async updateLecture(courseId, dayId, lectureId, payload) {
    const { data } = await httpClient.patch<ApiResponse<Lecture>>(`/courses/${courseId}/days/${dayId}/lectures/${lectureId}`, payload);
    return data.data;
  },
  async removeLecture(courseId, dayId, lectureId) {
    await httpClient.delete(`/courses/${courseId}/days/${dayId}/lectures/${lectureId}`);
  },
};