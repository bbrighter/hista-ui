import useHista from '../store'
import { isExpired } from './tokenHandler'

export const useIsAuthenticated = (): boolean => {
    const token = useHista(state => state.token)
    if (!token) return false
    return isExpired(token)
}

export const getIsAuthenticated = (): boolean => {
    const token = useHista.getState().token
    if (!token) return false
    return isExpired(token)
}