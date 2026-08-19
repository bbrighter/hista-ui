import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createHeadache } from "@/__tests__/fixtures/headache";
import { getHeadacheListHandler } from "@/__tests__/mocks/headacheHandlers";
import { server } from "@/__tests__/setupTest";
import { HeadacheDiary } from "./HeadachesDiary";

describe("headache grid is rendered and headaches can be downloaded", () => {
	it("everything is rendered", async () => {
		server.use(
			getHeadacheListHandler(createHeadache({ description: "description" })),
		);
		render(<HeadacheDiary />);

		expect(
			await screen.findByText("Kopfschmerzen herunterladen"),
		).toBeInTheDocument();
		expect(screen.getByText("description")).toBeInTheDocument();
	});

	it("download excel works", async () => {
		render(<HeadacheDiary />);

		const downloadButton = await screen.findByText(
			"Kopfschmerzen herunterladen",
		);
		expect(downloadButton).toBeInTheDocument();
	});
});
