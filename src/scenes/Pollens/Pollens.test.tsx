import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@mui/material/useMediaQuery", async () => ({ default: mocks.useMediaQuery }))

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { render, screen, waitFor, within } from "@testing-library/react"

import Pollens from "./Pollens"

vi.mock("/src/scenes/Pollens/components/ambrosia.svg?react", () => ({
  default: () => <span data-testid="ambrosia-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/beifuss.svg?react", () => ({
  default: () => <span data-testid="beifuss-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/birke.svg?react", () => ({
  default: () => <span data-testid="birke-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/erle.svg?react", () => ({
  default: () => <span data-testid="erle-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/esche.svg?react", () => ({
  default: () => <span data-testid="esche-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/graeser.svg?react", () => ({
  default: () => <span data-testid="gräser-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/hasel.svg?react", () => ({
  default: () => <span data-testid="hasel-icon" />,
}))
vi.mock("/src/scenes/Pollens/components/roggen.svg?react", () => ({
  default: () => <span data-testid="roggen-icon" />,
}))

const mocks = vi.hoisted(() => ({
  useMediaQuery: vi.fn(),
}))

describe("Everything is rendered", () => {
  const theme = createTheme()
  beforeEach(() => {
    mocks.useMediaQuery.mockReset()
  })

  it("Grid is rendered on large screen", async () => {
    // For whatever strange reason, the media query is not set correctly
    mocks.useMediaQuery.mockReturnValue(true)
    render(<ThemeProvider theme={theme}><Pollens /></ThemeProvider>)

    await waitFor(() => {
      const firstRow = screen.getByText("2.1.2024").closest("li") as HTMLElement
      expect(firstRow).toBeInTheDocument()
      const secondRow = screen.getByText("1.1.2024").closest("li") as HTMLElement
      expect(secondRow).toBeInTheDocument()

      expect(within(firstRow).getByTestId("pollen-cell-erle")).toHaveStyle({ "background-color": "rgb(173,255,47)" })
      expect(within(firstRow).getByTestId("pollen-cell-birke")).toHaveStyle({ "background-color": "rgb(255,165,0)" })
      expect(within(secondRow).getByTestId("pollen-cell-erle")).toHaveStyle({ "background-color": "rgb(0,128,0)" })
    })

    const columns = ["Ambrosia", "Beifuss", "Birke", "Erle", "Esche", "Gräser", "Hasel", "Roggen"]
    columns.forEach((c) => {
      expect(screen.getByText(c)).toBeInTheDocument()
    })
  })

  it("Grid is rendered on small screen", async () => {
    mocks.useMediaQuery.mockReturnValue(false)
    render(<ThemeProvider theme={theme}><Pollens /></ThemeProvider>)

    const firstRow = (await screen.findByText("2.1.2024")).closest("li") as HTMLElement
    expect(firstRow).toBeInTheDocument()
    const secondRow = screen.getByText("1.1.2024").closest("li") as HTMLElement
    expect(secondRow).toBeInTheDocument()

    const columns = ["Ambrosia", "Beifuss", "Birke", "Erle", "Esche", "Gräser", "Hasel", "Roggen"]
    columns.forEach((c) => {
      expect(screen.queryByText(c)).not.toBeInTheDocument()
      expect(screen.getByTestId(`${c.toLowerCase()}-icon`)).toBeInTheDocument()
    })

    expect(within(firstRow).getByTestId("pollen-cell-erle")).toHaveStyle({ "background-color": "rgb(173,255,47)" })
    expect(within(firstRow).getByTestId("pollen-cell-birke")).toHaveStyle({ "background-color": "rgb(255,165,0)" })
    expect(within(secondRow).getByTestId("pollen-cell-erle")).toHaveStyle({ "background-color": "rgb(0,128,0)" })
  })
})
