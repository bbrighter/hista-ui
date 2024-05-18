import { Card, CardContent, CardHeader, Grid, Icon, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SickIcon from '@mui/icons-material/Sick';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NoteIcon from '@mui/icons-material/Note';
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { url } from "../../../constants";

export default function StartPageCard(props: {
    type: 'meals' | 'conditionEvents' | 'statistics' | 'notes'
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
            navigateTo = url.MEAL
            break
        case "conditionEvents":
            title = "Symptome"
            content = "Symptome aufzeichnen"
            icon = <SickIcon />
            navigateTo = url.CONDITION_EVENTS
            break
        case "statistics":
            title = "Auswertungen"
            content = "Ernährungstagebuch und mehr"
            icon = <QueryStatsIcon />
            navigateTo = url.STATISTICS
            break
        case "notes":
            title = "Notizen"
            content = "Notizen anfertigen und durchsuchen"
            icon = <NoteIcon />
            navigateTo = url.NOTES
    }

    return (
        <Grid
            item
            sx={{ width: '50%', minWidth: '350px' }}
        >
            <StyledCard
                sx={{ width: '100%' }}
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