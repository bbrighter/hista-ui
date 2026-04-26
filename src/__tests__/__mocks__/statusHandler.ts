import { http, HttpResponse } from "msw"

import { hista } from "../../api/generatedApi"

const statusHandlers = (baseUrl: string) => ([

  http.get(baseUrl + "/status", () => HttpResponse.json({
    statuses: [
      {
        id: 1, date: "2024-01-01T13:00:00Z",
        morningFitness: 3,
        morningSleep: 2,
        eveningFitness: 1,
      },
      {
        id: 2, date: "2023-01-01T14:00:00Z",
        morningFitness: 3,
        morningSleep: 1,
      },
    ],
  } as hista.StatusListResponse)),
  http.post(baseUrl + "/status", () => HttpResponse.json({
    id: 3, date: "2024-03-31T00:00:00",

  })),
  http.delete(baseUrl + "/status/:id", () => HttpResponse.json({})),
  http.patch(baseUrl + "/status/:id", () => (HttpResponse.json()),
  ),
])

export { statusHandlers }
