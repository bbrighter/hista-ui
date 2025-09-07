import { AuthStore } from '../auth/authStore';
import { toAppError } from './appError';
import { errorBus } from './errorBus';

const errorHandler = (error: unknown, store: AuthStore) => {
    const appError = toAppError(error)
    const status = appError.status
    switch (appError.source) {
        case 'api':
            switch (status) {
                case 401:
                    store.logout()
                    break
                case 400:
                    if (appError.text == 'invalid uuid') {
                        store.logout()
                    } else {
                        errorBus.emit('error', error)
                    }
                    break
                case 404:
                    break
                case 500:
                default:
                    errorBus.emit('error', error)
            }
            break
        case 'router':
        case 'unknown':
            errorBus.emit('error', error)
    }

}

export function wrapActionsWithErrorHandler<T extends Record<string, unknown>>(
    actions: T,
    store: AuthStore,
): T {
    const wrapped = {}

    for (const [key, value] of Object.entries(actions)) {
        if (typeof value === 'function') {
            wrapped[key] = (...args: unknown[]) => {
                try {
                    const result = (value)(...args)
                    if (result instanceof Promise) {
                        return result.catch((error: unknown) => {
                            errorHandler(error, store)
                        })
                    }
                    return result
                } catch (error) {
                    errorHandler(error, store);
                }
            };
        } else {
            wrapped[key] = value;
        }
    }

    return wrapped as T;
}