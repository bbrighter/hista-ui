import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Start from './Start'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('start page', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
  })

  it('All cards are rendered', async () => {
    render(<MemoryRouter><Start /></MemoryRouter>)

    const expectedTitles = [
      'Mahlzeiten',
      'Symptome',
      'Auswertungen',
      'Notizen',
      'Pollen',
      'Status',
      'Kopfweh',
    ]
    await waitFor(() => {
      expectedTitles.forEach((t) => {
        expect(screen.getByText(t)).toBeInTheDocument()
      })
    })
  })

  it('Clicking a card opens new url', async () => {
    render(<MemoryRouter><Start /></MemoryRouter>)

    const card = await screen.findByText('Mahlzeiten')
    await userEvent.click(card)

    expect(mockNavigate).toHaveBeenCalledWith('/7b3047c2-d56d-4942-abc4-39eb85e785f2/meals')
  })
})
