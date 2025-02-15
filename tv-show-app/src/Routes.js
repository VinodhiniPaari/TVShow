import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import("./pages/Home"));
const ShowDetails = lazy(() => import("./components/ShowDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showDetails/:id" element={<ShowDetails />} />
        <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
