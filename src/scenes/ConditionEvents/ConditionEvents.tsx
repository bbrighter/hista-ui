import useHista from '../../store/store'
import { useNavigate } from 'react-router-dom'
import EventList from './components/EventList'
import SickIcon from '@mui/icons-material/Sick';
import { url } from '../../constants'
import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function ConditionEvents() {
    const postConditionEvent = useHista(state => state.postConditionEvent)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onClickAddSymptom = async () => {
        setLoading(true)
        const id = await postConditionEvent()
        setLoading(false)
        if (id) {
            navigate(url.CONDITION_EVENTS + '/' + String(id))
        }
    }

    const onClickManageSymptoms = () => {
        navigate(url.MANAGE_SYMPTOMS)
    }

    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <ButtonGroup variant='outlined'>
                <Button
                    variant='contained'
                    startIcon={<SickIcon />}
                    onClick={onClickAddSymptom}
                    loading={loading}
                >
                    Neues Symptom
                </Button>
                <Button onClick={onClickManageSymptoms}>
                    Symptome verwalten
                </Button>
            </ButtonGroup>
            <EventList />
        </Container>
    )
}