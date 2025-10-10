import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '../../__tests__/setupTest';
import { authentication, ErrCode } from '../../api/generatedApi';
import Login from './Login';

const mocks = vi.hoisted(() => ({
    useNavigate: vi.fn(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = (await importOriginal()) as typeof import('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mocks.useNavigate,
    }
})

describe('Login', () => {
    beforeEach(() => {
        window.localStorage.clear()
        mocks.useNavigate.mockClear()
    })

    it('Login works', async () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        server.use(
            http.post('http://localhost:4444/login', () => (HttpResponse.json(
                { Cookie: 'access_token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkJlbm5pIiwicHJvZHVjdEluc3RhbmNlcyI6W3sicGlpZCI6ImQ3MTQ4MzM2LTdkN2MtNGFhMS1hOTkzLTc1ZTQxMGE0NzA5ZCIsImFwcElkcyI6WyJ1c2VyLW1hbmFnZW1lbnQiXX1dLCJzdWIiOiJkYmZkNTlhMy0zNDUwLTQ1YTQtYTNlYi0zYmFjNjdiNzQ2OTUiLCJleHAiOjE3NTk1MTY5OTUsImlhdCI6MTc1OTQzMDU5NX0.jLFUz-OFpsju3xUfxIZe85-ev3eSWIKNxQCjudI6_DqNwA0ICf_oXzM0FoVDjEOWrw9vJGMl3Hm44GTaHZwFjYbwsvxtSD9UhXev9cQjur0zvK1y3jruUq9UAX1dJc0CCbujI7jfn2u57oQ1q5FjPPtPgUK0VxHcWKQXNDhUwuYMccUjEBprJlDEbSturbhfKI-QV_RxCy8b61dheuhGX9Ne3nGgurJccxBgdpTIG5b1s34oq10NRbHlwfxfgyzq9Jr1S_Sw7XaMaSxHf5ngCf9yGlXWvFsf7eZPsreux7hpXyk1PUMsr92M4micFktkooeiP3z_fE5AwY7Ksxws2w' } as authentication.LoginResponse,
                { status: 200 },
            )),
            ))

        const nameInput = await screen.findByLabelText('Name')
        expect(nameInput).toBeInTheDocument()
        await userEvent.type(nameInput, 'User')

        const passwordInput = await screen.findByLabelText('Passwort')
        expect(passwordInput).toBeInTheDocument()
        await userEvent.type(passwordInput, 'password')

        const confirmButton = screen.getByText('Login')
        expect(confirmButton).toBeInTheDocument()
        await userEvent.click(confirmButton)

        expect(mocks.useNavigate).toHaveBeenCalledWith('/7b3047c2-d56d-4942-abc4-39eb85e785f2/')
    })

    it('Errors shown on wrong credentials', async () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        server.use(
            http.post('http://localhost:4444/login', () => (HttpResponse.json(
                { token: '', status: ErrCode.Unauthenticated },
                { status: 401 },
            )),
            ))

        const nameInput = await screen.findByLabelText('Name')
        expect(nameInput).toBeInTheDocument()
        await userEvent.type(nameInput, 'User')

        const passwordInput = await screen.findByLabelText('Passwort')
        expect(passwordInput).toBeInTheDocument()
        await userEvent.type(passwordInput, 'password')

        const confirmButton = screen.getByText('Login')
        expect(confirmButton).toBeInTheDocument()
        await userEvent.click(confirmButton)

        expect(mocks.useNavigate).not.toHaveBeenCalled()

    })
})