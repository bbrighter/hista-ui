import { Container, FormControl, FormGroup } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useHista from "../../store/store";
import DateInput from "../components/DateIpnut";

export default function ConditionEvent() {
    const getConditionEvent = useHista(state => state.getConditionEvent)
    const conditionEvent = useHista(state => state.conditionEvent)
    const params = useParams<{ id: string }>()

    useEffect(() => { getConditionEvent(Number(params.id)) },
        [getConditionEvent, params.id])

    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <DateInput
                    date={conditionEvent.date}
                    title="Symptome"
                    onChange={(v, c) => console.log(v, c)}
                />
                <FormControl>
                    Add symptom
                </FormControl>
            </FormGroup>
            {conditionEvent.conditions.map(c => (<>{c.id}</>))}
        </Container>
    )
}