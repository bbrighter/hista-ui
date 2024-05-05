import { FormControl, FormLabel } from "@mui/material";
import { DateTimePicker, DateTimeValidationError, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/de";

export default function DateInput(props: {
    title: string
    date: Date
    onChange: ((value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void)
}) {

    return (
        <>
            <FormLabel>{props.title}</FormLabel>
            <FormControl sx={{ mt: '2rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DateTimePicker
                        value={dayjs(props.date)}
                        onChange={props.onChange}
                    />
                </LocalizationProvider>
            </FormControl>
        </>
    )
}