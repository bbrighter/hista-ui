import { jwtDecode } from 'jwt-decode'

interface Token {
    productInstances: Array<{
        piid: string, appIds: Array<string>
    }>
}

export const getFirstPiidFromToken = (token: string | null) => {
    try {
        const decodedToken = jwtDecode<Token>(token)
        return decodedToken.productInstances[0].piid
    } catch {
        return null
    }
}


export const isExpired = (token: string | null): boolean => {
    try {
        const { exp } = jwtDecode(token)
        return exp * 1000 > new Date().getTime()
    } catch {
        return false
    }
}