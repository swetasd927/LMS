import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      Navbar

      <main>
        <Outlet />
      </main>

      Footer
    </div>
  );
};

export default PublicLayout;