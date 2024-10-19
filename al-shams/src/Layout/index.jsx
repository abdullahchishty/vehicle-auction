import React from "react";
import { Loader } from "../components";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import routes from "../routes/routes";

function Layout() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  const hiddenPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isHiddenPath = () => {
    return hiddenPaths.some((path) => location.pathname.startsWith(path));
  };

  const isValidRoute = () => {
    return routes.some((route) => {
      // Handle dynamic routes
      const routePathSegments = route.path.split("/");
      const currentPathSegments = location.pathname.split("/");

      if (routePathSegments.length !== currentPathSegments.length) {
        return false;
      }

      return routePathSegments.every((segment, index) => {
        // If it's a parameter (starts with ':'), it's valid
        if (segment.startsWith(":")) {
          return true;
        }
        // Otherwise, check if the segments match
        return segment === currentPathSegments[index];
      });
    });
  };

  const shouldShowHeaderFooter = !isHiddenPath() && isValidRoute();

  return (
    <>
      <Loader />
      <div>
        {shouldShowHeaderFooter && <Header />}
        <main>
          <Outlet />
        </main>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </>
  );
}

export default Layout;