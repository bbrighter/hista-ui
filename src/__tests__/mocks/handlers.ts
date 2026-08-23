import { createStatusList } from "../fixtures/status";
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
import {
	deleteStatusHandler,
	getStatusListHandler,
	patchStatusHandler,
	postStatusHandler,
} from "./statusHandler";
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
	...mealHandlers,
	...ingredientHandlers,
	...foodHandlers,
	...noteHandlers(baseUrlWithPiid),
	...headacheHandlers,
	...pollenHandlers(baseUrlWithPiid),
	...permissionsHandler(baseUrl),
	...authHandlers(baseUrl),
	getStatisticsHandler(baseUrlWithPiid),
	getDiariesHandler(baseUrlWithPiid),
	getNutritionStatisticsHandler(baseUrlWithPiid),
	...medicineHandlers,
	...intakeHandlers,
	...templateHandlers,
	errorHandler(baseUrl),

	postStatusHandler(),
	getStatusListHandler(createStatusList()),
	patchStatusHandler(),
	deleteStatusHandler(),
];

export default handlers;
