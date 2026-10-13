import { t } from "@lingui/core/macro";
import type { Nutrition } from "@/store";

type NutritionInfo = {
	id: number;
	name: string;
	color: string;
	shortName: string;
};

type NutritionKey = keyof Nutrition;

export const NUTRITIONS: Record<NutritionKey, NutritionInfo> = {
	fat: { id: 0, name: t`Fett`, color: "#F4C542", shortName: t`F` },
	protein: { id: 1, name: t`Eiweiß`, color: "#b12323", shortName: t`E` },
	carbohydrate: {
		id: 2,
		name: t`Kohlenhydrate`,
		color: "#4A90E2",
		shortName: t`K`,
	},
	fiber: { id: 3, name: t`Ballaststoffe`, color: "#4CAF50", shortName: t`B` },
} as const;
