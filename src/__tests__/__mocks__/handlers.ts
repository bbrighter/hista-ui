import { headacheHandlers } from './headacheHandlers'
import { foodHandlers, ingredientHandlers, mealHandlers } from './mealHandlers'
import { noteHandlers } from './noteHandlers'
import { pollenHandlers } from './pollenHandlers'
import { statusHandlers } from './statusHandler'
import { conditionEventHandlers, conditionHandlers, symptomHandlers } from './symptomHandlers'


const baseUrl = 'http://localhost:4444'


const handlers = [
    ...symptomHandlers(baseUrl),
    ...conditionEventHandlers(baseUrl),
    ...conditionHandlers(baseUrl),
    ...mealHandlers(baseUrl),
    ...ingredientHandlers(baseUrl),
    ...foodHandlers(baseUrl),
    ...noteHandlers(baseUrl),
    ...headacheHandlers(baseUrl),
    ...pollenHandlers(baseUrl),
    ...statusHandlers(baseUrl),
]

export default handlers