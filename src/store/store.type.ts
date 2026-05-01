import { User } from "@bbrighter/auth-module/users";

import { Instance } from "./auth/instance";
import { AddAction, BaseArrayStore, BaseRecordStore, ResetAction, SetAction, SetSingleAction, UpdateAction } from "./genericTypes";
import * as types from "./types"

export type StoreType = AuthStore &
    MealStore &
    IngredientStore &
    ConditionEventStore &
    ConditionEventsStore &
    SymptomStore &
    StatisticsStore &
    NotesStore &
    PollenStore &
    StatusStore &
    HeadacheStore &
    MedicineStore &
    TemplateStore &
    LoadingStore


export type NonFunctionProperties<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}


export type AuthStore = {
  instances: Array<Instance>
  token: string
  piid: string | null
  userName: string
  users: Array<User>
  instancesAreLoaded: boolean

  setPiid: (piid: string) => void
  setInstances: (instances: Array<Instance>) => Promise<void>
  setToken: (token: string) => void
  setUserName: (name: string) => void
  setUsers: (users: Array<User>) => void
  setInstancesLoaded: (isLoaded: boolean) => void
}


export type ConditionEventStore = {
  conditionEvent: types.ConditionEvent
    
  resetConditionEvent: () => void
    
  setConditionEvent: (event: types.ConditionEvent) => void
  updateConditionEvent: (id: number, part: Partial<types.ConditionEvent>) => void
    
  removeCondition: (id: number) => void
  addCondition: (cond: types.Condition) => void
  updateCondition: (id: number, part: Partial<types.Condition>) => void 
}

export const loadingEntities = [
  "templates",
  "statuses", 
  "ingredients",
  "conditionEvents",
  "conditionEvent",
  "medicines",
  "intakes",
  "notes",
  "symptoms",
  "pollens",
  "meal",
  "meals",
  "headaches",
  "headache",
] as const
export type LoadingEntity = typeof loadingEntities[number]

export type LoadingStore = {
  loaded: Record<LoadingEntity, boolean>
    
  resetLoaded: () => void
  setLoaded: (k: LoadingEntity, loaded?: boolean) => void    
}


export type IngredientStore = BaseArrayStore<types.Ingredient, "ingredients", "ingredient"> 
export type StatusStore = BaseArrayStore<types.Status, "statuses", "status">
export type ConditionEventsStore = BaseArrayStore<types.MetaConditionEvent, "metaConditionEvents", "metaConditionEvent">
export type TemplateStore = BaseRecordStore<types.Template, "templates", "template">

type MedicineActions = 
    SetAction<types.Medicine,"medicines"> & 
    ResetAction<"medicines"> & 
    AddAction<types.Medicine, "medicine"> & 
    UpdateAction<types.Medicine, "medicine"> 
export type MedicineState = {medicines: Array<types.Medicine>}
type IntakeState = {intakes: Array<types.Intake>}
type IntakeActions = SetAction<types.Intake, "intakes"> & {  changeMedicineIntake: (id: number, date: Date, value: number) => void;
  changeOrder: (id: number, targetIndex: number) => void;
}
export type MedicineStore =  MedicineState & MedicineActions & IntakeState & IntakeActions

export type NotesStore = BaseRecordStore<types.Note, "notes", "note">
export type SymptomStore = 
    BaseArrayStore<types.SymptomCategory, "symptoms", "category"> & 
    UpdateAction<types.Symptom, "symptom">
export type PollenStore = SetAction<types.Pollen, "pollens"> &
    ResetAction<"pollens"> &
    { pollens: Array<types.Pollen>}

export type MealStore = {
  meals: types.Meals
  meal: types.Meal

  resetMeals: () => void
    
  setMeals: (meals: types.Meals) => void
  setMetaMeal: (id: number, meal: Partial<types.MetaMeal>) => void
  setMeal: (meal: types.Meal) => void
  removeMeal: (id: number) => void
  updateMeal: (partial: Partial<types.Meal>) => void
    
  addFood: (food: types.Food | Array<types.Food>) => void
  removeFood: (id: number) => void
  updateFood: (id: number, partial: Partial<types.Food>) => void
}

export interface StatisticsStore {
  diaryEntries: Array<types.RawDiary>
  statistics: types.SymptomStatistics
  mealCount: number
  nutritionStatistics: types.NutritionStatistics

  setDiaryEntries: (diaries: Array<types.RawDiary>) => void
  setMealCount: (count: number) => void
  setSymptomStatistics: (stats: types.SymptomStatistics) => void
  resetStatistics: () => void
  setNutritionStatistics: (stats: types.NutritionStatistics) => void
}

export type HeadacheStore = 
  BaseRecordStore<types.Headache, "headaches", "headache"> &
  {headache: types.Headache} & SetSingleAction<types.Headache, "headache">