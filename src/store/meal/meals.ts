import { entity } from '../../api/generatedApi'

export interface MetaMeal {
    id: number
    date: Date
}

export type Meals = Array<MetaMeal>


export const respToMetaMeals = (resp: entity.MealsResponse): Meals => {
    if (!resp.meals) return []
    const meals = resp.meals.map(m => (
        { id: m.id, date: new Date(m.date) }
    ))
    return meals
}
