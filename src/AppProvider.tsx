import { CustomAppBar } from "@bbrighter/auth-module/app-bar"
import { AuthProvider, useAuth, useHandleUnauthorized } from "@bbrighter/auth-module/auth"
import { UserManagementProvider } from "@bbrighter/auth-module/users"
import { useEffect } from "react"
import { NavigateFunction, Outlet, useLocation, useNavigate } from "react-router-dom"

import { useAuthStateAdapter, useUserManagementAdapter } from "./adapter"
import useHista from "./store/store"

export default function AppProvider() {
  const navigate = useNavigate()
  const location = useLocation()
  const authAdapter = useAuthStateAdapter(navigate, location)
  const userAdapter = useUserManagementAdapter()

  return (
    <UserManagementProvider adapter={userAdapter}>
      <AuthProvider adapter={authAdapter}>
        <AppEffects navigate={navigate} />
        <CustomAppBar />
        <Outlet />
      </AuthProvider>
    </UserManagementProvider>
  )
}

const AppEffects = ({ navigate }: { navigate: NavigateFunction }) => {
  useSetPermissions()
  usePiidLocation()
  useHandleUnauthorized(navigate)
  return null
}

const useSetPermissions = () => {
  const { setPermissions, token } = useAuth()

  useEffect(() => {
    setPermissions()
  }, [token])
}

const usePiidLocation = () => {
  const { piid } = useAuth()
  const setPiid = useHista(state => state.setPiid)
  const navigate = useNavigate()

  useEffect(() => {
    if (piid) {
      setPiid(piid)
      navigate(`/${piid}`, {
        replace: true,
      })
    }
  }, [piid])
}
