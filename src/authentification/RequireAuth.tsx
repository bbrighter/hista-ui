import { Navigate, useLocation } from "react-router-dom"

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuthorized = window.sessionStorage.authorized
    const location = useLocation()

    if (!isAuthorized) {
        return (
            <Navigate to="/login" state={{ from: location }} />
        )
    }
    return children
}

