import { useEffect } from "react"
import useHista from "../../store/store"
import { Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import MealList from "./components/MealList"
import { MEAL_URL } from "../../api/urls"
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Meals() {
    const navigate = useNavigate()
    const getMeals = useHista(state => state.getMeals)
    const postMeal = useHista(state => state.postMeal)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getMeals() }, [])

    const onCreate = async () => {
        const id = await postMeal()
        if (id) {
            navigate(MEAL_URL + '/' + id)
        }
    }


    return (
        <Container sx={{ padding: '2rem' }}>
            <Button
                startIcon={<RestaurantIcon />}
                variant='outlined'
                onClick={onCreate}
            >Neue Mahlzeit</Button>
            <MealList />
        </Container>
    )
}
