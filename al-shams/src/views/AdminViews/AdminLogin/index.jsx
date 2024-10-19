import React from "react";
import "./adminLogin.scss";
import { AdminLoginForm, AnimatedPage } from "../../../components";
const AdminLogin = () => {
  return (
    <AnimatedPage>
      <div className="admin-login">
        <div className="admin-login__container">
          <AdminLoginForm />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AdminLogin;
