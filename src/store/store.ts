import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { injectPiidGetter } from "../api/api";
import {  createAuthSlice } from "./auth/authStore";
import { createConditionsSlice } from "./conditionEvents/conditionEventsStore";
import {  createConditionSlice } from "./conditionEvents/conditionEventStore";
import { wrapActionsWithErrorHandler } from "./error/errorHandler";
import { createHeadacheSlice } from "./headaches/headacheStore";
import { createLoadingSlice } from "./loading/loadingStore";
import { createIngredientSlice } from "./meal/ingredientStore";
import { createMealSlice } from "./meal/mealStore";
import {  createMedicineSlice } from "./medicines/medicines.store";
import { createNotesSlice } from "./notes/notesStore";
import { createPollensSlice } from "./pollen/pollenStore";
import {  createStatisticsSlice } from "./statistics/statisticsStore";
import { createStatusSlice } from "./status/statusStore";
import { StoreType } from "./store.type";
import { createSymptomSlice } from "./symptom/symptomStore";
import { createTemplateSlice } from "./templates/templates.store";



const useHista = create<StoreType>()(
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
      ...createTemplateSlice(...a),
      ...createLoadingSlice(...a),
    };
    return wrapActionsWithErrorHandler(store, createAuthSlice(...a));
  }),
);

injectPiidGetter(() => useHista.getState().piid);

export default useHista;
