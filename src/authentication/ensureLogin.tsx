import { JSX } from 'react'

import RequireAuth from './RequireAuth'

export function routeToPrivateRoute(name: string, element: JSX.Element) {
    if (name == 'Login') {
        return element
    } else {
        return <RequireAuth>{element}</RequireAuth>
    }
}