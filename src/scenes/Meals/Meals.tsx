import { useState } from 'react'
import useHista from '../../store/store'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MealList from './components/MealList'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { url } from '../../constants'
import { LoadingButton } from '@mui/lab'

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
            <LoadingButton
                startIcon={<RestaurantIcon />}
                variant='outlined'
                onClick={onCreate}
                loading={loading}
            >Neue Mahlzeit
            </LoadingButton>
            <MealList />
        </Container>
    )
}
