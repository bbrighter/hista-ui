import List from "@mui/material/List"
import { useState } from "react"

import { medicinesService, useMedicine } from "../../../store"
import { MedicineListItem } from "./MedicineListItem"
import { NoData } from "./NoData"

export const MedicineList = () => {
  const [dropIndicator, setDropIndicator] = useState<{overId?: number, nextId?: number, prevId?: number, edge: "top" | "bottom"} | null>(null)
  const [draggedId, setDraggedId] = useState<null | number>(null)
  const medicines = useMedicine()

  const onDragOverItem = (overId: number, edge: "bottom" | "top") => {
    const medIndex = medicines.findIndex(m => m.id == overId)
    const prevId = edge == "bottom" ? medicines[medIndex].id : medicines[medIndex-1]?.id
    const nextId = edge == "bottom" ? medicines[medIndex + 1]?.id : medicines[medIndex].id

    setDropIndicator({ overId: overId, nextId: nextId, prevId: prevId, edge: edge })
  }

  const onDrop = async () => {
    if (draggedId == null) return

    await medicinesService.reorderMedicine(draggedId, dropIndicator.prevId, dropIndicator.nextId)
    setDraggedId(null)
    setDropIndicator(null)
  }

  const onDragStart = (id: number) => {
    setDraggedId(id)
  }
  
  return (
    <>
      <NoData/> 
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

