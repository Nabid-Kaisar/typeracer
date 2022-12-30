import { ROUTES } from "../../constants/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../core/Loader";
import ErrorBoundary from "../core/ErrorBoundary";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            {ROUTES.map((routeInfo, idx) => {
              return (
                <Route
                  key={idx}
                  // style={{ marginRight: "5px" }}
                  path={routeInfo.route}
                  element={routeInfo.component}
                />
              );
            })}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
