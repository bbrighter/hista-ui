import EditIcon from '@mui/icons-material/Edit'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'

import { ArchiveButton } from './ArchiveButton'
import { EditIngredientName } from './EditIngredientName'

export const IngredientListItem = ({ name, id, isArchived }: { name: string, id: number, isArchived: boolean }) => {
    const [isEditing, setIsEditing] = useState(false)

    const onEdit = () => setIsEditing(!isEditing)

    return (
        <ListItem secondaryAction={(
            <ButtonGroup>
                <IconButton onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <ArchiveButton id={id} isArchived={isArchived} />
            </ButtonGroup>
          )}
        >
            {isEditing && <EditIngredientName id={id} name={name} onCancel={() => setIsEditing(false)} />}
            {!isEditing && <ListItemText primary={name} />}
        </ListItem>
    )
}
