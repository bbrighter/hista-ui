import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { useNavigateHomePage } from '../../hooks/useNavigate'
import useHista from '../../store/store'

export default function ErrorBoundary() {
    const error = useRouteError()
    const goHome = useNavigateHomePage()
    const histaError = useHista(state => state.error)
    const isError = useHista(state => state.isError)

    const isKnownError = isRouteErrorResponse(error) || isError
    const useError = isRouteErrorResponse(error) ? error : histaError

    return (
        <Container sx={{ padding: '2rem' }}>
            {isKnownError ?
                <Box>
                    <Typography variant='h1'>{useError.status} - {useError.statusText}</Typography>
                    <Typography>{useError.data?.message || 'Ein Fehler ist aufgetreten.'}</Typography>
                </Box>
                :
                <Box>
                    <Typography variant='h1'>Etwas ist schiefgelaufen.</Typography>
                    <Typography>{(error as Error)?.message}</Typography>
                </Box>
            }
            <Button
                sx={{ mt: '2rem' }}
                variant='contained'
                onClick={() => goHome()}
            >Zur Homepage</Button>
        </Container>
    )
}