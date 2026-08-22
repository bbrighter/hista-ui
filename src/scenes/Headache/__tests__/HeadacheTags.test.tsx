import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	HeadacheTags,
	type ValueLabelPair,
} from "../HeadacheTags/HeadacheTags";
import { getTagByName, isTagActive } from "./selectors";

describe("HeadacheTags component", () => {
	const updateTags = vi.fn();
	const options = [
		{ value: "1", label: "Option active" },
		{ value: "2", label: "Option not active" },
	] satisfies Array<ValueLabelPair>;
	const values = [options[0]];

	it("Renders", () => {
		render(
			<HeadacheTags
				label="Label"
				options={options}
				values={values}
				updateTags={updateTags}
			/>,
		);

		screen.getByText("Label");

		const option1 = getTagByName("Option active");
		expect(isTagActive(option1)).toBeTruthy();
		const option2 = getTagByName("Option not active");
		expect(isTagActive(option2)).toBeFalsy();
	});

	it("Adding a tag sends both, new and old", async () => {
		render(
			<HeadacheTags
				label="Label"
				options={options}
				values={values}
				updateTags={updateTags}
			/>,
		);

		const option = getTagByName("Option not active");
		await userEvent.click(option);

		expect(updateTags).toHaveBeenCalledExactlyOnceWith(options);
	});

	it("Removing the last tag sends none", async () => {
		render(
			<HeadacheTags
				label="Label"
				options={options}
				values={values}
				updateTags={updateTags}
			/>,
		);

		const option = getTagByName("Option active");
		await userEvent.click(option);

		expect(updateTags).toHaveBeenCalledExactlyOnceWith([]);
	});

	it("Removing one from two sends one", async () => {
		render(
			<HeadacheTags
				label="Label"
				options={options}
				values={options}
				updateTags={updateTags}
			/>,
		);

		const option = getTagByName("Option active");
		await userEvent.click(option);

		expect(updateTags).toHaveBeenCalledExactlyOnceWith([options[1]]);
	});
});
