import { url } from '../../../constants';
import { useNavigateWithPiid } from '../../../hooks/useNavigate';
import useHista from '../../../store/store';
import OverviewList from '../../components/OverviewList';

export default function EventList() {
    const getConditionEvents = useHista(state => state.getConditionEvents)
    const deleteConditionEvent = useHista(state => state.deleteConditionEvent)
    const events = useHista(state => state.conditionEvents)
    const navigate = useNavigateWithPiid()

    const onClick = (id: number) => {
        navigate(url.CONDITION_EVENTS(id))
    }
    const onDelete = async (id: number) => {
        await deleteConditionEvent(id)
    }

    return (
        <OverviewList
            items={events}
            onClick={onClick}
            onDelete={onDelete}
            getData={getConditionEvents}
        />
    )
}