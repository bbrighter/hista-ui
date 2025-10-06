import useHista from '../store'

export const useIsAuthenticated = (): boolean => {
    const token = useHista(state => state.token)
    return Boolean(token)
}