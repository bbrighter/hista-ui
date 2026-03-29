import { useAppNavigate } from "../../../hooks/useNavigate"
import { services, useConditionEvents } from "../../../store"
import { OverviewList } from "../../components"



export default function EventList() {
  const getConditionEvents = services.conditionEvents.list
  const deleteConditionEvent = services.conditionEvents.delete
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
