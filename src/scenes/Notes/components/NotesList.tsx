import { actions } from "../../../actions"
import { useAppNavigate } from "../../../hooks/useNavigate"
import { OverviewList } from "../../components"

export const NotesList = ({ notes }: {notes: Array<{id: number, date: Date, secondary: string}>}) => {
  const navigate = useAppNavigate()
  const onClick = (id: number) => navigate.to.noteDetails(id)
    
  return (
    <OverviewList
      getData={actions.notes.list}
      items={notes}
      onClick={onClick}
      onDelete={actions.notes.delete}
    />
  )
}