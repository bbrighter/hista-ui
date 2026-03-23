export  const computeCalories = (n: {protein: number, carbohydrate: number, fat: number}): string => {
  const calories = n.protein * 4 + n.carbohydrate * 4 + n.fat * 9
  return calories.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " kcal"
}