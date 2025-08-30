import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHista from '../../store/store';
import DateInput from '../components/DateInput';
import AddCondition from './components/AddCondition';
import ConditionList from './components/ConditionList';

export default function ConditionEvent() {
    const getConditionEvent = useHista(state => state.getConditionEvent)
    const setConditionEventDate = useHista(state => state.setConditionEventDate)
    const conditionEvent = useHista(state => state.conditionEvent)
    const params = useParams<{ id: string }>()

    useEffect(() => { getConditionEvent(Number(params.id)) },
        [getConditionEvent, params.id])

    const onChange = (v: dayjs.Dayjs | null) => {
        if (v != null) {
            setConditionEventDate(v.toDate())
        }
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <DateInput
                    date={conditionEvent.date}
                    title="Symptome"
                    onChange={onChange}
                />
                <FormControl>
                    <AddCondition />
                </FormControl>
            </FormGroup>
            <ConditionList />
        </Container>
    )
}