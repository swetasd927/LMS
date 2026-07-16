import { useEffect, useState } from "react";
import { Button, Drawer, Input } from "antd";
import { Menu, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
    navigate("/login");
  };

  const handleBecomeInstructor = () => {
    setIsDrawerOpen(false);
    navigate("/register", { state: { role: "instructor" } });
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-gray-200"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600 transition-colors hover:text-indigo-700 sm:text-2xl"
        >
          LMS
        </Link>

        {/* Search : desktop only */}
        <div className="hidden flex-1 px-8 lg:block lg:max-w-md">
          <Input
            size="large"
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="Search courses..."
            className="transition-shadow focus-within:shadow-sm"
          />
        </div>

        {/* Right side : desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          {!user && (
            <button
              onClick={handleBecomeInstructor}
              className="group relative text-sm font-medium text-gray-700"
            >
              Become Instructor
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </button>
          )}

          {user ? (
            <>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                {user.role}
              </span>
              <Button danger onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setIsDrawerOpen(true)}
          className="rounded p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
        width={300}
        closeIcon={<X size={20} />}
        title={
          <span className="text-lg font-bold text-indigo-600">LMS</span>
        }
      >
        <div className="flex animate-fade-in-up flex-col gap-5">
          <Input
            size="large"
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="Search courses..."
          />

          {user ? (
            <>
              <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                {user.role}
              </span>
              <Button danger block onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button block onClick={handleBecomeInstructor}>
                Become Instructor
              </Button>
              <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                <Button block>Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsDrawerOpen(false)}>
                <Button block type="primary">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;