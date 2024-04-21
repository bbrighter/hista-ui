import { Card, CardContent, CardHeader, Icon, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styled from "@emotion/styled";

export default function StartPageCard(props: {
    title: string
    onClick: React.MouseEventHandler<HTMLDivElement>
}) {
    return (
        <StyledCard variant="outlined" onClick={props.onClick}>
            <CardHeader
                avatar={
                    <Icon>
                        <RestaurantIcon />
                    </Icon>
                }
                title={
                    <Typography variant="h4">{props.title}</Typography>}>

            </CardHeader>
            <CardContent>
                <Typography component="div" color="text.secondary">
                    Mahlzeiten hinzufügen, ansehen und bearbeiten
                </Typography>
            </CardContent>
        </StyledCard>
    )
}

const StyledCard = styled(Card)`
    :hover{
        cursor: pointer;
        background-color: rgba(255,255,255,0.1);
    }
`