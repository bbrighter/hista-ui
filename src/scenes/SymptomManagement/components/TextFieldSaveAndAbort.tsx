import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';


export default function TextFieldSaveAndAbort(props: {
    label: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    isLoading: boolean
    isSaveable: boolean
    onSave: () => Promise<void>
    onCancel: () => void
    size: 'small' | 'medium'
}) {

    const onSave = async (e: React.MouseEvent) => {
        e.stopPropagation()
        await props.onSave()
    }

    const onCancel = (e: React.MouseEvent) => {
        e.stopPropagation()
        props.onCancel()
    }

    return (
        <>
            <TextField
                size={props.size}
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                onClick={(e) => e.stopPropagation()}
            />
            <ButtonGroup sx={{ pl: 2, pt: 1 }}>
                <IconButton
                    disabled={!props.isSaveable}
                    color={'success'}
                    loading={props.isLoading}
                    onClick={onSave}
                >
                    <SaveIcon />
                </IconButton>
                <IconButton
                    onClick={onCancel}
                    color='error'>
                    <CloseIcon />
                </IconButton>
            </ButtonGroup>
        </>
    )
}