import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { useNavigateHomePage } from '../../hooks/useNavigate'
import useHista from '../../store/store'


export default function ErrorBoundary() {
    const routeError = useRouteError()
    const histaError = useHista(state => state.error)
    const error = isRouteErrorResponse(routeError) ? routeError : histaError
    const header = error ? `${error.status} - ${error.statusText}` : 'Unbekannter Fehler'
    const details = error?.data?.message || 'Ein Fehler ist aufgetreten.'

    const goHome = useNavigateHomePage()

    return (
        <Container sx={{ padding: '2rem' }}>
            <Alert severity='error' variant='outlined'>
                <AlertTitle>{header}</AlertTitle>
                {details}
            </Alert>
            <Button
                sx={{ mt: '2rem' }}
                variant='contained'
                onClick={goHome}
            >Zur Homepage</Button>
        </Container>
    )
}