import { fireEvent, render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "./__tests__/setupTest";
import { type APIError, ErrCode } from "./api/generatedApi";
import { Router } from "./routes";

describe("Error handling in notes", () => {
	it("On API error", async () => {
		// Only test that the page is called. Do not verify its contents.
		server.use(
			http.get("*/permissions", () => {
				return HttpResponse.json({
					instances: [{ piid: "piid", product: "hista-complete" }],
					userName: "user",
					userId: "1234",
				});
			}),
		);
		server.use(
			http.get("http://localhost:4444/piid/:piid/notes", async () => {
				return HttpResponse.json(
					{
						code: ErrCode.Internal,
						message: "message",
						name: "name",
						status: 500,
					} satisfies APIError,
					{ status: 500 },
				);
			}),
		);

		render(<Router />);

		const notes = await screen.findByText("Notizen");
		expect(notes).toBeInTheDocument();
		fireEvent.click(notes);
		expect(await screen.findByText("Error stack")).toBeInTheDocument();
		expect(screen.getByText("message - 500")).toBeInTheDocument();
	});
});
