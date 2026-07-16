import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const StudentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Student Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="mt-5 rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;