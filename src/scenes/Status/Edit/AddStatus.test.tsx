import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AddStatus } from "./AddStatus";

describe("Add status component", () => {
	const onAddStatus = vi.fn();

	beforeEach(() => {
		vi.resetAllMocks();
		// vi.useFakeTimers();
		vi.setSystemTime(new Date("2018-04-13 19:18"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("Renders", async () => {
		render(
			<AddStatus
				disabled={false}
				onAddStatus={onAddStatus}
				statusExistsDayBefore
				statusExistsToday
				statusExistsYesterday
			/>,
		);

		await screen.findByTestId("addStatusButton");
		const menuButton = screen.getByTestId("statusMenuButton");
		await userEvent.click(menuButton);

		expect(screen.getByRole("menuitem", { name: "Gestern" })).toBeVisible();
		expect(screen.getByRole("menuitem", { name: "Vorgestern" })).toBeVisible();
	});

	it("Add today", async () => {
		render(
			<AddStatus
				disabled={false}
				onAddStatus={onAddStatus}
				statusExistsDayBefore
				statusExistsToday={false}
				statusExistsYesterday
			/>,
		);

		const addButton = await screen.findByTestId("addStatusButton");
		expect(addButton).not.toBeDisabled();

		await userEvent.click(addButton);
		expect(onAddStatus).toHaveBeenCalledOnce();
		const call = onAddStatus.mock.calls[0][0];
		expect(call.format("YYYY-MM-DD")).toBe("2018-04-13");
	});

	it("Add yesterday", async () => {
		render(
			<AddStatus
				disabled={false}
				onAddStatus={onAddStatus}
				statusExistsDayBefore={false}
				statusExistsToday={false}
				statusExistsYesterday={false}
			/>,
		);

		const menuButton = await screen.findByTestId("statusMenuButton");
		await userEvent.click(menuButton);

		const yesterday = screen.getByRole("menuitem", { name: "Gestern" });

		await userEvent.click(yesterday);
		expect(onAddStatus).toHaveBeenCalledOnce();
		const call = onAddStatus.mock.calls[0][0];
		expect(call.format("YYYY-MM-DD")).toBe("2018-04-12");
	});

	it("Add day before yesterday", async () => {
		render(
			<AddStatus
				disabled={false}
				onAddStatus={onAddStatus}
				statusExistsDayBefore={false}
				statusExistsToday={false}
				statusExistsYesterday={false}
			/>,
		);

		const menuButton = await screen.findByTestId("statusMenuButton");
		await userEvent.click(menuButton);

		const button = screen.getByRole("menuitem", { name: "Vorgestern" });

		await userEvent.click(button);
		expect(onAddStatus).toHaveBeenCalledOnce();
		const call = onAddStatus.mock.calls[0][0];
		expect(call.format("YYYY-MM-DD")).toBe("2018-04-11");
	});
});
