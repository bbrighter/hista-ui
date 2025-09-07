import { useNavigate } from 'react-router-dom';

import { url } from '../constants';

export const useNavigateHomePage = () => {
    const navigate = useNavigate()
    return () => navigate(url.HOMEPAGE)
}