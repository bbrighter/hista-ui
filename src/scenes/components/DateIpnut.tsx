import { FormControl, FormLabel } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/de";
import { useEffect, useState } from "react";

export default function DateInput(props: {
    title: string
    date: Date
    onChange: ((value: dayjs.Dayjs | null) => void)
}) {
    const date = dayjs(props.date)
    const [isChanged, setIsChanged] = useState(false)
    const [debounceInputValue, setDebounceInputValue] = useState(date)
    const [inputValue, setInputValue] = useState(date)

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounceInputValue(inputValue)
        }, 500)
        return () => clearTimeout(delayInputTimeoutId)
    }, [inputValue, date])

    useEffect(() => {
        if (isChanged) {
            props.onChange(debounceInputValue)
            setIsChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceInputValue])

    const handleInputChange = (value: dayjs.Dayjs | null) => {
        if (value != null) {
            setInputValue(value)
            setIsChanged(true)
        }
    }

    return (
        <>
            <FormLabel>{props.title}</FormLabel>
            <FormControl sx={{ mt: '2rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DateTimePicker
                        value={date}
                        onChange={handleInputChange}
                    />
                </LocalizationProvider>
            </FormControl>
        </>
    )
}