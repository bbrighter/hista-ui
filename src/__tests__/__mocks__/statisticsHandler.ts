import { http, HttpResponse } from 'msw'

import { entity } from '../../api/generatedApi'

const getStatisticsHandler = (baseUrl: string) => (
    http.get(baseUrl + '/statistics/ingredients', () => HttpResponse.json({
        count: 5,
        statistics: [
            { symptomId: 1, hours1: 1, hours24: 1, hours72: 0, severity: 1 },
            { symptomId: 1, hours1: 0, hours24: 1, hours72: 0, severity: 2 },
            { symptomId: 2, hours1: 0, hours24: 1, hours72: 4, severity: 1 },
        ],
    } satisfies entity.SymptomStatisticsResponse))
)

export { getStatisticsHandler }
