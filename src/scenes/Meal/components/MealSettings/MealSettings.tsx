import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import { useState } from "react"

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

  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined)

  const handleToggleOptionChange = async (value: boolean | null) => {
    if (value == null) return
    setIsLoading(value)
    await setAloneness(value)
    setIsLoading(undefined)
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid size={{ xs: 12 }}>
        {meal.isLoading
          ? <Skeleton height="4rem" variant="rectangular" />
          : (
            <DateInput
              title="Mahlzeit"
              date={meal.date}
              onChange={e => setDate(e?.toISOString() || new Date().toISOString())}          
            />
          )}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StressSlider isLoading={isLoading} setStressLevel={setStressLevel} stressLevel={meal.stressLevel}/>
      </Grid>
      <Grid size={{ xs: 8 }}>
        <FreshnessSlider isLoading={isLoading} setFreshness={setFreshness} freshness={meal.freshness}/>
      </Grid>
      <Grid size={{ xs: 4 }} sx={{ textAlign: "center" }}>
        <PeopleToggleButton isLoading={isLoading} isAlone={meal.isAlone} handleToggleOptionChange={handleToggleOptionChange}/>
      </Grid>
    </Grid>

  )
}


