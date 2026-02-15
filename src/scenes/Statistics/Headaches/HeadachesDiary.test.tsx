import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HeadacheDiary } from "./HeadachesDiary"

describe("headache grid is rendered and headaches can be downloaded", () => {
  it("everything is rendered", async () => {
    render(<HeadacheDiary />)

    expect(await screen.findByText("Kopfschmerzen herunterladen")).toBeInTheDocument()
    expect(screen.getByText("description")).toBeInTheDocument()
  })

  it("download excel works", async () => {
    render(<HeadacheDiary />)

    const downloadButton = await screen.findByText("Kopfschmerzen herunterladen")
    expect(downloadButton).toBeInTheDocument()
  })
})
