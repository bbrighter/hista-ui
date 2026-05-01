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

export const actions = {
  symptoms,
  conditions,
  conditionEvents,
  notes,
  templates,
  meals,
  ingredients,
  pollens,
  headaches,
  medicines,
  intakes,
  status,
  statistics,
}