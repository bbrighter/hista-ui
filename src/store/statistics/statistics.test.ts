import { expect, test } from "vitest";
import { statistics } from "../../api/generatedApi";
import { respToStatistics } from "./statistics";
import { Ingredients } from "../meal/ingredients";

test('respToStatistics', () => {
    const resp: statistics.StatisticsResponse = {
        statistics: [
            {
                foodCondition: 'cooked',
                ingredientId: 1,
                hours1: 0,
                hours24: 3,
                hours72: 5,
            }
        ]
    }
    const ingredients: Ingredients = [{
        id: 1,
        name: "Ingredient"
    }]

    const stats = respToStatistics(resp, ingredients)
    expect(stats).toHaveLength(1)
    const stat = stats[0]
    expect(stat.ingredientId).toBe(1)
    expect(stat.ingredientName).toBe("Ingredient")
    expect(stat.foodCondition).toBe("Gar")
    expect(stat.within1hour).toBe(0)
    expect(stat.within24hours).toBe(3)
    expect(stat.within72hours).toBe(5)
})