import { headacheHandlers } from './headacheHandlers'
import { foodHandlers, ingredientHandlers, mealHandlers } from './mealHandlers'
import { noteHandlers } from './noteHandlers'
import { permissionsHandler } from './permissionsHandler'
import { pollenHandlers } from './pollenHandlers'
import { statusHandlers } from './statusHandler'
import { conditionEventHandlers, conditionHandlers, symptomHandlers } from './symptomHandlers'


const baseUrl = 'http://localhost:4444'
const baseUrlWithPiid = `${baseUrl}/piid/:piid`


const handlers = [
    ...symptomHandlers(baseUrlWithPiid),
    ...conditionEventHandlers(baseUrlWithPiid),
    ...conditionHandlers(baseUrlWithPiid),
    ...mealHandlers(baseUrlWithPiid),
    ...ingredientHandlers(baseUrlWithPiid),
    ...foodHandlers(baseUrlWithPiid),
    ...noteHandlers(baseUrlWithPiid),
    ...headacheHandlers(baseUrlWithPiid),
    ...pollenHandlers(baseUrlWithPiid),
    ...statusHandlers(baseUrlWithPiid),
    ...permissionsHandler(baseUrl),
]

export default handlers