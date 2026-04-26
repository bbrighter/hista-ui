import Grid from "@mui/material/Grid"

import { Freshness, mealService } from "../../../../store"
import useHista from "../../../../store/store"
import DateInput from "../../../components/DateInput"
import { FreshnessSlider } from "./FreshnessSlider"
import { PeopleToggleButton } from "./PeopleToggleButton"
import { StressSlider } from "./StressSlider"

export function MealSettings() {
  const meal = useHista(state => state.meal)

  const setDate = (dateString: string) => mealService.patchMealDate(meal.id, dateString)
  const setStressLevel = (stressLevel: number) => mealService.patchMealStressLevel(meal.id, stressLevel)
  const setFreshness = (freshness: Freshness) => mealService.patchMealFreshness(meal.id, freshness)
  const setAloneness = (isAlone: boolean) => mealService.patchMealIsAlone(meal.id, isAlone)

  const handleToggleOptionChange = async (value: boolean | null) => {
    if (value == null) return
    await setAloneness(value)
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid size={{ xs: 12 }}> 
        <DateInput
          title="Mahlzeit"
          date={meal.date}
          onChange={e => setDate(e?.toISOString() || new Date().toISOString())}          
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StressSlider setStressLevel={setStressLevel} stressLevel={meal.stressLevel}/>
      </Grid>
      <Grid size={{ xs: 8 }}>
        <FreshnessSlider setFreshness={setFreshness} freshness={meal.freshness}/>
      </Grid>
      <Grid size={{ xs: 4 }} sx={{ textAlign: "center" }}>
        <PeopleToggleButton  isAlone={meal.isAlone} handleToggleOptionChange={handleToggleOptionChange}/>
      </Grid>
    </Grid>

  )
}


