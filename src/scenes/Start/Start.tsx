import { Grid } from "@mui/material";
import StartPageCard from "./components/StartPageCard";

export default function Start() {

    return (
        <Grid
            justifyContent='center'
            container
            spacing={2}
            sx={{ padding: '2rem' }}
        >
            <StartPageCard type='meals' />
            <StartPageCard type='conditionEvents' />
        </Grid>
    )
}