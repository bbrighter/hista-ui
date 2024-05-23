import { FormControl, FormLabel } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/de";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect";

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
        <>
            <FormLabel>{props.title}</FormLabel>
            <FormControl sx={{ mt: '2rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    {hideTime && <DatePicker
                        value={date}
                        onChange={handleInputChange}
                    />}
                    {!hideTime &&
                        <DateTimePicker
                            value={date}
                            onChange={handleInputChange}
                        />}
                </LocalizationProvider>
            </FormControl>
        </>
    )
}