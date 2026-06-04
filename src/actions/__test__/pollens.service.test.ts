import { expect, it } from "vitest";

import useHista from "../../store/store";
import { actions } from "..";

it("list pollens", async () => {
	await actions.pollens.list();

	const { pollens, loaded } = useHista.getState();
	expect(pollens).toHaveLength(2);
	const firstPollen = pollens[0];
	expect(firstPollen.erle.intensity).toBe(2);
	expect(firstPollen.ambrosia.intensity).toBe(0);

	const secondPollen = pollens[1];
	expect(secondPollen.erle.intensity).toBe(3);
	expect(secondPollen.birke.intensity).toBe(5);
	expect(loaded.pollens).toBeTruthy();
});
