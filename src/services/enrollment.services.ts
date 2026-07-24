import type { EnrollmentApi } from "../types/api.types";
import { mockEnrollmentAdapter } from "./adapters/mock/mockEnrollmentAdapter";

// Mock-only for now : swap in an HTTP adapter here later, same pattern as courses.services.ts
export const enrollmentService: EnrollmentApi = mockEnrollmentAdapter;
