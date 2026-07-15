import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <h1>
      Admin Dashboard
    </h1>
  );
};

export default AdminDashboard;