import { Grid } from "@mui/material";
import StartPageCard from "./components/StartPageCard";
import { useNavigate } from "react-router-dom";

export default function Start() {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/meals')
    }

    return (
        <Grid
            container
            spacing={2}
            sx={{ padding: '2rem' }}>
            <Grid item>
                <StartPageCard title="Mahlzeiten" onClick={onClick} />
            </Grid>

        </Grid>
    )
}