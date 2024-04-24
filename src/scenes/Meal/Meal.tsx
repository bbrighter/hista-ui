import { Container, FormControl, FormGroup, FormLabel } from "@mui/material";
import useHista from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddFood from "./components/AddFood";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "dayjs/locale/de";
import FoodList from "./components/FoodList";


export default function Meal() {
    const getMeal = useHista(state => state.getMeal)
    const setDate = useHista(state => state.setDate)
    const meal = useHista(state => state.meal)
    const params = useParams<{ id: string }>()

    useEffect(() => {
        getMeal(Number(params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container sx={{ padding: '2rem' }}>

            <FormGroup>
                <FormLabel>Mahlzeit</FormLabel>
                <FormControl sx={{ mt: '2rem' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DateTimePicker
                            value={dayjs(meal.date)}
                            onChange={(e) => setDate(e?.toISOString() || new Date().toISOString())}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl>
                    <AddFood />
                </FormControl>
            </FormGroup>
            <FoodList />
        </Container>
    )
}