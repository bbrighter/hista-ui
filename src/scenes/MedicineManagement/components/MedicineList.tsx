import List from "@mui/material/List"
import { useState } from "react"

import { actions } from "../../../actions"
import useHista from "../../../store/store"
import { NoData } from "../../components"
import { MedicineListItem } from "./MedicineListItem"


export const MedicineList = () => {
  const [dropIndicator, setDropIndicator] = useState<{overId?: number, nextId?: number, prevId?: number, edge: "top" | "bottom"} | null>(null)
  const [draggedId, setDraggedId] = useState<null | number>(null)
  const medicines = useHista(state => state.medicines)

  const onDragOverItem = (overId: number, edge: "bottom" | "top") => {
    const medIndex = medicines.findIndex(m => m.id == overId)
    const prevId = edge == "bottom" ? medicines[medIndex].id : medicines[medIndex-1]?.id
    const nextId = edge == "bottom" ? medicines[medIndex + 1]?.id : medicines[medIndex].id

    setDropIndicator({ overId: overId, nextId: nextId, prevId: prevId, edge: edge })
  }

  const onDrop = async () => {
    if (draggedId == null) return

    await actions.medicines.reorder(draggedId, dropIndicator?.prevId, dropIndicator?.nextId)
    setDraggedId(null)
    setDropIndicator(null)
  }

  const onDragStart = (id: number) => {
    setDraggedId(id)
  }
  
  return (
    <>
      <NoData show={medicines.length == 0} src="/pills.svg"/> 
      <List>
        {medicines.map(m => (
          <MedicineListItem 
            key={m.id} 
            medicine={m} 
            dropIndicator={dropIndicator}
            onDragOverItem={onDragOverItem}
            onDragItemLeave={() => setDropIndicator(null)}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </List>
    </>
  )
  
}

