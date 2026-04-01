import { useAppNavigate } from "../../../hooks/useNavigate"
import { services } from "../../../store"
import { OverviewList } from "../../components"

export const NotesList = ({ notes }: {notes: Array<{id: number, date: Date, secondary: string}>}) => {
  const navigate = useAppNavigate()
  const onClick = (id: number) => navigate.to.noteDetails(id)

  const onDelete = async (id: number) => await services.notes.delete(id)
    
  return (
    <OverviewList
      getData={services.notes.list}
      items={notes}
      onClick={onClick}
      onDelete={onDelete}
    />
  )
}