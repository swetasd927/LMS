import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

import Home from "../../pages/public/Home";
import Courses from "../../pages/public/Courses";
import Login from "../../pages/public/Login";
import Register from "../../pages/public/Register";
import CourseDetails from "../../pages/public/CourseDetails";

import StudentDashboard from "../../pages/student/Dashboard";
import InstructorDashboard from "../../pages/instructor/Dashboard";
import AdminDashboard from "../../pages/admin/Dashboard";

import ProtectedRoute from "../../components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course/:id",
        element: <CourseDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "student/dashboard",
        element: (
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "instructor/dashboard",
        element: (
          <ProtectedRoute allowedRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);