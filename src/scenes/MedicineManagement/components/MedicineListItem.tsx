import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useEffect, useRef, useState } from "react"

import { actions } from "../../../actions";
import { Medicine } from "../../../store"
import { ArchiveButton } from "../../components/ArchiveButton"
import { Icons } from "../../components/Icons";
import TextFieldSaveAndAbort from "../../components/TextFieldSaveAndAbort"
import { useIsNameUnique } from "./useIsNameUnique";

type DropIndicator = 
  {overId?: number, nextId?: number, prevId?: number, edge: "bottom" | "top"}

type Props = {
  medicine: Medicine
  dropIndicator: DropIndicator
  onDragOverItem: (overId: number, edge: "bottom" | "top") => void
  onDragItemLeave: () => void
  onDrop: () => void
  onDragStart: (id: number) => void
}

export const MedicineListItem = ({ medicine, dropIndicator, onDragOverItem, onDragItemLeave, onDragStart, onDrop }: Props) => {
  const ref = useRef<HTMLLIElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const onEdit = () => setIsEditing(true)

  const onArchive =(id: number) =>  actions.medicines.archive(id)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    return draggable({ 
      element: el,
      onDragStart: () => {
        onDragStart(medicine.id)
        setDragging(true)
      },
      onDrop: () => {
        onDrop()
        setDragging(false)
      },
    })
  },[medicine.id])


  useEffect(() => {
    const el = ref.current
    if (!el) return

    return dropTargetForElements({
      element: el,
      onDrag: ({ location }) => {
        const rect = el.getBoundingClientRect()
        const pointerY = location.current.input.clientY
        const isTopHalf = rect.bottom - pointerY > rect.height / 2
        const edge = isTopHalf ? "top" : "bottom"
        if (dropIndicator?.overId != medicine.id || dropIndicator?.edge != edge) {
          onDragOverItem(medicine.id, edge)
        }
      },
      onDragLeave: onDragItemLeave,
      onDrop: onDrop,
    })
  }, [medicine.id, dropIndicator])

  const getStyle = () => {
    if (dragging) {
      return {
        position: "relative",
        transition: "box-shadow 150ms ease, transform 150ms ease, opacity 150ms ease",
        ...(dragging && {
          zIndex: 10,
          boxShadow: 6,
          transform: "scale(1.02)",
          opacity: 0.3,
          cursor: "grabbing",
        }),
      }}

    return {}
  }


    
  return (
    <ListItem 
      sx={getStyle()}
      ref={ref}
      secondaryAction={(
        <ButtonGroup>
          <IconButton onClick={onEdit} data-testid="editButton">
            <Icons.actions.edit />
          </IconButton>
          <ArchiveButton id={medicine.id} isArchived={medicine.isArchived} onArchive={onArchive} />
        </ButtonGroup>
      )}
    >
      {isEditing && <EditMedicineName id={medicine.id} name={medicine.name} onCancel={() => setIsEditing(false)} />}
      {!isEditing && <ListItemText primary={medicine.name} sx={medicine.isArchived ? { color: "gray" } :{}}/>}
      <Divider dropIndicator={dropIndicator} medicine={medicine}/>
    </ListItem>
  )
}


const EditMedicineName = ({ id, name, onCancel }: Partial<Medicine> & {onCancel: () => void}) => {
  const isSaveable = useIsNameUnique()
  if (!id || !name) return
  const onSave = async (v: string) => {
    await actions.medicines.rename(id, v)
    onCancel()
  }

  return (<TextFieldSaveAndAbort 
    label="Medikament" 
    value={name} 
    isSaveable={isSaveable} 
    onSave={onSave}
    onCancel={onCancel} 
    size="small"/>
  )
}

const Divider = ({ dropIndicator, medicine }: {dropIndicator: DropIndicator, medicine: Medicine}) => {
  if (dropIndicator?.overId == medicine.id) {
    return (<Box sx={{
      position: "absolute",
      left: 16,
      right: 16,
      height: 3,
      bgcolor: "primary.main",
      borderRadius: 2,
      ...(dropIndicator?.edge == "bottom" ? { bottom: 0 } : { top:0 }),
    }}/>) 
  } else {
    return null
  }
}