import useHista from "../../store/store"
import { Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import EventList from "./components/EventList"
import SickIcon from '@mui/icons-material/Sick';
import { url } from "../../constants"

export default function ConditionEvents() {
    const postConditionEvent = useHista(state => state.postConditionEvent)
    const navigate = useNavigate()

    const onClick = async () => {
        const id = await postConditionEvent()
        if (id) {
            navigate(url.CONDITION_EVENTS + "/" + String(id))
        }
    }

    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <Button
                startIcon={<SickIcon />}
                onClick={onClick}
                variant="outlined"
            >
                Neues Symtpom
            </Button>
            <EventList />
        </Container>
    )
}