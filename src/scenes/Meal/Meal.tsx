import { Container, FormControl, FormGroup } from "@mui/material";
import useHista from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddFood from "./components/AddFood";
import FoodList from "./components/FoodList";
import DateInput from "../components/DateIpnut";


export default function Meal() {
    const getMeal = useHista(state => state.getMeal)
    const setDate = useHista(state => state.setMealDate)
    const meal = useHista(state => state.meal)
    const params = useParams<{ id: string }>()

    useEffect(() => {
        getMeal(Number(params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <DateInput
                    title="Mahlzeit"
                    date={meal.date}
                    onChange={(e) => setDate(e?.toISOString() || new Date().toISOString())}
                />
                <FormControl>
                    <AddFood />
                </FormControl>
            </FormGroup>
            <FoodList />
        </Container>
    )
}