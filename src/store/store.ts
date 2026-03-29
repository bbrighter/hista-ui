import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { injectPiidGetter } from "../api/api";
import { AuthStore, createAuthSlice } from "./auth/authStore";
import { ConditionsStore,createConditionsSlice } from "./conditionEvents/conditionEventsStore";
import { ConditionStore, createConditionSlice } from "./conditionEvents/conditionEventStore";
import { wrapActionsWithErrorHandler } from "./error/errorHandler";
import { createHeadacheSlice, HeadacheStore } from "./headaches/headacheStore";
import { createIngredientSlice, IngredientStore } from "./meal/ingredientStore";
import { createMealSlice, MealStore } from "./meal/mealStore";
import {
  createMedicineSlice,
  MedicineStore,
} from "./medicines/medicines.store";
import { createNotesSlice, NotesStore } from "./notes/notesStore";
import { createPollensSlice, PollenStore } from "./pollen/pollenStore";
import {
  createStatisticsSlice,
  StatisticsStore,
} from "./statistics/statisticsStore";
import { createStatusSlice, StatusStore } from "./status/statusStore";
import { createSymptomSlice, SymptomStore } from "./symptom/symptomStore";

const useHista = create<
    AuthStore &
    MealStore &
    IngredientStore &
    ConditionStore &
    ConditionsStore &
    SymptomStore &
    StatisticsStore &
    NotesStore &
    PollenStore &
    StatusStore &
    HeadacheStore &
    MedicineStore
>()(
  immer((...a) => {
    const store = {
      ...createMealSlice(...a),
      ...createIngredientSlice(...a),
      ...createAuthSlice(...a),
      ...createConditionSlice(...a),
      ...createConditionsSlice(...a),
      ...createSymptomSlice(...a),
      ...createStatisticsSlice(...a),
      ...createNotesSlice(...a),
      ...createPollensSlice(...a),
      ...createStatusSlice(...a),
      ...createHeadacheSlice(...a),
      ...createMedicineSlice(...a),
    };
    return wrapActionsWithErrorHandler(store, createAuthSlice(...a));
  }),
);

injectPiidGetter(() => useHista.getState().piid);

export default useHista;
