import { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import useHista from '../store/store'

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuthorized = useHista(state => state.isAuthenticated)
    const location = useLocation()

    if (!isAuthorized) {
        return (
            <Navigate to="/login" state={{ from: location }} />
        )
    } else {
        return children
    }

}

