import useHista from "../../store/store"
import { Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { CONDITON_EVENTS_URL } from "../../api/urls"
import EventList from "./components/EventList"

export default function ConditionEvents() {
    const postConditionEvent = useHista(state => state.postConditionEvent)
    const navigate = useNavigate()

    const onClick = async () => {
        const id = await postConditionEvent()
        if (id) {
            navigate(CONDITON_EVENTS_URL + "/" + String(id))
        }
    }

    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <Button onClick={onClick}>
                Neues Symtpom
            </Button>
            <EventList />
        </Container>
    )
}