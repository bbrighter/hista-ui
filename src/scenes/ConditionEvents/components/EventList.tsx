import { actions } from "../../../actions"
import { useAppNavigate } from "../../../hooks/useNavigate"
import { useConditionEvents } from "../../../store"
import { OverviewList } from "../../components"



export default function EventList() {
  const getConditionEvents = actions.conditionEvents.list
  const deleteConditionEvent = actions.conditionEvents.delete
  const events = useConditionEvents()
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
      onSetNow={undefined}
    />
  )
}
