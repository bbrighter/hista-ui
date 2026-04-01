export * from "./conditionEvents.service"
export * from "./ingredients.service";
export * from "./meal.service"
export * from "./medicines.service";
export * from "./statistics.service";
export * from "./status.service"

import { conditionEvents } from "./conditionEvents.service";
import { notes } from "./notes.service";
import { conditions,symptoms } from "./symptoms.service";

export const services = {
  symptoms,
  conditions,
  conditionEvents,
  notes,
}