import { delay, HttpResponse, http } from "msw";

import type { hista } from "../../api/generatedApi";
import { createIntakeList, createMedicineList } from "../fixtures/medicines";

export const getMedicineListHandler = (
	resp: hista.MedicineListResponse,
	ms?: number,
) =>
	http.get("/piid/:piid/medicines", async () => {
		if (ms) await delay(ms);
		return HttpResponse.json(resp);
	});

export const postMedicineHandler = (id: number) =>
	http.post("/piid/:piid/medicines", () => HttpResponse.json({ id: id }));
const patchMedicineHandler = () =>
	http.patch("/piid/:piid/medicines/:id", () => HttpResponse.json({}));
const patchMedicineReorderHandler = () =>
	http.patch("/piid/:piid/medicines/:id/reorder", () => HttpResponse.json({}));

export const medicineHandlers = [
	getMedicineListHandler(createMedicineList()),
	postMedicineHandler(3),
	patchMedicineHandler(),
	patchMedicineReorderHandler(),
];

export const getIntakeListHandler = (resp: hista.IntakeListResponse) =>
	http.get("/piid/:piid/intakes", () => HttpResponse.json(resp));
const postIntakeIncrementHandler = () =>
	http.post("/piid/:piid/intakes/medicines/:id/increment", () =>
		HttpResponse.json({}),
	);
const postIntakeDecrementHandler = () =>
	http.post("/piid/:piid/intakes/medicines/:id/decrement", () =>
		HttpResponse.json({}),
	);

export const intakeHandlers = [
	getIntakeListHandler(createIntakeList()),
	postIntakeDecrementHandler(),
	postIntakeIncrementHandler(),
];
// export const medicineHandlers = (baseUrl: string) => [
// 	http.get(`${baseUrl}/medicines`, () =>
// 		HttpResponse.json({
// 			medicines: [
// 				{ id: 1, isArchived: false, name: "Medicine", sortOrder: 100 },
// 				{ id: 2, isArchived: true, name: "Archived medicine", sortOrder: 200 },
// 			],
// 		} satisfies hista.MedicineListResponse),
// 	),
// 	http.post(`${baseUrl}/medicines`, () => HttpResponse.json({ id: 3 })),
// 	http.patch(`${baseUrl}/medicines/:id`, () => HttpResponse.json({})),
// 	http.patch(`${baseUrl}/medicines/:id/reorder`, () => HttpResponse.json({})),
// ];

// export const intakeHandlers = (baseUrl: string) => [
// 	http.get(`${baseUrl}/intakes`, () =>
// 		HttpResponse.json({
// 			intakes: [
// 				{ medicineId: 1, count: 6, date: "2025-06-06T00:00:00Z" },
// 				{ medicineId: 1, count: 5, date: "2025-06-05T00:00:00Z" },
// 				{ medicineId: 1, count: 4, date: "2025-06-04T00:00:00Z" },
// 			],
// 		} satisfies hista.IntakeListResponse),
// 	),
// 	http.post(`${baseUrl}/intakes/medicines/:medicineId/increment`, () =>
// 		HttpResponse.json({}),
// 	),
// 	http.post(`${baseUrl}/intakes/medicines/:medicineId/decrement`, () =>
// 		HttpResponse.json({}),
// 	),
// ];
