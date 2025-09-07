/* eslint-disable no-console */
import { isRouteErrorResponse } from 'react-router-dom'

import { isAPIError } from '../../api/generatedApi'

type AppError = {
    text: string
    status?: number
    details?: string
    stack?: string
    source: 'router' | 'api' | 'unknown'
}

export const toAppError = (error: unknown): AppError => {
    if (isRouteErrorResponse(error)) {
        console.warn('isRouteError')
        return {
            text: error.statusText,
            status: error.status,
            details: JSON.stringify(error.data ?? 'Keine Details'),
            source: 'router',
        }
    }
    if (isAPIError(error)) {
        console.warn('isAPIError')
        return {
            status: error.status,
            text: error.message,
            details: error.details,
            stack: error.stack,
            source: 'api',

        }
    }
    if (error instanceof Error) {
        console.warn('isError')
        return {
            stack: error.stack,
            text: error.name,
            source: 'unknown',
        }
    }
    console.warn('isUnknown')
    return {
        source: 'unknown',
        text: 'Unbekannter Fehler',
        details: JSON.stringify(error),

    }

}
