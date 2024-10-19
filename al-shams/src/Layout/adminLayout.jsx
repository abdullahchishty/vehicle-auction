import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar"; // Adjust based on your path
import AdminTopbar from "../components/AdminTopbar"; // Import the topbar component
import "./adminLayout.scss";

function AdminLayout() {
  const location = useLocation();

  const authPaths = ["/admin-a1b2c3/login"];
  const isAuthPath = authPaths.includes(location.pathname);

  return (
    <div className="admin-layout">
      {!isAuthPath && <AdminSidebar />}
      <div className="admin-layout__content">
        {!isAuthPath && <AdminTopbar />}
        <main
          className={`admin-layout__main ${
            !isAuthPath && "admin-layout__authenticated"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
