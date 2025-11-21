import { http, HttpResponse } from 'msw';

import { entity } from '../../api/generatedApi';

const permissionsHandler = (baseUrl: string) => ([
    http.get(baseUrl + '/permissions', () => (HttpResponse.json({
        instances: [
            { piid: '7b3047c2-d56d-4942-abc4-39eb85e785f2', appMapping: { 'user-management': true } },
        ],
    } as entity.AuthData))),
])

export { permissionsHandler }