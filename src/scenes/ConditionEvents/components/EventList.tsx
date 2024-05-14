import useHista from "../../../store/store";
import { useEffect } from "react";
import OverviewList from "../../components/OverviewList";
import { useNavigate } from "react-router-dom";
import { url } from "../../../constants";

export default function EventList() {
    const getConditionEvents = useHista(state => state.getConditionEvents)
    const deleteConditionEvent = useHista(state => state.deleteConditionEvent)
    const events = useHista(state => state.conditionEvents)

    const navigate = useNavigate()

    useEffect(() => { getConditionEvents() }, [getConditionEvents])

    const onClick = (id: number) => {
        navigate(url.CONDITION_EVENTS + "/" + id)
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