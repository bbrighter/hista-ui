import RestaurantIcon from '@mui/icons-material/Restaurant'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import { useState } from 'react'

import { useAppNavigate } from '../../hooks/useNavigate'
import useHista from '../../store/store'
import MealList from './components/MealList'

export default function Meals() {
  const navigate = useAppNavigate()
  const postMeal = useHista(state => state.postMeal)
  const [loading, setLoading] = useState(false)

  const onCreate = async () => {
    setLoading(true)
    const id = await postMeal()
    setLoading(false)
    if (id) {
      navigate.to.mealDetail(id)
    }
  }

  const onManageClick = () => {
    navigate.to.manageIngredients()
  }

  return (
    <Container sx={{ padding: '2rem' }}>
      <ButtonGroup>
        <Button
          startIcon={<RestaurantIcon />}
          variant="contained"
          onClick={onCreate}
          loading={loading}
        >
          Neue Mahlzeit
        </Button>
        <Button onClick={onManageClick}>
          Zutaten verwalten
        </Button>
      </ButtonGroup>
      <MealList />
    </Container>
  )
}
