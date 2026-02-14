import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { APIError, ErrCode } from '../../api/generatedApi'
import { ErrorFallback } from './ErrorFallback'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('error fallback', () => {
  it('rendered for api error', async () => {
    const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'message', details: 'details' })
    const resetErrorBoundary = vi.fn()
    render(
      <MemoryRouter>
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Error stack')).toBeInTheDocument()
    expect(screen.getByText('Zur Homepage')).toBeInTheDocument()
    expect(screen.getByText('details')).toBeInTheDocument()
    expect(screen.getByText('message - 400')).toBeInTheDocument()
  })

  it('clicking home button redirects to homepage', async () => {
    const error = new APIError(400, { code: ErrCode.InvalidArgument, message: 'message' })
    const resetErrorBoundary = vi.fn()
    render(
      <MemoryRouter>
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      </MemoryRouter>,
    )

    const button = screen.getByText('Zur Homepage')
    await userEvent.click(button)
    expect(mockNavigate).toHaveBeenCalled()
  })
})
