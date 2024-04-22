import { IconButton, List, ListItem, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import DeleteIcon from '@mui/icons-material/Delete';
import useHista from "../../../store/store";
import { useEffect } from "react";
import { MetaMeal } from "../../../store/meals";

export default function MealList() {
    const getMeals = useHista(state => state.getMeals)
    const meals = useHista(state => state.meals)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getMeals() }, [])
    return (
        <List>
            {meals.map(m => <MealItem key={m.id} meal={m} />)}
        </List>
    )
}

function MealItem(props: { meal: MetaMeal }) {
    const navigate = useNavigate()
    const deleteMeal = useHista(state => state.deleteMeal)

    const onClick = (id: number) => { navigate("/meals/" + id) }

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        await deleteMeal(id)
    }

    const id = props.meal.id || 0

    return (
        <StyledListItem
            onClick={() => onClick(id)}
            secondaryAction={
                <IconButton onClick={(e) => onDelete(e, id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText>
                {props.meal.date.toLocaleString([], { dateStyle: "long", timeStyle: 'short' })}
            </ListItemText>
        </StyledListItem>)

}

const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`