import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OverviewList } from "./OverviewList";

describe("OverviewList", () => {
	const onClick = vi.fn();
	const onDelete = vi.fn().mockResolvedValue(undefined);
	const getData = vi.fn().mockResolvedValue([]);
	const onSetNow = vi.fn().mockResolvedValue(undefined);
	const items = [{ id: 1, date: new Date("2025/04/20 12:00"), severity: 3 }];

	it("Renders and actions", async () => {
		render(
			<OverviewList
				items={items}
				onClick={onClick}
				onDelete={onDelete}
				getData={getData}
			/>,
		);
		await waitFor(() => {
			expect(getData).toHaveBeenCalled();
		});

		const listItem = await screen.findByText("20.04.2025 12:00");
		expect(listItem).toBeInTheDocument();
		fireEvent.click(listItem);
		await waitFor(() => expect(onClick).toHaveBeenCalled());
		const deleteButton = screen.getByTestId("delete-button");
		expect(deleteButton).toBeInTheDocument();
		fireEvent.click(deleteButton);
		const modal = await waitFor(() => screen.getByRole("dialog"));
		expect(modal).toBeInTheDocument();
		const deleteConfirmButton = within(modal).getByRole("button", {
			name: "Löschen",
		});
		expect(deleteConfirmButton).toBeInTheDocument();
		await userEvent.click(deleteConfirmButton);
		expect(onDelete).toHaveBeenCalled();
	});

	it("Delete modal", async () => {
		const swipeDelete = async () => {
			const deleteButton = await screen.findByTestId("delete-button");
			expect(deleteButton).toBeInTheDocument();
			await userEvent.click(deleteButton);
		};

		render(
			<OverviewList
				items={items}
				onClick={onClick}
				onDelete={onDelete}
				getData={getData}
			/>,
		);

		await swipeDelete();
		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
		const cancelDeleteButton = within(modal).getByRole("button", {
			name: "Abbrechen",
		});
		expect(cancelDeleteButton).toBeVisible();
		await userEvent.click(cancelDeleteButton);
		expect(modal).not.toBeVisible();

		await swipeDelete();
		const deleteConfirmButton = within(modal).getByRole("button", {
			name: "Löschen",
		});
		expect(deleteConfirmButton).toBeInTheDocument();
		await userEvent.click(deleteConfirmButton);
		expect(onDelete).toHaveBeenCalled();
	});

	it("Optional severity is shown", async () => {
		render(
			<OverviewList
				items={items}
				onClick={onClick}
				onDelete={onDelete}
				getData={getData}
				showSeverity
				severityColorMapping={() => "rgb(255,0,0)"}
			/>,
		);

		await waitFor(() => {
			const severity = screen.getByTitle("Schwere").children[0];
			expect(severity).toBeInTheDocument();
			expect(severity).toHaveStyle({ color: "rgb(255,0,0)" });
		});
	});

	it("Optional setNow is possible", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2020, 1, 1, 13, 0, 0, 0));

		render(
			<OverviewList
				items={items}
				onClick={onClick}
				onDelete={onDelete}
				getData={getData}
				onSetNow={onSetNow}
			/>,
		);
		vi.advanceTimersToNextTimer();

		const setNowButton = screen.getByTestId("set-now-button");
		expect(setNowButton).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(setNowButton);
			vi.advanceTimersToNextTimer();
		});

		expect(onSetNow).toHaveBeenCalled();

		vi.useRealTimers();
	});

	it("Only show top 20, button shows more", async () => {
		const manyItems = Array.from({ length: 100 }, (_, i) => ({
			id: i,
			date: new Date(Date.now() - i * 60 * 60 * 24),
		}));
		render(
			<OverviewList
				items={manyItems}
				onClick={onClick}
				onDelete={onDelete}
				getData={getData}
				onSetNow={onSetNow}
			/>,
		);

		const showMoreButton = await screen.findByRole("button", {
			name: "Alle anzeigen",
		});
		expect(showMoreButton).toBeVisible();

		expect(screen.queryAllByRole("listitem")).toHaveLength(20);

		await userEvent.click(showMoreButton);
		expect(screen.queryAllByRole("listitem")).toHaveLength(99);
	});
});
