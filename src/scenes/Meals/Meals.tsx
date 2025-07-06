import RestaurantIcon from '@mui/icons-material/Restaurant';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { url } from '../../constants'
import useHista from '../../store/store'
import MealList from './components/MealList'

export default function Meals() {
    const navigate = useNavigate()
    const postMeal = useHista(state => state.postMeal)
    const [loading, setLoading] = useState(false)

    const onCreate = async () => {
        setLoading(true)
        const id = await postMeal()
        setLoading(false)
        if (id) {
            navigate(url.MEAL + '/' + id)
        }
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <Button
                startIcon={<RestaurantIcon />}
                variant='outlined'
                onClick={onCreate}
                loading={loading}
            >Neue Mahlzeit
            </Button>
            <MealList />
        </Container>
    )
}
