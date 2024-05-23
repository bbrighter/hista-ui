import { statistics } from "../../api/generatedApi"

export interface Statistics {
    symptomId: number
    symptomSeverity: number
    symptomName?: string
    symptomCategoryId?: number
    symptomCategoryName?: string
    statistics: Array<SymptomStatistic>
}

interface SymptomStatistic {
    symptomDate: Date
    ingrededientId: number
    foodDate: Date
    ingredientName?: string
    foodCondition: string
}

export const respToStatistics = (resp: statistics.Statistics): Array<Statistics> => {
    return resp.statistics.map(r => (
        {
            symptomId: r.symptomId,
            symptomSeverity: r.symptomSeverity,
            statistics: r.statistic.map(stat => ({
                symptomDate: new Date(stat.symptomDate),
                ingrededientId: stat.ingredientId,
                foodCondition: stat.foodCondition,
                foodDate: new Date(stat.foodDate),
            }))
        }
    ))
}