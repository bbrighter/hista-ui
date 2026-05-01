import Grid from "@mui/material/Grid"

import { actions } from "../../../../actions"
import { Freshness } from "../../../../store"
import useHista from "../../../../store/store"
import DateInput from "../../../components/DateInput"
import { FreshnessSlider } from "./FreshnessSlider"
import { PeopleToggleButton } from "./PeopleToggleButton"
import { StressSlider } from "./StressSlider"

export function MealSettings() {
  const meal = useHista(state => state.meal)

  const setDate = (dateString: string) => actions.meals.patchDate(meal.id, dateString)
  const setStressLevel = (stressLevel: number) => actions.meals.patchStressLevel(meal.id, stressLevel)
  const setFreshness = (freshness: Freshness) => actions.meals.patchFreshness(meal.id, freshness)
  const setAloneness = (isAlone: boolean) => actions.meals.patchIsAlone(meal.id, isAlone)

  const handleToggleOptionChange = async (value: boolean | null) => {
    if (value == null) return
    await setAloneness(value)
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems:"center",
        justifyContent:"center",
      }}
 
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


