import { expect, test } from "vitest";
import { statistics } from "../../api/generatedApi";
import { respToStatistics } from "./statistics";
import { Ingredients } from "../meal/ingredients";

test('respToStatistics', () => {
    const resp: statistics.Statistics = {
        statistics: [
            {
                foodCondition: 'cooked',
                ingredientId: 1,
                statistic: [
                    {
                        foodDate: "2024-05-06T20:30:17.307+02:00",
                        symptomDate: "2024-05-06T20:30:17.307+02:00",
                        symptomId: 10,
                        symptomSeverity: 4
                    }
                ]
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
    expect(stat.statistics).toHaveLength(1)
    expect(stat.foodCondition).toBe("cooked")
})