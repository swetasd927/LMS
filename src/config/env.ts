export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
export const MOCK_LATENCY_MS = 300;