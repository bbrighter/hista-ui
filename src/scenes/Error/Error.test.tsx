
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '../../__tests__/setupTest';
import { APIError, ErrCode } from '../../api/generatedApi';
import useHista from '../../store/store';
import Pollens from '../Pollens';
import ErrorBoundary from './Error';


const mocks = vi.hoisted(() => ({
    useRouteErrorMock: vi.fn(),
    isRouteErrorResponseMock: vi.fn(),
    useNavigate: vi.fn(),

}))

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = (await importOriginal()) as typeof import('react-router-dom')
    return {
        ...actual,
        useRouteError: mocks.useRouteErrorMock,
        isRouteErrorResponse: mocks.isRouteErrorResponseMock,
        useNavigate: () => mocks.useNavigate,
    }
})

describe('Error boundary is displayed correctly', () => {
    beforeEach(() => {
        mocks.useRouteErrorMock.mockReset()
        mocks.isRouteErrorResponseMock.mockReset()
    })

    it('Error is set', async () => {
        const setErrorSpy = vi.spyOn(useHista.getState(), 'setError')
        server.use(
            http.get('http://localhost:4444/pollen', () => (HttpResponse.json(
                { message: 'oh no' },
                { status: 500 },
            )),
            ))
        render(<Pollens />)

        await waitFor(() => { expect(setErrorSpy).toHaveBeenCalled() })

    })

    it('Renders API error correctly', async () => {

        mocks.useRouteErrorMock.mockReturnValue(null)
        mocks.isRouteErrorResponseMock.mockReturnValue(false)

        useHista.getState().setError(new APIError(500, { code: ErrCode.Internal, message: 'api error' }))

        render(<MemoryRouter><ErrorBoundary /></MemoryRouter>)

        expect(await screen.findByText('500 - api error')).toBeInTheDocument()
    })

    it('renders route error correctly', async () => {
        mocks.useRouteErrorMock.mockReturnValue({ status: 500, statusText: 'routeError' })
        mocks.isRouteErrorResponseMock.mockReturnValue(true)


        render(<MemoryRouter><ErrorBoundary /></MemoryRouter>)

        expect(await screen.findByText('Ein Fehler ist aufgetreten.')).toBeInTheDocument()
    })

    it('invalid auth logs out', async () => {
        mocks.useRouteErrorMock.mockReturnValue(null)
        mocks.isRouteErrorResponseMock.mockReturnValue(false)

        const logoutMock = vi.fn()

        useHista.setState({
            ...useHista.getState(),
            logout: logoutMock,
        })

        useHista.getState().setError(new APIError(401, { code: ErrCode.Unauthenticated, message: 'not auth' }))

        render(<MemoryRouter><ErrorBoundary /></MemoryRouter>)

        expect(logoutMock).toHaveBeenCalled()
    })

    it('go home works', async () => {
        render(<MemoryRouter><ErrorBoundary /></MemoryRouter>)
        const goHomeButton = await screen.findByText('Zur Homepage')
        expect(goHomeButton).toBeInTheDocument()
        await userEvent.click(goHomeButton)

        expect(mocks.useNavigate).toHaveBeenCalledWith('/')

    })


})