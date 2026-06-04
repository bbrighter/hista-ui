import type { hista } from "../../api/generatedApi";

export type Pollen = {
	date: Date;
	ambrosia: PollenIntensity;
	beifuss: PollenIntensity;
	birke: PollenIntensity;
	erle: PollenIntensity;
	esche: PollenIntensity;
	graeser: PollenIntensity;
	hasel: PollenIntensity;
	roggen: PollenIntensity;
};

interface PollenIntensity {
	intensity: number;
	intensityString: string;
}

export const respToPollens = (
	resp: hista.PollenEventListResponse,
): Array<Pollen> => {
	return resp.pollens.map((pol) => ({
		date: new Date(pol.date),
		ambrosia: findIntensity(pol.pollens, "Ambrosia"),
		beifuss: findIntensity(pol.pollens, "Beifuss"),
		birke: findIntensity(pol.pollens, "Birke"),
		erle: findIntensity(pol.pollens, "Erle"),
		esche: findIntensity(pol.pollens, "Esche"),
		graeser: findIntensity(pol.pollens, "Gräser"),
		hasel: findIntensity(pol.pollens, "Hasel"),
		roggen: findIntensity(pol.pollens, "Roggen"),
	}));
};

const findIntensity = (
	resp: Array<hista.PollenResponse>,
	type: string,
): PollenIntensity => {
	const relevant = resp.find((p) => p.type === type);
	return {
		intensity: relevant?.intensity || 0,
		intensityString: relevant?.intensityString || "Keine",
	};
};
