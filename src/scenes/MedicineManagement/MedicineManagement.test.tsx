import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { MedicineManagement } from "./MedicineManagement";

const getMedicineRow = (name: string): HTMLElement => {
  return screen.getByText(name).closest("li")!
}

const getAddMedicineButton = (): HTMLElement => {
  return screen.getByRole("button", { name: "Medikament hinzufügen" })
}

const isUnarchiveButton = (button: HTMLElement): boolean => {
  const archiveIcon = button.querySelector("svg")
  return archiveIcon.classList.contains("MuiSvgIcon-colorDisabled")
}

describe("Medicine Management", () => {
  it("Renders", async () => {
    render(<MemoryRouter><MedicineManagement/></MemoryRouter>)

    const addMedicineButton = await waitFor(() => getAddMedicineButton())
    expect(addMedicineButton).toBeInTheDocument()

    const nonArchivedRow = getMedicineRow("Medicine")
    expect(nonArchivedRow).toBeInTheDocument()
    expect(within(nonArchivedRow).getByTestId("archiveButton")).toBeInTheDocument()
    expect(within(nonArchivedRow).getByTestId("editButton")).toBeInTheDocument()

    const archivedRow = getMedicineRow("Archived medicine")
    expect(archivedRow).toBeInTheDocument()
  })

  it("Archive medicne", async () => {
    render(<MemoryRouter><MedicineManagement/></MemoryRouter>)

    const archivedRow = await waitFor(() => getMedicineRow("Archived medicine"))
    expect(archivedRow).toBeInTheDocument()

    const archiveButton = within(archivedRow).getByTestId("archiveButton")
    expect(isUnarchiveButton(archiveButton)).toBeTruthy()

    await userEvent.click(archiveButton)
    expect(isUnarchiveButton(archiveButton)).toBeFalsy()
  })

  it("Rename medicine", async () => {
    render(<MemoryRouter><MedicineManagement/></MemoryRouter>)

    const medicineRow = await waitFor(() => getMedicineRow("Medicine"))
    expect(medicineRow).toBeInTheDocument()

    const editButton = within(medicineRow).getByTestId("editButton")
    expect(editButton).toBeInTheDocument()
    await userEvent.click(editButton)

    const cancelButton = screen.getByTitle("Umbenennen abbrechen")
    expect(cancelButton).toBeInTheDocument()
    const saveButton = screen.getByTitle("Umbenennen speichern")
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    const inputField = screen.getByLabelText("Medikament")
    expect(inputField).toBeInTheDocument()

    await userEvent.clear(inputField)
    expect(saveButton).toBeDisabled()
    await userEvent.type(inputField, "Archived medicine")
    expect(saveButton).toBeDisabled()

    await userEvent.clear(inputField)
    await userEvent.type(inputField, "new name")
    expect(saveButton).not.toBeDisabled()

    await userEvent.click(saveButton)
    expect(getMedicineRow("new name")).toBeInTheDocument()
  })
})