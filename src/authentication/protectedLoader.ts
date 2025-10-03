import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { url } from '../constants'
import { getIsAuthenticated } from '../store/auth/selectors';

export function protectedLoader({ request }: LoaderFunctionArgs) {
    const redirectTo = new URL(request.url).pathname;
    if (!getIsAuthenticated()) {
        throw redirect(`/${url.LOGIN}?redirectTo=${encodeURIComponent(redirectTo)}`);
    }

    return null
}