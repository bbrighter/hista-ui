import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useParams } from 'react-router-dom';

import { useNavigateHomePage } from '../../hooks/useNavigate';
import { toAppError } from '../../store/error/appError'


export function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
    const piid = useParams<{ piid: string }>()
    const navigate = useNavigateHomePage(piid.piid)
    const goToHomepage = () => {
        navigate()
        setTimeout(() => resetErrorBoundary(), 0)
    }

    const appError = toAppError(error)

    let header = appError.text
    if (appError.status) header += ` - ${appError.status}`

    return (
        <Container sx={{ padding: '2rem' }}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>{header}</AlertTitle>
                {appError.details}
                {appError.stack &&
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Error stack</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ fontFamily: 'monospace', px: 1, borderRadius: 1 }}>
                                {appError.stack}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                }
            </Alert>
            <Button sx={{ mt: '2rem' }} variant="contained" onClick={goToHomepage}>
                Zur Homepage
            </Button>
        </Container>
    )
}



