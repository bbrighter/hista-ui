import { AuthStateAdapter, ProductKeys } from "@bbrighter/auth-module/auth"
import { UserStateAdapter } from "@bbrighter/auth-module/users"
import { Location, NavigateFunction } from "react-router-dom"

import { authApi } from "./api/api"
import useHista from "./store/store"

export const useAuthStateAdapter = (navigate: NavigateFunction, location: Location): AuthStateAdapter => {
  const instances = useHista(state => state.instances)
  const setInstances = useHista(state => state.setInstances)
  const token = useHista(state => state.token)
  const setToken = useHista(state => state.setToken)
  const userName = useHista(state => state.userName)
  const setUserName = useHista(state => state.setUserName)

  const useAuthApi = () => authApi
  const useLocation = () => ({ location: location.pathname + location.search, navigate })
  const useProductInstances = () => ({ instances, setInstances })
  const useProductKey = () => ProductKeys.HistaComplete
  const useToken = () => ({ token, setToken })
  const useUserName = () => ({ userName, setUserName })

  return {
    useAuthApi,
    useLocation,
    useProductInstances,
    useProductKey,
    useToken,
    useUserName,
  }
}

export const useUserManagementAdapter = (): UserStateAdapter => {
  const users = useHista(state => state.users)
  const setUsers = useHista(state => state.setUsers)
  const piid = useHista(state => state.piid)

  const useUsers = () => ({ users, setUsers })
  const useApi = () => authApi
  const usePiid = () => piid

  return {
    useUsers,
    useApi,
    usePiid,
  }
}
