import { beforeEach } from "node:test"

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { delay, http, HttpResponse } from "msw"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import { server } from "../../__tests__/setupTest"
import { actions } from "../../actions"
import Headache from "./Headache"

const getTagByText = (text: string): HTMLElement => {
  const tagText = screen.getByText(text)
  return tagText.closest("div")!
}

const isTagActive = (text: string): boolean => {
  const tag = getTagByText(text)
  return tag.className.includes("colorPrimary")
}

describe("A headache can be edited and displayed", () => {
  const patchHeadacheSeverity = vi.spyOn(actions.headaches, "patchSeverity")
  const patchHeadachePositions = vi.spyOn(actions.headaches, "patchPositions")
  const patchHeadacheTypes = vi.spyOn(actions.headaches, "patchTypes")
  const patchHeadacheSymptoms = vi.spyOn(actions.headaches, "patchSymptoms")

  beforeEach(() => {
    vi.resetAllMocks()
  })
  it("Change the date", { skip: true }, async () => {

  })

  it("Change severity", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    const symptom = await screen.findByText("Schwere")
    const listItem = symptom.closest("div")!
    const slider = within(listItem).getByRole("slider")
    expect(slider).toHaveValue("3")

    fireEvent.change(slider, { target: { value: "1" } })
    expect(slider).toHaveValue("1")
    expect(screen.getByTestId("slider-icon")).toHaveStyle({ backgroundColor: "rgb(51,255,0)" })
    await waitFor(() => {
      expect(patchHeadacheSeverity).toHaveBeenCalledOnce()
    })
  })

  it("Change position", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    const expectedTags = [
      { name: "Links", active: true },
      { name: "Rechts", active: true },
      { name: "Oben", active: false },
      { name: "Hinterkopf", active: false },
      { name: "Seite", active: false },
      { name: "Schläfe", active: false },
      { name: "Stirn", active: false },
      { name: "Ohr", active: false },
      { name: "Nacken", active: false },
    ]
    await waitFor(() => {
      expectedTags.forEach((t) => {
        expect(getTagByText(t.name)).toBeInTheDocument()
        expect(isTagActive(t.name)).toBe(t.active)
      })
    })

    const upTag = getTagByText("Oben")
    await userEvent.click(upTag)
    
    // expect(isTagActive("Oben")).toBeTruthy()
    expect(patchHeadachePositions).toHaveBeenCalledOnce()
    


    const leftTag = getTagByText("Links")
    await userEvent.click(leftTag)
    expect(isTagActive("Links")).toBeFalsy()
    expect(patchHeadachePositions).toHaveBeenCalledTimes(2)
  })

  it("Change type", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    const expectedTags = [
      { name: "Pulsierend-pochend", active: false },
      { name: "Dumpf-drückend", active: false },
      { name: "Stechend", active: true },
    ]
    await waitFor(() => {
      expectedTags.forEach((t) => {
        expect(getTagByText(t.name)).toBeInTheDocument()
        expect(isTagActive(t.name)).toBe(t.active)
      })
    })

    const stabbingTag = getTagByText("Stechend")
    await userEvent.click(stabbingTag)
    expect(patchHeadacheTypes).toHaveBeenCalledOnce()
    expect(isTagActive("Stechend")).toBeFalsy()
  })

  it("Change symptoms", async () => {
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(isTagActive("Übelkeit")).toBeTruthy()
      expect(isTagActive("Schwindel")).toBeFalsy()
    })
    const dizzinessTag = getTagByText("Schwindel")
    await userEvent.click(dizzinessTag)
    expect(isTagActive("Schwindel")).toBeTruthy()
    expect(patchHeadacheSymptoms).toHaveBeenCalledOnce()

    const nauseaTag = getTagByText("Übelkeit")
    await userEvent.click(nauseaTag)
    expect(isTagActive("Übelkeit")).toBeFalsy()
    expect(patchHeadacheSymptoms).toHaveBeenCalledTimes(2)
  })

  it("Change description", async () => {
    // const patchHeadacheDescription = vi.spyOn(useHista.getState(), 'patchHeadacheDescription')
    render(
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    const description = await screen.findByText("description")
    expect(description).toBeInTheDocument()

    await userEvent.type(description, "2")
    expect(screen.getByText("description2")).toBeInTheDocument()
    // Timeout is too long!
    // await waitFor(() => {
    //     expect(patchHeadacheDescription).toHaveBeenCalled()
    // }, { timeout: 5000 })
  })

  it("Show loading indicator", async () => {
    server.use(
      http.get("http://localhost:4444/piid/:piid/headaches/:id", async () => {
        await delay(100)
        return HttpResponse.json({  id: 1,
          date: "2022-01-01T00:00:00Z",
          severity: 3,
          types: ["stabbing"],
          positions: ["left", "right"],
          symptoms: ["tired", "nausea"],
          description: "description" })}),
    )
    render(      
      <MemoryRouter initialEntries={["/7b3047c2-d56d-4942-abc4-39eb85e785f2/headaches/1"]}>
        <Routes>
          <Route path="/:piid/headaches/:headacheId" element={<Headache />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByTestId("loading-spinner")).toBeVisible()

    await waitFor(() => expect(screen.queryByTestId("loading-spinner")).not.toBeVisible())
  })
})
