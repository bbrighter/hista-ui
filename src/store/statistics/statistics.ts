import { statistics } from "../../api/generatedApi"
import { mealConstants } from "../../constants"
import { Ingredients } from "../meal/ingredients"

export interface Statistics {
    ingredientId: number
    ingredientName?: string
    foodCondition: string
    within1hour: number
    within24hours: number
    within72hours: number
}


export const respToStatistics = (
    resp: statistics.StatisticsResponse,
    ingredients: Ingredients
): Array<Statistics> => {
    const statistics = resp.statistics.map(r => {
        const statistics: Statistics = {
            ingredientId: r.ingredientId,
            foodCondition: r.foodCondition == 'raw' ? mealConstants.RAW : mealConstants.COOKED,
            ingredientName: ingredients.find(ing => ing.id == r.ingredientId)?.name,
            within1hour: r.hours1,
            within24hours: r.hours24,
            within72hours: r.hours72,
        }
        return statistics
    })
    statistics.sort((a, b) => (b.within72hours - a.within72hours))
    return statistics
}