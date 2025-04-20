
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function DateInput(props: {
    title: string
    date: Date
    onChange: ((value: dayjs.Dayjs | null) => void)
    hideTime?: boolean
}) {
    const date = dayjs(props.date)
    const [inputValue, setInputValue] = useState(date)
    const debouncedInputValue = useDebounce(inputValue, 500)

    useDidUpdateEffect(() => {
        props.onChange(debouncedInputValue)
    }, [debouncedInputValue])

    const handleInputChange = (value: dayjs.Dayjs | null) => {
        if (value != null) {
            setInputValue(value)
        }
    }
    const hideTime = props.hideTime != undefined && props.hideTime

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            {hideTime && <DatePicker
                sx={{ width: '99%' }}
                label={props.title}
                value={date}
                onChange={handleInputChange}
            />}
            {!hideTime &&
                <DateTimePicker
                    sx={{ width: '99%' }}
                    label={props.title}
                    value={date}
                    onChange={handleInputChange}
                />}
        </LocalizationProvider>
    )
}