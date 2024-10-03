import { Box, Slider, Stack, Typography } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';
import { useEffect, useState } from 'react';

export default function DebouncedSlider(props: {
    initialValue: number
    onChange: (value: number) => void | Promise<void>
    label: string
    min?: number
    max?: number
    colorMapping?: (value: number) => 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
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
                    color={props.colorMapping ? props.colorMapping(value) : 'primary'}
                />
            </Stack>
        </Box>
    )
}