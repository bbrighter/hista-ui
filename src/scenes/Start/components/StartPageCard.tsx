import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ForestIcon from '@mui/icons-material/Forest';
import NoteIcon from '@mui/icons-material/Note';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SickIcon from '@mui/icons-material/Sick';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { url } from '../../../constants';

export default function StartPageCard({ type }: { type: keyof typeof CARD_CONFIG }) {
    const navigate = useNavigate()
    const { title, content, icon, navigateTo } = CARD_CONFIG[type];
    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card
                sx={{
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'action.hover', // uses theme color
                    },
                }}
                variant="outlined"
                onClick={() => navigate(navigateTo)}
            >
                <CardHeader
                    avatar={icon}
                    title={
                        <Typography variant="h4">{title}</Typography>}>
                </CardHeader>
                <CardContent>
                    <Typography component="div" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid >
    )
}

const CARD_CONFIG = {
    meals: {
        title: 'Mahlzeiten',
        content: 'Mahlzeiten hinzufügen, ansehen und bearbeiten',
        icon: <RestaurantIcon />,
        navigateTo: url.MEAL,
    },
    conditionEvents: {
        title: 'Symptome',
        content: 'Symptome aufzeichnen',
        icon: <SickIcon />,
        navigateTo: url.CONDITION_EVENTS,
    },
    statistics: {
        title: 'Auswertungen',
        content: 'Ernährungstagebuch und mehr',
        icon: <QueryStatsIcon />,
        navigateTo: url.STATISTICS,
    },
    notes: {
        title: 'Notizen',
        content: 'Notizen anfertigen und durchsuchen',
        icon: <NoteIcon />,
        navigateTo: url.NOTES,
    },
    pollens: {
        title: 'Pollen',
        content: 'Pollenflug bewundern',
        icon: <ForestIcon />,
        navigateTo: url.POLLENS,
    },
    status: {
        title: 'Status',
        content: 'Wie geht\'s denn heute?',
        icon: <SelfImprovementIcon />,
        navigateTo: url.STATUSES,
    },
    headaches: {
        title: 'Kopfweh',
        content: 'Kopfschmerztagebuch',
        icon: <FaceRetouchingNaturalIcon />,
        navigateTo: url.HEADACHES,
    },
} as const;
