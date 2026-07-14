import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          LMS
        </Link>

        <div className="hidden w-100 lg:block">
          <Input
            size="large"
            prefix={<Search size={18} />}
            placeholder="Search courses..."
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="text">
            Become Instructor
          </Button>

          <Link to="/login">
            <Button>
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button type="primary">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;