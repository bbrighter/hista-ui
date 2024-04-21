import { Button, Container, FormControl, FormGroup, FormLabel, Input, InputLabel } from "@mui/material";
import useHista from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Meal() {
    const getMeal = useHista(state => state.getMeal)
    const meal = useHista(state => state.meal)
    const params = useParams<{ id: string }>()

    useEffect(() => {
        getMeal(Number(params.id))
    })

    return (
        <Container sx={{ padding: '2rem' }}>
            <FormGroup>
                <FormLabel>Mahlzeit</FormLabel>
                <FormControl sx={{ mt: '2rem' }}>
                    <InputLabel>Datum</InputLabel>
                    <Input type='date' value={meal.date.toISOString().substring(0, 10)} />
                </FormControl>
                {/* <FormControl sx={{ mt: '2rem' }}>
                    <InputLabel>Weitere Input</InputLabel>
                    <Input />
                </FormControl> */}
            </FormGroup>
            <Button>Abesenden</Button>
        </Container>
    )
}