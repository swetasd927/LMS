import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Outlet />
      </main>

      Footer
    </div>
  );
};

export default PublicLayout;