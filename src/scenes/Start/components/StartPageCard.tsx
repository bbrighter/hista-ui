import { Card, CardContent, CardHeader, Grid, Icon, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SickIcon from '@mui/icons-material/Sick';
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { CONDITON_EVENTS_URL, MEAL_URL } from "../../../api/urls";

export default function StartPageCard(props: {
    type: 'meals' | 'conditionEvents'
}) {
    const navigate = useNavigate()

    let title = ""
    let content = ""
    let icon
    let navigateTo = ""
    switch (props.type) {
        case "meals":
            title = "Mahlzeiten"
            content = "Mahlzeiten hinzufügen, ansehen und bearbeiten"
            icon = <RestaurantIcon />
            navigateTo = MEAL_URL
            break
        case "conditionEvents":
            title = "Symptome"
            content = "Symptome aufzeichnen"
            icon = <SickIcon />
            navigateTo = CONDITON_EVENTS_URL
            break
    }

    return (
        <Grid item padding={5}>
            <StyledCard
                sx={{ minWidth: '375px' }}
                variant="outlined"
                onClick={() => navigate(navigateTo)}
            >
                <CardHeader
                    avatar={
                        <Icon>
                            {icon}
                        </Icon>
                    }
                    title={
                        <Typography variant="h4">{title}</Typography>}>
                </CardHeader>
                <CardContent>
                    <Typography component="div" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            </StyledCard>
        </Grid>
    )
}

const StyledCard = styled(Card)`
    :hover{
        cursor: pointer;
        background-color: rgba(255,255,255,0.1);
    }
`