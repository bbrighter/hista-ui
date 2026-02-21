import { http, HttpResponse } from "msw";

import { entity } from "../../api/generatedApi";

export const medicineHandlers = (baseUrl: string) => [
  http.get(`${baseUrl}/medicines`, () =>
    HttpResponse.json({
      medicines: [
        { id: 1, isArchived: false, name: "Medicine" },
        { id: 2, isArchived: true, name: "Archived medicine" },
      ],
    } satisfies entity.MedicineListResponse),
  ),
  http.post(`${baseUrl}/medicines`, () => HttpResponse.json({ id: 3 })),
  http.patch(`${baseUrl}/medicines/:id`, () => HttpResponse.json({})),
];

export const intakeHandlers = (baseUrl: string) => [
  http.get(`${baseUrl}/intakes`, () =>
    HttpResponse.json({
      intakes: [
        { medicineId: 1, count: 6, date: "2025-06-06T00:00:00Z" },
        { medicineId: 1, count: 5, date: "2025-06-05T00:00:00Z" },
        { medicineId: 1, count: 4, date: "2025-06-04T00:00:00Z" },
      ],
    } satisfies entity.IntakeResponseList),
  ),
  http.post(`${baseUrl}/intakes/medicines/:medicineId/increment`, () =>
    HttpResponse.json({}),
  ),
  http.post(`${baseUrl}/intakes/medicines/:medicineId/decrement`, () =>
    HttpResponse.json({}),
  ),
];
