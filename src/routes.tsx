import { JSX, lazy, LazyExoticComponent, Suspense, useEffect } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { routeToPrivateRoute } from './authentification/ensureLogin'
import { url } from './constants'
import { useNavigateErrorPage } from './hooks/useNavigate'
import Error from './scenes/Error'
import useHista from './store/store'

type RawRoute = {
    path: string
    element: LazyExoticComponent<() => JSX.Element>,
    name: string
}

const rawRoutes: Array<RawRoute> = [
    {
        path: url.HEADACHES,
        element: lazy(() => import('./scenes/Headaches')),
        name: 'Headaches',
    },
    {
        path: url.HEADACHES + '/:id',
        element: lazy(() => import('./scenes/Headache')),
        name: 'Headache',
    },
    {
        path: url.CONDITION_EVENTS + '/:id',
        element: lazy(() => import('./scenes/ConditionEvent')),
        name: 'ConditionEvent',
    },
    {
        path: url.MANAGE_SYMPTOMS,
        element: lazy(() => import('./scenes/SymptomManagement')),
        name: 'SymptomManagement',
    },
    {
        path: url.STATUSES,
        element: lazy(() => import('./scenes/Status')),
        name: 'Status',
    },
    {
        path: url.STATISTICS,
        element: lazy(() => import('./scenes/Statistics')),
        name: 'Statistics',
    },
    {
        path: url.CONDITION_EVENTS,
        element: lazy(() => import('./scenes/ConditionEvents')),
        name: 'ConditionEvents',
    },
    {
        path: url.LOGIN,
        element: lazy(() => import('./scenes/Login')),
        name: 'Login',
    },
    {
        path: url.MEAL + '/:id',
        element: lazy(() => import('./scenes/Meal')),
        name: 'Meal',
    },
    {
        path: url.MEAL,
        element: lazy(() => import('./scenes/Meals')),
        name: 'Meals',
    },
    {
        path: url.NOTES + '/:id',
        element: lazy(() => import('./scenes/Note')),
        name: 'Note',
    },
    {
        path: url.NOTES,
        element: lazy(() => import('./scenes/Notes')),
        name: 'Notes',
    },
    {
        path: url.POLLENS,
        element: lazy(() => import('./scenes/Pollens')),
        name: 'Pollens',
    },
    {
        path: '/',
        element: lazy(() => import('./scenes/Start')),
        name: 'Start',
    },
    {
        path: url.ERROR,
        element: lazy(() => import('./scenes/Error')),
        name: 'Error',
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

const WithErrorHandling = ({ children }: { children: JSX.Element }) => {
    const navigateToError = useNavigateErrorPage()
    const error = useHista(state => state.error)

    useEffect(() => {
        if (error) {
            navigateToError()
        }
    }, [error])

    return children
}

const routes: Array<RouteObject> = rawRoutes.map(r => ({
    path: r.path,
    name: r.name,
    element: <WithErrorHandling>{routeToPrivateRoute(r.name, withSuspense(r.element))}</WithErrorHandling>,
    errorElement: <Error />,
}))

export default createBrowserRouter(routes)