import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import ForestIcon from '@mui/icons-material/Forest'
import NoteIcon from '@mui/icons-material/Note'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import SickIcon from '@mui/icons-material/Sick'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useAppNavigate } from '../../../hooks/useNavigate'

export type CardType = keyof typeof CARD_CONFIG

export default function StartPageCard({ type }: { type: CardType }) {
    const navigate = useAppNavigate()
    const { title, content, icon, onClick } = CARD_CONFIG[type](navigate)
    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card
              sx={{
                    'width': '100%',
                    'cursor': 'pointer',
                    'transition': 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
              variant="outlined"
              onClick={(onClick)}
            >
                <CardHeader
                  avatar={icon}
                  title={
                        <Typography variant="h4">{title}</Typography>
                    }
                >
                </CardHeader>
                <CardContent>
                    <Typography component="div" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

const CARD_CONFIG = {
    meals: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Mahlzeiten',
        content: 'Mahlzeiten hinzufügen, ansehen und bearbeiten',
        icon: <RestaurantIcon />,
        onClick: navigate.to.meals,
    }),
    conditionEvents: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Symptome',
        content: 'Symptome aufzeichnen',
        icon: <SickIcon />,
        onClick: navigate.to.conditionEvents,
    }),
    statistics: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Auswertungen',
        content: 'Ernährungstagebuch und mehr',
        icon: <QueryStatsIcon />,
        onClick: navigate.to.statistics,
    }),
    notes: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Notizen',
        content: 'Notizen anfertigen und durchsuchen',
        icon: <NoteIcon />,
        onClick: navigate.to.notes,
    }),
    pollens: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Pollen',
        content: 'Pollenflug bewundern',
        icon: <ForestIcon />,
        onClick: navigate.to.pollens,
    }),
    status: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Status',
        content: 'Wie geht\'s denn heute?',
        icon: <SelfImprovementIcon />,
        onClick: navigate.to.statuses,
    }),
    headaches: (navigate: ReturnType<typeof useAppNavigate>) => ({
        title: 'Kopfweh',
        content: 'Kopfschmerztagebuch',
        icon: <FaceRetouchingNaturalIcon />,
        onClick: navigate.to.headaches,
    }),
} as const
