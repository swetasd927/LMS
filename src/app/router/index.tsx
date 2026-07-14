import {
  createBrowserRouter,
} from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

import Home from "../../pages/public/Home";
import Courses from "../../pages/public/Courses";
import Login from "../../pages/public/Login";
import Register from "../../pages/public/Register";
import CourseDetails from "../../pages/public/CourseDetails";

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
        element: <CourseDetails />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);