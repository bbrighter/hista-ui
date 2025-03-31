import TextField from '@mui/material/TextField';
import useHista from '../../../store/store';
import Divider from '@mui/material/Divider';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import { useDidUpdateEffect } from '../../../hooks/useDidUpdateEffect';

export default function HeadacheDescription() {
    const firstUpdate = useRef(true)
    const description = useHista(state => state.headache.description)
    const patchDescription = useHista(state => state.patchHeadacheDescription)

    const [textInput, setTextInput] = useState(description)
    const [isDirty, setIsDirty] = useState(false)
    const debouncedValue = useDebounce(textInput, 1000)

    useEffect(() => {
        setTextInput(description)
    }, [description])

    useDidUpdateEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        patchDescription(debouncedValue).then(() => setIsDirty(false))
    }, [debouncedValue])


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
        setIsDirty(true)
    }

    return (
        <>
            <Divider sx={{ pt: 1 }} />
            <TextField
                sx={{ mt: 2 }}
                label="Zusätzliche Infos"
                multiline
                minRows={3}
                value={textInput}
                fullWidth
                color={isDirty ? 'secondary' : 'primary'}
                onChange={onChange}

            />
        </>

    )
}