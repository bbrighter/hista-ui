import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function TextFieldSaveAndAbort(props: {
  label: string
  value: string
  isSaveable: (value: string) => boolean
  onSave: (v: string) => Promise<void>
  onCancel: (e: React.MouseEvent) => void
  size: 'small' | 'medium'
}) {
  const [value, setValue] = useState(props.value)
  const [isLoading, setIsLoading] = useState(false)

  const onSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)
    await props.onSave(value)
    setIsLoading(false)
  }

  const onCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(props.value)
    props.onCancel(e)
  }

  return (
    <>
      <TextField
        size={props.size}
        label={props.label}
        value={value}
        onChange={e => setValue(e.target.value)}
        onClick={e => e.stopPropagation()}
      />
      <ButtonGroup sx={{ pl: 2, pt: 1 }}>
        <IconButton
          disabled={!props.isSaveable(value)}
          color="success"
          loading={isLoading}
          onClick={onSave}
          title="Umbenennen speichern"
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          onClick={onCancel}
          color="error"
          title="Umbenennen abbrechen"
        >
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
    </>
  )
}
