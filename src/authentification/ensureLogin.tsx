import RequireAuth from "./RequireAuth"

export function routeToPrivateRoute(name: string, routeProps: { path: string, element: JSX.Element }) {
    if (name == "Login") {
        return { ...routeProps, key: name }
    } else {
        return { path: routeProps.path, element: <RequireAuth>{routeProps.element}</RequireAuth>, key: name }
    }
}