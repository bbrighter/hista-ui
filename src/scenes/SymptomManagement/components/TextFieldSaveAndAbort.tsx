import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Box from '@mui/material/Box';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SymptomCategory } from '../../../store/symptom/symptom';


export default function TextFieldSaveAndAbort(props: {
    label: string
    value: string
    isSaveable: (value: string) => boolean
    isDeletable?: boolean
    onSave: (v: string) => Promise<void>
    onDelete?: () => Promise<void>
    onSwap?: (targetId: number) => Promise<void>
    swapLabel?: string
    size: 'small' | 'medium'
    isHeader?: boolean
    numberOfObjects?: number
    categoryId?: number
    categories?: SymptomCategory[]
    initiallyEdit?: boolean
}) {
    const [mode, setMode] = useState<'default' | 'editing' | 'deleting' | 'swapping'>(props.initiallyEdit ? 'editing' : 'default')
    const [value, setValue] = useState(props.value)
    const [targetCategoryId, setTargetCategoryId] = useState(props.categoryId)
    const [isLoading, setIsLoading] = useState(false)

    const categories = props.categories

    const onSave = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLoading(true)
        await props.onSave(value)
        setMode('default')
        setIsLoading(false)
    }

    const onDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLoading(true)
        await props.onDelete()
        setMode('default')
        setIsLoading(false)
    }

    const onSwap = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLoading(true)
        await props.onSwap(targetCategoryId)
        setMode('default')
        setIsLoading(false)
    }

    const onCancel = (e: React.MouseEvent) => {
        e.stopPropagation()
        setMode('default')
        setValue(props.value)
    }


    const onClickRename = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMode('editing')
    }

    const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMode('deleting')
    }

    const onClickSwap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMode('swapping')
    }

    const onSelectChange = (e: SelectChangeEvent) => {
        e.stopPropagation()
        setTargetCategoryId(e.target.value as unknown as number)
    }


    const isEditing = mode === 'editing'
    const isDeleting = mode === 'deleting'
    const isDefault = mode === 'default'
    const isSwapping = mode === 'swapping'

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {isDefault &&
                <>
                    <Typography sx={{ pt: '12px', pb: '12px' }} variant={props.isHeader ? 'h6' : 'body1'}>
                        {props.value}
                        {props.numberOfObjects >= 0 && ` (${props.numberOfObjects})`}
                    </Typography>
                    <ButtonGroup>
                        <IconButton
                            onClick={onClickRename}
                            title='Umbenennen'
                        >
                            <CreateIcon />
                        </IconButton>
                        {props.onDelete &&
                            <IconButton
                                onClick={onClickDelete}
                                disabled={props.isDeletable === false}
                                color='error'
                                title='Löschen'
                            >
                                <DeleteIcon />
                            </IconButton>}
                        {props.onSwap &&
                            <IconButton
                                onClick={onClickSwap}
                                title='Tauschen'
                            >
                                <SwapVertIcon />
                            </IconButton>
                        }
                    </ButtonGroup>
                </>
            }
            {isEditing &&
                <>
                    <TextField
                        size={props.size}
                        label={props.label}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <ButtonGroup sx={{ pl: 2, pt: 1 }}>
                        <IconButton
                            disabled={!props.isSaveable(value)}
                            color={'success'}
                            loading={isLoading}
                            onClick={onSave}
                            title='Speichern'
                        >
                            <SaveIcon />
                        </IconButton>
                        <IconButton
                            onClick={onCancel}
                            color='error'
                            title='Umbenennen abbrechen'
                        >
                            <CloseIcon />
                        </IconButton>
                    </ButtonGroup>
                </>}
            {isDeleting &&
                <>
                    <Typography>
                        {props.value} wirklich löschen?
                    </Typography>
                    <ButtonGroup sx={{ pl: 2, pt: 1 }}>
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
            {isSwapping &&
                <>
                    <Typography>
                        {props.value}
                    </Typography>
                    <FormControl>
                        <InputLabel>{props.swapLabel}</InputLabel>
                        <Select
                            label={props.swapLabel}
                            value={targetCategoryId as unknown as string}
                            onChange={onSelectChange}
                        >
                            {categories.map(c => (
                                <MenuItem
                                    key={c.categoryId}
                                    value={c.categoryId}
                                >{c.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <ButtonGroup sx={{ pl: 2, pt: 1 }}>
                        <IconButton
                            loading={isLoading}
                            onClick={onSwap}
                            color='success'
                            title='Tauschen bestätigen'
                            disabled={targetCategoryId === props.categoryId}
                        >
                            <SaveIcon />
                        </IconButton>
                        <IconButton
                            onClick={onCancel}
                            color='error'
                            title='Tauschen abbrechen'
                        >
                            <CloseIcon />
                        </IconButton>
                    </ButtonGroup>
                </>
            }
        </Box>
    )
}