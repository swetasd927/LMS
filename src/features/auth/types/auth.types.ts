export type UserRole = | "student" | "instructor" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}