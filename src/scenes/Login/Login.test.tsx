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
                { token: 'something' } as authentication.LoginResponse,
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
                { token: '', status: ErrCode.Unauthenticated } as authentication.LoginResponse,
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