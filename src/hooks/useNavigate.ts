import { useNavigate } from 'react-router-dom';

import { url } from '../constants';
import useHista from '../store/store';

export const useNavigateHomePage = (piid: string) => {
    const navigate = useNavigate()
    return () => navigate('/' + piid + '/' + url.HOMEPAGE(), { replace: true })
}


export const useNavigateWithPiid = () => {
    const navigate = useNavigate()
    const piid = useHista(state => state.selectedPiid)
    return (absoluteUrl: string) => navigate('/' + piid + '/' + absoluteUrl)
}