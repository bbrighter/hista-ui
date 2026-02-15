import { Login } from '@bbrighter/auth-module/login'
import { JSX, lazy, LazyExoticComponent, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import AppProvider from './AppProvider'
import { appRoutes } from './constants'
import { ErrorFallback } from './scenes/Error/ErrorFallback'
import Start from './scenes/Start'
import { ErrorBridge } from './store/error/ErrorBridge'

type RawRoute = {
    path: string
    element: LazyExoticComponent<() => JSX.Element>
    name: string
}

const rawRoutes: Array<RawRoute> = [
    {
        path: appRoutes.headaches,
        element: lazy(() => import('./scenes/Headaches')),
        name: 'Headaches',
    },
    {
        path: appRoutes.headacheDetails,
        element: lazy(() => import('./scenes/Headache')),
        name: 'Headache',
    },
    {
        path: appRoutes.conditionEvents,
        element: lazy(() => import('./scenes/ConditionEvents')),
        name: 'ConditionEvents',
    },
    {
        path: appRoutes.conditionEventDetails,
        element: lazy(() => import('./scenes/ConditionEvent')),
        name: 'ConditionEvent',
    },
    {
        path: appRoutes.manageSymptoms,
        element: lazy(() => import('./scenes/SymptomManagement')),
        name: 'SymptomManagement',
    },
    {
        path: appRoutes.statuses,
        element: lazy(() => import('./scenes/Status')),
        name: 'Status',
    },
    {
        path: appRoutes.statistics,
        element: lazy(() => import('./scenes/Statistics')),
        name: 'Statistics',
    },
    {
        path: appRoutes.meals,
        element: lazy(() => import('./scenes/Meals')),
        name: 'Meals',
    },
        {
        path: appRoutes.manageIngredients,
        element: lazy(() => import('./scenes/IngredientManagement')),
        name: 'IngredientManagement',
    },
    {
        path: appRoutes.mealDetails,
        element: lazy(() => import('./scenes/Meal')),
        name: 'Meal',
    },
    {
        path: appRoutes.noteDetails,
        element: lazy(() => import('./scenes/Note')),
        name: 'Note',
    },
    {
        path: appRoutes.notes,
        element: lazy(() => import('./scenes/Notes')),
        name: 'Notes',
    },
    {
        path: appRoutes.pollens,
        element: lazy(() => import('./scenes/Pollens')),
        name: 'Pollens',
    },
    {
        path: appRoutes.homepage,
        element: lazy(() => import('./scenes/Start')),
        name: 'Start',
    },
    {
        path: appRoutes.homepagePiid,
        element: lazy(() => import('./scenes/Start')),
        name: 'Start',
    },
]

const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => {
    const fallback = <div>Loading...</div>

    return (
        <Suspense fallback={fallback}>
            <Component />
        </Suspense>
    )
}

const childRoutes: Array<RouteObject> = rawRoutes.map(r => ({
    path: r.path,
    name: r.name,
    element: (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
        >
            <ErrorBridge />
            {withSuspense(r.element)}
        </ErrorBoundary>
    ),
}))

const routes: Array<RouteObject> = [
    {
        path: '',
        element: <AppProvider />,
        children: [
            {
                path: appRoutes.login,
                element: <Login />,
            },
            {
                path: '*',
                element: <Start />,
            },
            ...childRoutes,
        ],
    },
]

export default createBrowserRouter(routes)
