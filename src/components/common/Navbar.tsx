import { useEffect, useState } from "react";
import { Button, Drawer, Dropdown, Input } from "antd";
import type { MenuProps } from "antd";
import { ChevronDown, GraduationCap, LogOut, Menu, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { slideInRight, staggerContainer } from "../../animations/variants";
import ThemeToggle from "./ThemeToggle";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const mobileListVariants = staggerContainer(0.06, 0.05);
const mobileItemVariants = slideInRight;

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

  const profileMenuItems: MenuProps["items"] = user
    ? [
        {
          key: "info",
          label: (
            <div className="min-w-40 px-1 py-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </p>
              <p className="text-xs capitalize text-gray-500 dark:text-gray-400">{user.role}</p>
            </div>
          ),
          disabled: true,
        },
        { type: "divider" },
        {
          key: "logout",
          label: "Logout",
          icon: <LogOut size={14} />,
          danger: true,
          onClick: handleLogout,
        },
      ]
    : [];

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? "border-gray-200/70 bg-white/80 shadow-sm backdrop-blur-md dark:border-gray-800/70 dark:bg-gray-950/80"
          : "border-transparent bg-white dark:bg-gray-950"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2 text-xl font-bold sm:text-2xl"
        >
          <motion.span
            whileHover={{ scale: 1.08, rotate: 6 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-500 text-white shadow-sm"
          >
            <GraduationCap size={18} />
          </motion.span>
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            LMS
          </span>
        </Link>

        {/* Search : desktop only */}
        <div className="hidden flex-1 lg:block lg:max-w-sm">
          <Input
            size="large"
            prefix={<Search size={18} className="text-gray-400 dark:text-gray-500" />}
            placeholder="Search courses..."
            className="rounded-full transition-shadow focus-within:shadow-sm"
          />
        </div>

        {/* Right side : desktop */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {!user && (
            <button
              onClick={handleBecomeInstructor}
              className="group relative text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Become Instructor
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </button>
          )}

          <ThemeToggle />

          {user ? (
            <Dropdown
              menu={{ items: profileMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button
                type="button"
                aria-label="Open profile menu"
                className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-500 text-xs font-bold text-white">
                  {getInitials(user.name)}
                </span>
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </Dropdown>
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
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            onClick={() => setIsDrawerOpen(true)}
            className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDrawerOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {isDrawerOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
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
        <motion.div
          variants={mobileListVariants}
          initial="hidden"
          animate={isDrawerOpen ? "show" : "hidden"}
          className="flex flex-col gap-5"
        >
          <motion.div variants={mobileItemVariants}>
            <Input
              size="large"
              prefix={<Search size={18} className="text-gray-400 dark:text-gray-500" />}
              placeholder="Search courses..."
              className="rounded-full"
            />
          </motion.div>

          {user ? (
            <>
              <motion.div
                variants={mobileItemVariants}
                className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-gray-800"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-500 text-xs font-bold text-white">
                  {getInitials(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
                    {user.role}
                  </p>
                </div>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Button danger shape="round" block onClick={handleLogout}>
                  Logout
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={mobileItemVariants}>
                <Button shape="round" block onClick={handleBecomeInstructor}>
                  Become Instructor
                </Button>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                  <Button shape="round" block>
                    Login
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants}>
                <Link to="/register" onClick={() => setIsDrawerOpen(false)}>
                  <Button shape="round" block type="primary">
                    Register
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </Drawer>
    </motion.nav>
  );
};

export default Navbar;