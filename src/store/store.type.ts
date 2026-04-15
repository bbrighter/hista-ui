import { User } from "@bbrighter/auth-module/users";

import { Instance } from "./auth/instance";
import { Condition, ConditionEvent, ConditionEvents, Food, Headache, HeadachePositions, HeadacheSymptoms, HeadacheTypes, Ingredient, Ingredients, Meal, Meals, Medicine, MetaConditionEvent, MetaMeal, Note, Notes, NutritionStatistics, Pollens, RawDiary, Status, Statuses, Symptom, SymptomCategories, SymptomCategory, SymptomStatistics, Template, Templates } from "./types";
import { Intake } from "./types/medicines.types";

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


export type ConditionEventsStore = {
  conditionEvents: ConditionEvents
  isConditionEventsLoaded: boolean

  resetConditionEvents: () => void
      
  setConditionEvents: (events: ConditionEvents) => void
  removeConditionEvent: (id: number) => void
  addConditionEvent: (event: MetaConditionEvent) => void
  updateConditionEvents: (id: number, part: Partial<ConditionEvent>) => void
        
  setIsConditionEventsLoaded: (loaded: boolean) => void
}

export type ConditionEventStore = {
  conditionEvent: ConditionEvent
    
  resetConditionEvent: () => void
    
  setConditionEvent: (event: ConditionEvent) => void
  updateConditionEvent: (id: number, part: Partial<ConditionEvent>) => void
    
  removeCondition: (id: number) => void
  addCondition: (cond: Condition) => void
  updateCondition: (id: number, part: Partial<Condition>) => void 
}

export type HeadacheStore = {
  headaches: Array<Headache>
  headache: Headache
      
  isHeadacheLoaded: boolean
  resetHeadaches: () => void
    
  getHeadaches(): Promise<Array<Headache>>
  getHeadache(id: number): Promise<void>
  postHeadache(): Promise<number>
  deleteHeadache(id: number): Promise<void>
    
  patchHeadacheSeverity(newSeverity: number): Promise<void>
  patchHeadacheDate(date: Date): Promise<void>
  patchHeadachePositions(pos: HeadachePositions): Promise<void>
  patchHeadacheTypes(types: HeadacheTypes): Promise<void>
  patchHeadacheSymptoms(symptoms: HeadacheSymptoms): Promise<void>
  patchHeadacheDescription(description: string): Promise<void>
}

export const loadingEntities = ["templates"] as const
export type LoadingEntity = typeof loadingEntities[number]

export type LoadingStore = {
  loaded: Record<LoadingEntity, boolean>
    
  resetLoaded: () => void
  setLoaded: (k: LoadingEntity) => void    
}


export type IngredientStore = {
  ingredients: Ingredients
  isIngredientsLoaded: boolean

  resetIngredients: () => void
  setIngredients: (ingredients: Ingredients) => void
  updateIngredient: (id: number, update: Partial<Ingredient>) => void
  setIsIngredientsLoaded: (loaded: boolean) => void
    
}

export type MealStore = {
  meals: Meals
  meal: Meal
  isMealsLoaded: boolean

  resetMeals: () => void
  setIsMealsLoaded: (loaded: boolean) => void
    
  setMeals: (meals: Meals) => void
  setMetaMeal: (id: number, meal: Partial<MetaMeal>) => void
  setMeal: (meal: Meal) => void
  removeMeal: (id: number) => void
  updateMeal: (partial: Partial<Meal>) => void
    
  addFood: (food: Food | Array<Food>) => void
  removeFood: (id: number) => void
  updateFood: (id: number, partial: Partial<Food>) => void
}

export interface MedicineStore {
  medicines: Array<Medicine>;
  intakes: Array<Intake>;
  isMedicinesLoaded: boolean
  isIntakesLoaded: boolean

  resetMedicines: () => void;
  setIsMedicinesLoaded: (loaded: boolean) => void
  setIsIntakesLoaded: (loaded: boolean) => void
  setMedicines: (medicines: Array<Medicine>) => void;
  updateMedicine: (id: number, medicine: Partial<Medicine>) => void;
  changeOrder: (id: number, targetIndex: number) => void;
  setIntakes: (intakes: Array<Intake>) => void;
  changeMedicineIntake: (id: number, date: Date, value: number) => void;
}

export interface NotesStore {
  notes: Notes
  notesAreLoaded: boolean

  resetNotes: () => void
    
  setNotes: (notes: Notes) => void
  updateNote: (id: number, part: Partial<Note>) => void
  deleteNote: (id: number) => void
  addNote: (note: Note) => void
    
  setNotesAreLoaded: (loaded: boolean) => void
    
}

export interface PollenStore {
  pollensAreLoaded: boolean
  pollens: Pollens

  resetPollens: () => void
    
  getPollens: () => Promise<void>
    
}

export interface StatisticsStore {
    
  diaryEntries: Array<RawDiary>
  statistics: SymptomStatistics
  mealCount: number
  nutrutionStatistics: NutritionStatistics

  setDiaryEntries: (diaries: Array<RawDiary>) => void
  setMealCount: (count: number) => void
  setSymptomStatistics: (stats: SymptomStatistics) => void
  resetStatistics: () => void
  setNutritionStatistics: (stats: NutritionStatistics) => void
    
}

export interface StatusStore {
  statuses: Statuses
  statusIsLoaded: boolean
    
  resetStatus: () => void
  setStatusList: (statuses: Array<Status>) => void
  addStatus: (status: Status) => void
  updateStatus: (id: number, update: Partial<Status>) => void
  removeStatus: (id: number) => void
  setStatusIsLoaded: (loaded: boolean) => void,
}

export interface SymptomStore {
  symptoms: SymptomCategories
  symptomsAreLoaded: boolean
    
  resetSymptoms: () => void  
  setSymptoms: (s: SymptomCategories) => void
  setSymptomsAreLoaded: (loaded: boolean) => void 
  addCategory: (c: SymptomCategory) => void
  removeCategory: (id: number) => void
  updateCategory: (id: number, part: Partial<SymptomCategory>) => void
  updateSymptom: (id: number, part: Partial<Symptom>) => void
}

export interface TemplateStore {
  templates: Templates
      
  resetTemplates: () => void
  setTemplates: (templates: Templates) => void
  addTemplate: (id: number, template: Template) => void
  changeTemplate: (id: number, template: Partial<Template>) => void
  removeTemplate: (id: number) => void
}