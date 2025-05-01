import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import TextFieldSaveAndAbort from './TextFieldSaveAndAbort';
import Typography from '@mui/material/Typography';
import { SymptomCategory } from '../../../store/symptom/symptom';
import useHista from '../../../store/store';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


export default function AccordionCategory(props: {
    category: SymptomCategory
}) {
    const [mode, setMode] = useState<'default' | 'editing' | 'deleting'>('default')
    const [isLoading, setIsLoading] = useState(false)
    const categories = useHista(state => state.symptoms)
    const changeSymptomCategoryName = useHista(state => state.changeSymptomCategoryName)
    const deleteCategory = useHista(state => state.deleteCategory)

    const isSaveable = (v: string): boolean => (!categories.some(c => c.categoryName == v))
    const isDeletable = props.category.symptoms.length == 0
    const onSave = async (v: string) => {
        setIsLoading(true)
        await changeSymptomCategoryName(props.category.categoryId, v)
        setIsLoading(false)
        setMode('default')
    }

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsLoading(true)
        await deleteCategory(props.category.categoryId)
        setIsLoading(false)
        setMode('default')
    }

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMode('default')
    }

    return (
        <AccordionSummary expandIcon={<ExpandMoreIcon />} component='div'>
            {mode == 'default' &&
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Typography variant='h6' sx={{ pt: '12px', pb: '12px' }}>
                        {props.category.categoryName} ({props.category.symptoms.length})
                    </Typography>
                    <ButtonGroup>
                        <IconButton
                            onClick={() => setMode('editing')}
                            title='Umbenennen'
                        >
                            <CreateIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => setMode('deleting')}
                            disabled={!isDeletable}
                            color='error'
                            title='Löschen'
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ButtonGroup>
                </Box>
            }
            {mode == 'editing' &&
                <TextFieldSaveAndAbort
                    label='Kategoriename'
                    isSaveable={isSaveable}
                    onCancel={onCancel}
                    onSave={onSave}
                    size='medium'
                    value={props.category.categoryName}
                />
            }
            {mode == 'deleting' &&
                <>
                    <Typography variant='h6' sx={{ pt: '12px', pb: '12px' }}>
                        {props.category.categoryName} wirklich löschen?
                    </Typography>
                    <ButtonGroup sx={{ pl: 2 }}>
                        <IconButton
                            loading={isLoading}
                            onClick={onDelete}
                            title='Löschen bestätigen'
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            onClick={onCancel}
                            color='error'
                            title='Löschen abbrechen'
                        >
                            <CloseIcon />
                        </IconButton>
                    </ButtonGroup>
                </>
            }
        </AccordionSummary >
    )
}