import { Login } from "@bbrighter/auth-module/login";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import { JSX, lazy, LazyExoticComponent, PropsWithChildren, Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";

import AppProvider from "./AppProvider";
import { appRoutes } from "./constants";
import { ErrorFallback } from "./scenes/Error/ErrorFallback";
import Start from "./scenes/Start";
import { ErrorBridge, useIsAppReady } from "./store";

type RawRoute = {
  path: string;
  element: LazyExoticComponent<() => JSX.Element>;
  name: string;
};

const rawRoutes: Array<RawRoute> = [
  {
    path: appRoutes.headaches,
    element: lazy(() => import("./scenes/Headaches")),
    name: "Headaches",
  },
  {
    path: appRoutes.headacheDetails,
    element: lazy(() => import("./scenes/Headache")),
    name: "Headache",
  },
  {
    path: appRoutes.conditionEvents,
    element: lazy(() => import("./scenes/ConditionEvents")),
    name: "ConditionEvents",
  },
  {
    path: appRoutes.conditionEventDetails,
    element: lazy(() => import("./scenes/ConditionEvent")),
    name: "ConditionEvent",
  },
  {
    path: appRoutes.manageSymptoms,
    element: lazy(() => import("./scenes/SymptomManagement")),
    name: "SymptomManagement",
  },
  {
    path: appRoutes.statuses,
    element: lazy(() => import("./scenes/Status")),
    name: "Status",
  },
  {
    path: appRoutes.statistics,
    element: lazy(() => import("./scenes/Statistics")),
    name: "Statistics",
  },
  {
    path: appRoutes.meals,
    element: lazy(() => import("./scenes/Meals")),
    name: "Meals",
  },
  {
    path: appRoutes.manageIngredients,
    element: lazy(() => import("./scenes/IngredientManagement")),
    name: "IngredientManagement",
  },
  {
    path: appRoutes.mealDetails,
    element: lazy(() => import("./scenes/Meal")),
    name: "Meal",
  },
  {
    path: appRoutes.noteDetails,
    element: lazy(() => import("./scenes/Note")),
    name: "Note",
  },
  {
    path: appRoutes.notes,
    element: lazy(() => import("./scenes/Notes")),
    name: "Notes",
  },
  {
    path: appRoutes.pollens,
    element: lazy(() => import("./scenes/Pollens")),
    name: "Pollens",
  },
  {
    path: appRoutes.homepage,
    element: lazy(() => import("./scenes/Start")),
    name: "Start",
  },
  {
    path: appRoutes.homepagePiid,
    element: lazy(() => import("./scenes/Start")),
    name: "Start",
  },
  {
    path: appRoutes.medicines,
    element: lazy(() => import("./scenes/Medicines")),
    name: "Medicines",
  },
  {
    path: appRoutes.manageMedicines,
    element: lazy(() => import("./scenes/MedicineManagement")),
    name: "Medicine management",
  },
];

const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => {
  const fallback = <div>Loading...</div>;

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

const childRoutes: Array<RouteObject> = rawRoutes.map((r) => ({
  path: r.path,
  name: r.name,
  element: (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorBridge />
      {withSuspense(r.element)}
    </ErrorBoundary>
  ),
}));

const LoadingLayout = ({ children }: PropsWithChildren) => {
  const image = useMemo(() => {
    const max = 9
    const id = Math.floor(Math.random() * max) + 1
    return `/loading_${id}.svg`
  }, [])

  const isReady = useIsAppReady()

  return (
    <>
      <Modal open={!isReady}>
        <> 
          <Box 
            component="img" 
            src={image}
            sx={{ maxWidth: "100%", maxHeight: "100%", position: "absolute",  top: "50%",   left: "50%", transform: "translate(-50%, -50%)" }}
          />
          <CircularProgress size={64} sx={{ top: "50%", left: "50%", position: "absolute" }}/>
        </>
      </Modal>
      {children}
    </>
  )
}

const routes: Array<RouteObject> = [
  {
    path: "",
    element: <AppProvider />,
    children: [
      {
        path: appRoutes.login,
        element: <Login />,
      },
      {
        path: "*",
        element: <LoadingLayout><Start /></LoadingLayout>,
      },
      ...childRoutes.map(r => ({
        ...r,
        element: r.path != appRoutes.login ? (<LoadingLayout>{r.element}</LoadingLayout>) : <>{r.element}</>,
      })),
    ],
  },
];


export const Router = () => {
  const router = createBrowserRouter(routes)

  return ( <RouterProvider router={router}/> )
}