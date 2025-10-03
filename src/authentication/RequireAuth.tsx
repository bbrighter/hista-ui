import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { url } from '../constants'
import { useIsAuthenticated } from '../store/auth/selectors'
import useHista from '../store/store'

export default function RequireAuth() {
    const navigate = useNavigate()

    const setPiid = useHista(state => state.setPiid)
    const tokenPiid = useHista(state => state.piid)

    const urlPiid = useUrlPiid()
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(url.LOGIN(), { replace: true })
            return
        }
        if (!urlPiid) {
            navigate(
                window.location.pathname.replace(/^\//, `/${tokenPiid}/`),
                { replace: true },
            )
            return
        }
        if (urlPiid && urlPiid != tokenPiid) {
            setPiid(urlPiid)
        }
    }, [tokenPiid, isAuthenticated, urlPiid])


    return <Outlet />
}

const useUrlPiid = (): string => {
    const urlPiid = useParams<{ piid: string }>()

    if (!urlPiid.piid) return ''
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (regex.test(urlPiid.piid)) return urlPiid.piid
}