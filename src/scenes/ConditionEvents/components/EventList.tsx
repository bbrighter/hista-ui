import useHista from "../../../store/store";
import { useEffect } from "react";
import OverviewList from "../../components/OverviewList";
import { useNavigate } from "react-router-dom";
import { CONDITON_EVENTS_URL } from "../../../api/urls";

export default function EventList() {
    const getConditionEvents = useHista(state => state.getConditionEvents)
    const deleteConditionEvent = useHista(state => state.deleteConditionEvent)
    const events = useHista(state => state.conditionEvents)

    const navigate = useNavigate()

    useEffect(() => { getConditionEvents() }, [getConditionEvents])

    const onClick = (id: number) => {
        navigate(CONDITON_EVENTS_URL + "/" + id)
    }
    const onDelete = async (id: number) => {
        await deleteConditionEvent(id)
    }

    return (
        <OverviewList
            items={events}
            onClick={onClick}
            onDelete={onDelete}
        />
    )
}