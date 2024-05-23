import { statistics } from "../../api/generatedApi"
import { Ingredients } from "../meal/ingredients"

export interface Statistics {
    ingredientId: number
    ingredientName?: string
    foodCondition: string
    statistics: Array<SymptomStatistic>
}

interface SymptomStatistic {
    symptomDate: Date
    foodDate: Date
    symptomId: number
    symptomSeverity: number
    ingredientName?: string
    symptomName?: string
    symptomCategoryId?: number
    symptomCategoryName?: string
}

export const respToStatistics = (
    resp: statistics.Statistics,
    ingredients: Ingredients
): Array<Statistics> => {


    return resp.statistics.map(r => {
        const statistics = {
            ingredientId: r.ingredientId,
            foodCondition: r.foodCondition == 'raw' ? 'Roh' : 'Gar',
            ingredientName: ingredients.find(ing => ing.id == r.ingredientId)?.name,

            statistics: r.statistic.map(stat => ({
                symptomDate: new Date(stat.symptomDate),
                foodDate: new Date(stat.foodDate),
                symptomId: stat.symptomId,
                symptomSeverity: stat.symptomSeverity
            }))
        }

        return statistics

    })
}