/* eslint-disable @typescript-eslint/no-explicit-any */
import { withErrorHandling } from "../errors";
import { conditionEvents } from "./conditionEvents.actions";
import { headaches }  from "./headhaches.actions"
import { ingredients } from "./ingredients.actions";
import { meals } from "./meals.actions";
import { intakes, medicines } from "./medicines.actions";
import { notes } from "./notes.actions";
import { pollens } from "./pollens.actions"
import { statistics } from "./statistics.actions"
import { status } from "./status.actions"
import { conditions,symptoms } from "./symptoms.actions";
import { templates } from "./templates.actions";

const createActions = <T extends Record<string, (...args: Array<any>) => Promise<any>>>(service: T): T => {
  const wrappedService: any = {}
  for (const [key, fn] of Object.entries(service)) {
    wrappedService[key] = (...args: Array<any>) => withErrorHandling(() => fn(...args))
  }
  return wrappedService
}

export const actions = {
  symptoms: createActions(symptoms),
  conditions: createActions(conditions),
  conditionEvents: createActions(conditionEvents),
  notes: createActions(notes),
  templates: createActions(templates),
  meals: createActions(meals),
  ingredients: createActions(ingredients),
  pollens: createActions(pollens),
  headaches: createActions(headaches),
  medicines: createActions(medicines),
  intakes: createActions(intakes),
  status: createActions(status),
  statistics: createActions(statistics),
}