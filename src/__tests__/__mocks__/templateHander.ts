import { http, HttpResponse } from "msw"

import { entity } from "../../api/generatedApi"

export const templateHandlers = (baseUrl: string) =>  ([
  http.get(`${baseUrl}/templates`, () => HttpResponse.json({
    templates: [{
      id: 1, name: "Template", items: [
        { condition: "raw", ingredientId: 1 },
      ],
    }],
  }as entity.TemplateListResponse) ),

  http.post(`${baseUrl}/templates`, () => HttpResponse.json({ id: 2 })),
  http.delete(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
  http.put(`${baseUrl}/templates/:id`, () => HttpResponse.json({})),
])