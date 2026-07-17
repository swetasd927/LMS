import { useEffect, useState } from "react";
import { Button, Drawer, Input } from "antd";
import { GraduationCap, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

const navLinks = [
  { label: "Courses", to: "/courses" },
  { label: "Help Center", to: "/help-center" },
];

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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-gray-200/70 bg-white/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2 text-xl font-bold sm:text-2xl"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <GraduationCap size={18} />
          </span>
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            LMS
          </span>
        </Link>

        {/* Nav links : desktop only */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Search : desktop only */}
        <div className="hidden flex-1 lg:block lg:max-w-sm">
          <Input
            size="large"
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="Search courses..."
            className="rounded-full transition-shadow focus-within:shadow-sm"
          />
        </div>

        {/* Right side : desktop */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
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
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                {user.role}
              </span>
              <Button danger shape="round" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button shape="round">Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary" shape="round">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger : mobile only */}
        <button
          aria-label="Open menu"
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
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
          <span className="flex items-center gap-2 text-lg font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-500 text-white">
              <GraduationCap size={16} />
            </span>
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              LMS
            </span>
          </span>
        }
      >
        <div className="flex animate-fade-in-up flex-col gap-5">
          <Input
            size="large"
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="Search courses..."
            className="rounded-full"
          />

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user ? (
            <>
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                {user.role}
              </span>
              <Button danger shape="round" block onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button shape="round" block onClick={handleBecomeInstructor}>
                Become Instructor
              </Button>
              <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                <Button shape="round" block>
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsDrawerOpen(false)}>
                <Button shape="round" block type="primary">
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