import { useEffect } from "react"
import useHista from "../../store/store"
import { Button, Container, List, ListItem } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"

export default function Meals() {
    const navigate = useNavigate()
    const getMeals = useHista(state => state.getMeals)
    const postMeal = useHista(state => state.postMeal)
    const meals = useHista(state => state.meals)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getMeals() }, [])

    const onCreate = async () => {
        const id = await postMeal()
        if (id) {
            navigate("/meals/" + id)
        }
    }

    const onClick = (id: number) => {
        navigate("/meals/" + id)
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <Button variant='outlined' onClick={onCreate}>Neue Mahlzeit</Button>
            <List>
                {meals.map(m => {
                    return <StyledListItem
                        key={m.id}
                        onClick={() => onClick(m.id)}
                    >
                        {m.date.toLocaleDateString()}
                    </StyledListItem>
                })}
            </List>
        </Container>
    )
}

const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`