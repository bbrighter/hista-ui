import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	DownloadExcelButton,
	type DownloadExcelButtonProps,
} from "../DownloadExcelButton/DownloadExcelButton";

const mocks = vi.hoisted(() => ({
	writeFile: vi.fn(),
}));

vi.mock("xlsx", () => ({
	writeFile: mocks.writeFile,
}));

describe("DownloadExcelButton component", () => {
	afterEach(() => vi.useRealTimers());

	type testType = { a: number };
	const createWorkbook = vi.fn();
	const renderDownloadExcelButton = (
		props: Partial<DownloadExcelButtonProps<testType>> = {},
	) =>
		render(
			<DownloadExcelButton
				label={"Label"}
				fileTitle={"fileTitle"}
				entries={[]}
				createWorkbook={createWorkbook}
				{...props}
			/>,
		);

	it("Render and click", async () => {
		const createWorkbook = vi.fn().mockResolvedValue({ something: "" });
		renderDownloadExcelButton({ createWorkbook: createWorkbook });

		const button = screen.getByRole("button", { name: "Label" });
		await userEvent.click(button);
		await waitFor(() => {
			expect(createWorkbook).toHaveBeenCalledExactlyOnceWith([]);
			expect(mocks.writeFile).toHaveBeenCalledExactlyOnceWith(
				{ something: "" },
				"fileTitle.xlsx",
			);
		});
	});

	it("Loading", async () => {
		vi.useFakeTimers();
		const createWorkbook = vi
			.fn()
			.mockImplementation(
				() => new Promise((resolve) => setTimeout(resolve, 100)),
			);
		renderDownloadExcelButton({ createWorkbook });

		const button = screen.getByRole("button", { name: "Label" });
		await act(async () => fireEvent.click(button));
		expect(button).toHaveClass("MuiButton-loading");
		await act(async () => vi.advanceTimersByTime(100));
		expect(button).not.toHaveClass("MuiButton-loading");
	});
});
