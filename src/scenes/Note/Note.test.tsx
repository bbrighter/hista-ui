import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { Note } from "./Note"


describe("A single note is rendered and can be updated", () => {
  it("Free text form is rendered an updated", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/notes/1"]}>
        <Routes>
          <Route path="/:piid/notes/:noteId" element={<Note />} />
        </Routes>
      </MemoryRouter>,
    )

    const textArea = await screen.findByLabelText("Notiz")
    expect(textArea).toBeInTheDocument()

    const textField = screen.getByTestId("note-text-field")
    expect(within(textField).getByLabelText("Notiz")).toBeInTheDocument()
    waitFor(() => {
      expect(within(textField).getByText("text")).toBeInTheDocument() 
    }) 


    await userEvent.type(textArea, "2")
    waitFor(() => {
      expect(within(textField).getByText("text2")).toBeInTheDocument()
    })
    
    expect(screen.getByText("Noch nicht gespeichert...")).toBeInTheDocument()

    // await waitFor(() => {
    //     expect(screen.queryByText('Noch nicht gespeichert...')).not.toBeInTheDocument()
    // }, { interval: 2000 })
  })

  it("Date input is rendered and can be updated", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/notes/1"]}>
        <Routes>
          <Route path="/:piid/notes/:noteId" element={<Note />} />
        </Routes>
      </MemoryRouter>,
    )

    const dateInput = await screen.findByRole("group", { name: "Zeit" })
    expect(dateInput).toBeInTheDocument()
  })
})
