import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { createHeadache } from "@/__tests__/fixtures/headache";
import { getHeadacheListHandler } from "@/__tests__/mocks/headacheHandlers";
import { server } from "@/__tests__/setupTest";
import { HeadacheDiary } from "../HeadachesDiary";
import { getDownloadButton } from "./selectors";

describe("headache grid is rendered and headaches can be downloaded", () => {
	it("Grid and download button rendered", async () => {
		server.use(
			getHeadacheListHandler(createHeadache({ description: "description" })),
		);
		render(<HeadacheDiary />);

		const downloadButton = await waitFor(() => getDownloadButton());
		screen.getByRole("grid");
		await userEvent.click(downloadButton);
	});
});
