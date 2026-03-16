import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import OverviewList from "./OverviewList"

describe("OverviewList", () => {
  const onClick = vi.fn()
  const onDelete = vi.fn().mockResolvedValue(undefined)
  const getData = vi.fn().mockResolvedValue([])
  const onSetNow = vi.fn().mockResolvedValue(undefined)
  const items = [
    { id: 1, date: new Date("2025/04/20 12:00"), severity: 3 },
  ]

  it("Renders and actions", async () => {
    render(
      <OverviewList
        items={items}
        onClick={onClick}
        onDelete={onDelete}
        getData={getData}
      />,
    )

    const listItem = await screen.findByText("20.04.2025 12:00")
    expect(listItem).toBeInTheDocument()
    fireEvent.click(listItem)
    await waitFor(() => expect(onClick).toHaveBeenCalled())
    const deleteButton = screen.getByTestId("delete-button")
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    await waitFor(() => expect(onDelete).toHaveBeenCalled())
  })

  it("Severity is shown", async () => {
    render(
      <OverviewList
        items={items}
        onClick={onClick}
        onDelete={onDelete}
        getData={getData}
        showSeverity
        severityColorMapping={() => "rgb(255,0,0)"}
      />,
    )

    await waitFor(() => {
      const severity = screen.getByTitle("Schwere").children[0]
      expect(severity).toBeInTheDocument()
      expect(severity).toHaveStyle({ color: "rgb(255,0,0)" })
    })
  })

  it("Optional setNow is possible", async () => {
    render(
      <OverviewList
        items={items}
        onClick={onClick}
        onDelete={onDelete}
        getData={getData}
        onSetNow={onSetNow}
      />,
    )

    const setNowButton = await screen.findByTestId("set-now-button")
    expect(setNowButton).toBeInTheDocument()
    fireEvent.click(setNowButton)
    await waitFor(() => expect(onSetNow).toHaveBeenCalled())
  })
})
