import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SuperBalls } from "@uiball/loaders";
import routes from "./routes";
import { ScrollToTop } from "../components";
import { AnimatePresence } from "framer-motion";

const LazyLayout = lazy(() => import("../Layout"));
const LazyAdminLayout = lazy(() => import("../Layout/adminLayout"));

function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <SuperBalls size={45} color={"#00b67a"} speed={0.9} />
        </div>
      }
    >
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes key={location.key} location={location}>
          {/* Customer routes */}
          <Route element={<LazyLayout />}>
            {routes
              .filter((route) => !route.isAdmin)
              .map(({ path, element, exact }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={element}
                  exact={exact}
                />
              ))}
          </Route>

          {/* Admin routes */}
          <Route element={<LazyAdminLayout />}>
            {routes
              .filter((route) => route.isAdmin) // Admin routes
              .map(({ path, element, exact }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={element}
                  exact={exact}
                />
              ))}
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default AppRoutes;
