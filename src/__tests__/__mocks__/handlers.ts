import { headacheHandlers } from './headacheHandlers'
import { ingredientHandlers, mealHandlers } from './mealHandlers'
import { noteHandlers } from './noteHandlers'
import { pollenHandlers } from './pollenHandlers'
import { statusHandlers } from './statusHandler'
import { conditionEventHandlers, symptomHandlers } from './symptomHandlers'


const baseUrl = 'http://localhost:4444'


const handlers = [
    ...symptomHandlers(baseUrl),
    ...conditionEventHandlers(baseUrl),
    ...mealHandlers(baseUrl),
    ...ingredientHandlers(baseUrl),
    ...noteHandlers(baseUrl),
    ...headacheHandlers(baseUrl),
    ...pollenHandlers(baseUrl),
    ...statusHandlers(baseUrl),
]

export default handlers