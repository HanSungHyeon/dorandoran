import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "@/pages/common/loading";
import DashboardLayout from "@/layouts/DashboardLayout";

type DashboardLayout = any;

interface RouteType {
  path: string;
  layout?: FC<DashboardLayout>;
  element: React.LazyExoticComponent<FC>;
}

const routes: RouteType[] = [
  {
    path: "/",
    element: React.lazy(() => import("@/pages/common/intro")),
  },
  {
    path: "/main",
    element: React.lazy(() => import("@/pages/common/main")),
  },
  {
    path: "/character",
    element: React.lazy(() => import("@/pages/common/character")),
  },
  {
    path: "/children/main",
    layout: DashboardLayout,
    element: React.lazy(() => import("@/pages/children/main")),
  },
  {
    path: "/children/login",
    element: React.lazy(() => import("@/pages/children/login")),
  },
  {
    path: "/children/profile",
    element: React.lazy(() => import("@/pages/children/profile")),
  },
  {
    path: "/children/character",
    element: React.lazy(() => import("@/pages/children/character")),
  },
  {
    path: "/children/fairytale",
    layout: DashboardLayout,
    element: React.lazy(() => import("@/pages/children/fairytale")),
  },
  {
    path: "/children/read",
    layout: DashboardLayout,
    element: React.lazy(() => import("@/pages/children/read")),
  },
  {
    path: "/children/like",
    layout: DashboardLayout,
    element: React.lazy(() => import("@/pages/children/like")),
  },
  {
    path: "/parent/login",
    element: React.lazy(() => import("@/pages/parent/login")),
  },
  {
    path: "/parent/main",
    element: React.lazy(() => import("@/pages/parent/main")),
  },
  {
    path: "/parent/profile",
    element: React.lazy(() => import("@/pages/parent/profile")),
  },
  {
    path: "/parent/record",
    element: React.lazy(() => import("@/pages/parent/record")),
  },
  {
    path: "parent/sketch",
    element: React.lazy(() => import("@/pages/common/sketch")),
  },
  {
    path: "children/sketch",
    element: React.lazy(() => import("@/pages/common/sketch")),
  },
  {
    path: "/oauth/redirect/kakao",
    element: React.lazy(() => import("@/pages/common/oauth/kakao")),
  },
  {
    path: "/oauth/redirect/google",
    element: React.lazy(() => import("@/pages/common/oauth/google")),
  },
  {
    path: "/test",
    element: React.lazy(() => import("@/pages/parent/test")),
  },
  // {
  //   path: "/",
  //   element: () => <Navigate replace to="/main" />,
  // },
  // {
  //   path: "/*",
  //   element: React.lazy(() => import("@/pages/404")),
  // },
];

const RenderRoutes = () => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        {routes.map((route, i) => {
          const RouteElement = route.element;
          const RouteLayout = route.layout || React.Fragment;
          //   const Guard = route.guard || React.Fragment;

          return (
            <Route
              key={i}
              path={route.path}
              element={
                <RouteLayout>
                  <RouteElement />
                </RouteLayout>
              }
            />
          );
        })}
      </Routes>
    </React.Suspense>
  );
};

export default RenderRoutes;
