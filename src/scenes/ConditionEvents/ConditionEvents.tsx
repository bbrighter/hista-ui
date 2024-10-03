import useHista from '../../store/store'
import { useNavigate } from 'react-router-dom'
import EventList from './components/EventList'
import SickIcon from '@mui/icons-material/Sick';
import { url } from '../../constants'
import { useState } from 'react';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ConditionEvents() {
    const postConditionEvent = useHista(state => state.postConditionEvent)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        setLoading(true)
        const id = await postConditionEvent()
        setLoading(false)
        if (id) {
            navigate(url.CONDITION_EVENTS + '/' + String(id))
        }
    }

    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <LoadingButton
                startIcon={<SickIcon />}
                onClick={onClick}
                variant="outlined"
                loading={loading}
            >
                Neues Symtpom
            </LoadingButton>
            <EventList />
        </Container>
    )
}