
import AddIcon from '@mui/icons-material/Add';
import useHista from '../../../store/store';
import { useState } from 'react';
import TextFieldSaveAndAbort from './TextFieldSaveAndAbort';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function AddSymptomCategory() {
    const [open, setOpen] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const postSymptomCategory = useHista(state => state.postSymptomCategory)
    const isCategoryNameAvailable = useHista(state => state.isCategoryNameAvailable)

    const closeModal = () => setOpen(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }


    const onSave = async () => {
        setIsLoading(true)
        postSymptomCategory(categoryName).finally(() => setIsLoading(false))
    }

    return (
        <>
            <Modal
                open={open}
                onClose={closeModal}
            >
                <Box sx={style}>
                    <TextFieldSaveAndAbort
                        label={'Kategoriename'}
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        isLoading={isLoading}
                        isSaveable={isCategoryNameAvailable(categoryName)}
                        onSave={onSave}
                        onCancel={closeModal}
                        size={'medium'}
                    />
                </Box>
            </Modal>
            <Fab
                color='primary'
                variant='extended'
                onClick={() => setOpen(!open)}
            >
                <AddIcon /> Neue Kategorie
            </Fab>
        </>
    )
}