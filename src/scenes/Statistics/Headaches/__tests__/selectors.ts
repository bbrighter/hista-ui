import { screen } from "@testing-library/react";

export const getDownloadButton = () =>
	screen.getByRole("button", {
		name: "Kopfschmerzen herunterladen",
	});
