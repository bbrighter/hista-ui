import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { url } from '../constants'
import useHista from '../store/store';

export function protectedLoader({ request }: LoaderFunctionArgs) {
    const redirectTo = new URL(request.url).pathname;
    const token = useHista.getState().token
    if (!token) {
        throw redirect(`${url.LOGIN()}?redirectTo=${encodeURIComponent(redirectTo)}`);
    }

    return null
}