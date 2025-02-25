import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const ShowDetails = lazy(() => import("./components/ShowDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/showDetails/:id"
        element={
          <Suspense fallback={<div>Loading Details...</div>}>
            <ShowDetails />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
