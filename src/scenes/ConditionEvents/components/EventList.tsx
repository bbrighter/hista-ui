import { useAppNavigate } from '../../../hooks/useNavigate';
import useHista from '../../../store/store';
import OverviewList from '../../components/OverviewList';

export default function EventList() {
    const getConditionEvents = useHista(state => state.getConditionEvents)
    const deleteConditionEvent = useHista(state => state.deleteConditionEvent)
    const events = useHista(state => state.conditionEvents)
    const navigate = useAppNavigate()

    const onClick = (id: number) => {
        navigate.to.conditionEventDetails(id)
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