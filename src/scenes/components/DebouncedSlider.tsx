import Box from '@mui/material/Box';
import useDebounce from '../../hooks/useDebounce';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function DebouncedSlider(props: {
    initialValue: number
    onChange: (value: number) => void | Promise<void>
    label: string
    min?: number
    max?: number
    muiColorMapping?: (value: number) => 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    colorMapping?: (value: number) => string
    icon?: JSX.Element
    iconMapping?: (value: number) => JSX.Element
}) {
    const [value, setValue] = useState(props.initialValue)
    useEffect(() => {
        setValue(props.initialValue)
    }, [props.initialValue])

    const handleSliderChange = (_: Event, v: number | Array<number>) => {
        setValue(v as number)
    }
    const debouncedSliderValue = useDebounce(value, 300)

    useDidUpdateEffect(() => {
        props.onChange(debouncedSliderValue)
    }, [debouncedSliderValue])


    return (
        <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>{props.label}</Typography>
            <Stack spacing={3} direction='row' alignItems='center'>
                {props.icon}
                {props.iconMapping ? props.iconMapping(value) : <></>}
                <Slider
                    marks
                    value={value}
                    onChange={handleSliderChange}
                    max={props.max || 5}
                    min={props.min || 0}
                    color={props.muiColorMapping ? props.muiColorMapping(value) : 'primary'}
                    sx={{
                        '& .MuiSlider-thumb': {
                            backgroundColor: props.colorMapping ? props.colorMapping(value) : 'primary',
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: props.colorMapping ? props.colorMapping(value) : 'primary',
                        },
                    }}
                />
            </Stack>
        </Box>
    )
}