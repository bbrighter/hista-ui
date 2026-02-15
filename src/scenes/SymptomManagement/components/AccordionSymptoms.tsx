import CloseIcon from '@mui/icons-material/Close'
import CreateIcon from '@mui/icons-material/Create'
import SaveIcon from '@mui/icons-material/Save'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import useHista from '../../../store/store'
import { Symptom, SymptomCategory } from '../../../store/symptom/symptom'
import TextFieldSaveAndAbort from '../../components/TextFieldSaveAndAbort'

export default function AccordionSymptoms(props: {
  category: SymptomCategory
}) {
  return (
    <AccordionDetails>
      <List>
        {Array.isArray(props.category.symptoms)
          ? props.category.symptoms.map(s => (
            <SymptomAccordionEntry
              key={s.id}
              symptom={s}
            />
          ))
          : null}
      </List>
    </AccordionDetails>
  )
}

function SymptomAccordionEntry(props: {
  symptom: Symptom
}) {
  const [mode, setMode] = useState<'default' | 'editing' | 'swapping'>('default')
  const [targetCategoryId, setTargetCategoryId] = useState<number>(props.symptom.categoryId)
  const [isLoading, setIsLoading] = useState(false)
  const categories = useHista(state => state.symptoms)

  const isSymptomNameAvailable = useHista(state => state.isSymptomNameAvailable)
  const changeSymptomName = useHista(state => state.changeSymptomName)
  const changeSymptomCategory = useHista(state => state.changeSymptomCategory)

  const onSave = async (v: string) => {
    await changeSymptomName(props.symptom.id, v)
    setMode('default')
  }

  const onSwap = (e: SelectChangeEvent<number>) => {
    setTargetCategoryId(e.target.value as unknown as number)
  }
  const onSwapConfirm = async () => {
    setIsLoading(true)
    await changeSymptomCategory(props.symptom.id, props.symptom.categoryId, targetCategoryId)
    setIsLoading(false)
    setMode('default')
  }
  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setMode('default')
  }

  return (
    <ListItem>
      {mode == 'default'
        && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: '3px' }}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant="body1">
              {props.symptom.name}
            </Typography>
            <ButtonGroup>
              <IconButton
                title="Umbenennen"
                onClick={() => setMode('editing')}
              >
                <CreateIcon />
              </IconButton>
              <IconButton
                onClick={() => setMode('swapping')}
                title="Tauschen"
              >
                <SwapVertIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        )}
      {mode == 'editing'
        && (
          <TextFieldSaveAndAbort
            label="Symptomname"
            value={props.symptom.name}
            onSave={onSave}
            isSaveable={v => isSymptomNameAvailable(v, props.symptom.categoryId)}
            size="small"
            onCancel={onCancel}
          />
        )}
      {mode == 'swapping'
        && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body1">
              {props.symptom.name}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <FormControl>
                <InputLabel>Zielkategorie</InputLabel>
                <Select
                  label="Zielkategorie"
                  value={targetCategoryId}
                  onChange={onSwap}
                >
                  {categories.map(c => (
                    <MenuItem
                      key={c.categoryId}
                      value={c.categoryId}
                    >
                      {c.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ButtonGroup sx={{ pl: 2, pt: 1 }}>
                <IconButton
                  loading={isLoading}
                  onClick={onSwapConfirm}
                  color="success"
                  title="Tauschen bestätigen"
                  disabled={targetCategoryId === props.symptom.categoryId}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  onClick={onCancel}
                  color="error"
                  title="Tauschen abbrechen"
                >
                  <CloseIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
          </Box>
        )}
    </ListItem>
  )
}
