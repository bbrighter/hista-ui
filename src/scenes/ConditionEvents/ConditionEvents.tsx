import SickIcon from '@mui/icons-material/Sick';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { url } from '../../constants'
import useHista from '../../store/store'
import EventList from './components/EventList'


export default function ConditionEvents() {
    const postConditionEvent = useHista(state => state.postConditionEvent)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onClickAddSymptom = async () => {
        setLoading(true)
        const id = await postConditionEvent()
        setLoading(false)
        if (id) {
            navigate(`${url.CONDITION_EVENTS}/${id}`)
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