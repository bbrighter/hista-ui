import { authHandlers } from "./authHandler";
import { errorHandler } from "./errorHandlers";
import { headacheHandlers } from "./headacheHandlers";
import { foodHandlers, ingredientHandlers, mealHandlers } from "./mealHandlers";
import { intakeHandlers, medicineHandlers } from "./medicineHandlers";
import { noteHandlers } from "./noteHandlers";
import { permissionsHandler } from "./permissionsHandler";
import { pollenHandlers } from "./pollenHandlers";
import {
	getDiariesHandler,
	getNutritionStatisticsHandler,
	getStatisticsHandler,
} from "./statisticsHandler";
import { statusHandlers } from "./statusHandler";
import {
	conditionEventHandlers,
	conditionHandlers,
	symptomHandlers,
} from "./symptomHandlers";
import { templateHandlers } from "./templateHander";

const baseUrl = "";
const baseUrlWithPiid = `${baseUrl}/piid/:piid`;

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
	...authHandlers(baseUrl),
	getStatisticsHandler(baseUrlWithPiid),
	getDiariesHandler(baseUrlWithPiid),
	getNutritionStatisticsHandler(baseUrlWithPiid),
	...medicineHandlers(baseUrlWithPiid),
	...intakeHandlers(baseUrlWithPiid),
	...templateHandlers(baseUrlWithPiid),
	errorHandler(baseUrl),
];

export default handlers;
