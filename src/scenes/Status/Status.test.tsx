import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { statusService } from "../../store"
import Status from "./Status"

describe("Status.tsx", async () => {
  const getStatusCard = (date: string) => (screen.getByText(date).closest(".MuiPaper-root") as HTMLElement)
  const getDeleteButton = (date: string) => (within(getStatusCard(date)).getByTitle("Löschen"))
  const getMorningFitnessSlider = (date: string) => (within(getStatusCard(date)).getByTestId("morning-fitness-slider"))
  const getMorningSleepSlider = (date: string) => (within(getStatusCard(date)).getByTestId("morning-sleep-slider"))
  const getEveningFitnessSlider = (date: string) => (within(getStatusCard(date)).getByTestId("evening-fitness-slider"))
  const queryLockOverlay = (date: string) => (within(getStatusCard(date)).queryByTestId("lock-overlay"))

  it("Renders correctly", async () => {
    render(<Status />)

    expect(await screen.findByText("+ Status heute")).toBeInTheDocument()
    expect(screen.getByTitle("Status hinzufügen")).toBeInTheDocument()

    const date = "01.01.2024"
    const card = getStatusCard(date)
    expect(card).toBeInTheDocument()
    const deleteButton = getDeleteButton(date)
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeEnabled()


    expect(card).toHaveTextContent("Morgens")
    const morningFitnessSlider = getMorningFitnessSlider(date)
    expect(morningFitnessSlider).toBeInTheDocument()
    expect(morningFitnessSlider).toHaveStyle({ color: "rgb(255,255,0)" })

    const morningSleepSlider = getMorningSleepSlider(date)
    expect(morningSleepSlider).toBeInTheDocument()
    expect(morningSleepSlider).toHaveStyle({ color: "rgb(255,128,0)" })

    expect(card).toHaveTextContent("Abends")

    const eveningFitnessSlider = getEveningFitnessSlider(date)
    expect(eveningFitnessSlider).toBeInTheDocument()
    expect(eveningFitnessSlider).toHaveStyle({ color: "rgb(255,0,0)" })

    const lockOverlay = queryLockOverlay(date)
    expect(lockOverlay).toBeInTheDocument()
  })

  it("Add a new status", async () => {
    render(<Status />)

    const button = await screen.findByText("+ Status heute")
    await userEvent.click(button)

    const newDate = "31.03.2024"
    expect(getStatusCard(newDate)).toBeInTheDocument()

    expect(queryLockOverlay(newDate)).not.toBeInTheDocument()
  })

  it("Edit", async () => {
    vi.resetAllMocks()
    const patchSpy = vi.spyOn(statusService, "patchStatus")

    render(<Status />)
    
    const date = "01.01.2024"
    await waitFor(() => expect(getStatusCard(date)).toBeInTheDocument())

    const eveningFitnessSlider = within(getEveningFitnessSlider(date)).getByRole("slider")
    expect(eveningFitnessSlider).toBeInTheDocument()
    fireEvent.change(eveningFitnessSlider, { target: { value: 5 } })
    expect(patchSpy).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(eveningFitnessSlider).toHaveStyle({ color: "rgb(0,131,0)" })
      expect(patchSpy).toHaveBeenCalled()
    })
  })

  it("Delete", async () => {
    render(<Status />)

    const date = "01.01.2024"
    const deleteButton = await waitFor(() => getDeleteButton(date))

    await userEvent.click(deleteButton)

    expect(screen.queryByText(date)).toBeNull()
  })

  it("Unlock", async () => {
    render(<Status />)

    const date = "01.01.2024"
    const lockOverlay = await waitFor(() => queryLockOverlay(date)!)
    expect(lockOverlay).toBeInTheDocument()

    fireEvent.mouseDown(lockOverlay)
    await waitFor(() => setTimeout(() => {
      fireEvent.mouseUp(lockOverlay)
      const missingLockOverlay = queryLockOverlay(date)
      expect(missingLockOverlay).not.toBeInTheDocument()
    }, 500))    
  })
})
