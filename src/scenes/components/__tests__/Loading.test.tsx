import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "@/__tests__/setupTest";
import useHista from "@/store/store";
import { Button } from "../Loading/Button";
import { ProgressIndicator } from "../Loading/ProgressIndicator";

const useSpinner = (use: boolean) => {
	const { setUserSettings } = useHista.getState();
	setUserSettings({ loadingMode: use ? "spinner" : "none" });
};

describe("LoadingButton", () => {
	it("Use spinner", () => {
		useSpinner(true);

		render(<Button loading>Button</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("MuiButton-loading");
		within(button).getByRole("progressbar");
	});

	it("Don't use spinner", () => {
		useSpinner(false);

		render(<Button loading>Button</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("MuiButton-loading");
		expect(within(button).queryByRole("progressbar")).toBeNull();
		expect(button).toHaveTextContent("Lädt...");
	});
});

describe("ProgressIndicator", () => {
	it("Use spinner", () => {
		useSpinner(true);

		render(<ProgressIndicator />);
		screen.getByRole("progressbar");
		expect(screen.queryByRole("HourglassBottomIcon")).toBeNull();
	});

	it("Don't use spinner", () => {
		useSpinner(false);

		render(<ProgressIndicator />);
		expect(screen.queryByRole("progressbar")).toBeNull();
		screen.getByTestId("HourglassBottomIcon");
	});
});
