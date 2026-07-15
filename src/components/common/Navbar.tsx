import { Button, Input } from "antd";
import { Search } from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const handleBecomeInstructor =
    () => {
      navigate(
        "/register",
        {
          state: {
            role:
              "instructor",
          },
        }
      );
    };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          LMS
        </Link>

        {/* Search */}
        <div className="hidden w-100 lg:block">
          <Input
            size="large"
            prefix={
              <Search
                size={18}
              />
            }
            placeholder="Search courses..."
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!user && (
            <Button
              type="text"
              onClick={
                handleBecomeInstructor
              }
            >
              Become Instructor
            </Button>
          )}

          {user ? (
            <>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                {
                  user.role
                }
              </span>

              <Button
                danger
                onClick={
                  handleLogout
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
              >
                <Button>
                  Login
                </Button>
              </Link>

              <Link
                to="/register"
              >
                <Button type="primary">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;