import { entity } from '../../api/generatedApi'
import { mealConstants } from '../../constants'
import { Ingredients } from '../meal/ingredients'
import { SymptomCategories } from '../symptom/symptom'

export interface FoodStatistics {
    ingredientId: number
    ingredientName?: string
    foodCondition: string
    within1hour: number
    within24hours: number
    within72hours: number
    count: number
}

export const respToStatistics = (
    resp: entity.FoodStatisticsResponse,
    ingredients: Ingredients,
): Array<FoodStatistics> => {
    const statistics = resp.statistics.map((r) => {
        const statistics: FoodStatistics = {
            ingredientId: r.ingredientId,
            foodCondition: r.foodCondition == 'raw' ? mealConstants.RAW : mealConstants.COOKED,
            ingredientName: ingredients.find(ing => ing.id == r.ingredientId)?.name,
            within1hour: r.hours1,
            within24hours: r.hours24,
            within72hours: r.hours72,
            count: r.count,
        }
        return statistics
    })
    statistics.sort((a, b) => (b.within72hours - a.within72hours))
    return statistics
}

export interface SymptomStatistics {
    symptomId: number
    symptomName?: string
    severity: number
    within1hour: number
    within24hours: number
    within72hours: number
    count: number
}

export const respToSymptomStatistics = (
    resp: entity.SymptomStatisticsResponse,
    symptoms: SymptomCategories,
): Array<SymptomStatistics> => {
    const statistics = resp.statistics.map((r) => {
        const statistics: SymptomStatistics = {
            symptomId: r.symptomId,
            severity: r.severity,
            symptomName: getSymptomNameById(symptoms, r.symptomId),
            within1hour: r.hours1,
            within24hours: r.hours24,
            within72hours: r.hours72,
            count: r.count,
        }
        return statistics
    })
    statistics.sort((a, b) => (b.within72hours - a.within72hours))
    return statistics
}

const getSymptomNameById = (cats: SymptomCategories, id: number): string | undefined => {
    const symptoms = cats.find(cat => cat.symptoms.find(sym => sym.id == id))?.symptoms
    if (symptoms) {
        return symptoms.find(sym => sym.id == id)?.name
    }
    else {
        return undefined
    }
}
