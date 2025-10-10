import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import useHista from '../store/store'

export default function RequireAuth() {
    const navigate = useNavigate()

    const selectedPiid = useHista(state => state.selectedPiid)
    const isAuthProblem = useHista(state => state.isAuthProblem)
    const getPermissions = useHista(state => state.getPermissions)
    const urlPiid = useUrlPiid()

    useEffect(() => { getPermissions() }, [])

    useEffect(() => {
        if (!selectedPiid || urlPiid) return
        navigate(
            window.location.pathname.replace(/^\//, `/${selectedPiid}/`),
            { replace: true },
        )
    }, [selectedPiid])

    useEffect(() => {
        if (isAuthProblem) {
            navigate(`/login?redirectTo=${location.pathname}`)
        }
    }, [isAuthProblem])


    return <Outlet />
}

const useUrlPiid = (): string => {
    const urlPiid = useParams<{ piid: string }>()

    if (!urlPiid.piid) return ''
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (regex.test(urlPiid.piid)) return urlPiid.piid
}