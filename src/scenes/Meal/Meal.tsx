import { Container, FormControl, FormGroup, Skeleton } from "@mui/material";
import useHista from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddFood from "./components/AddFood";
import FoodList from "./components/FoodList";
import MealSettings from "./components/MealSettings";


export default function Meal() {
    const getMeal = useHista(state => state.getMeal)
    const isLoading = useHista(state => state.meal.isLoading)
    const params = useParams<{ id: string }>()

    useEffect(() => {
        getMeal(Number(params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <MealSettings />
                <FormControl>
                    <AddFood />
                </FormControl>
            </FormGroup>
            {isLoading ? <Skeleton variant='rectangular' height={'3rem'} /> : <FoodList />}
        </Container>
    )
}