// import { IconButton, List, ListItem, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
// import styled from "@emotion/styled"
// import DeleteIcon from '@mui/icons-material/Delete';
import useHista from "../../../store/store";
import { useEffect } from "react";
// import { MetaMeal } from "../../../store/meals";
import OverviewList from "../../components/OverviewList";
import { MEAL_URL } from "../../../api/urls";

export default function MealList() {
    const getMeals = useHista(state => state.getMeals)
    const meals = useHista(state => state.meals)
    const deleteMeal = useHista(state => state.deleteMeal)
    const navigate = useNavigate()

    const onClick = (id: number) => {
        navigate(MEAL_URL + "/" + id)
    }

    const onDelete = async (id: number) => {
        await deleteMeal(id)
    }

    useEffect(() => { getMeals() }, [getMeals])
    return (
        <OverviewList
            items={meals}
            onClick={onClick}
            onDelete={onDelete}
        />
    )
}