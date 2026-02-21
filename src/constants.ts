export const mealConstants = {
  RAW: "Roh",
  COOKED: "Gar",
} as const;

const noPiidRoutes = {
  homepage: "/",
  error: "/error",
  login: "/login",
};

const piidRoutes = {
  homepagePiid: "/",
  meals: "/meals",
  mealDetails: "/meals/:mealId",
  conditionEvents: "/condition-events/",
  conditionEventDetails: "/condition-events/:eventId",
  statistics: "/statistics",
  notes: "/notes",
  noteDetails: "/notes/:noteId",
  pollens: "/pollens",
  statuses: "/statuses",
  statusDetails: "/statuses/:statusId",
  headaches: "/headaches",
  headacheDetails: "/headaches/:headacheId",
  manageSymptoms: "/manage-symptoms",
  manageIngredients: "/manage-ingredients",
  medicines: "/medicines",
  manageMedicines: "/manage-medicines",
};

const addPiid = (route: string): string => {
  return "/:piid" + route;
};

function mapValues<T extends Record<string, string>>(
  obj: T,
  fn: (value: string, key: keyof T) => string,
): { [K in keyof T]: string } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key as keyof T)]),
  ) as { [K in keyof T]: string };
}

export const appRoutes = {
  ...noPiidRoutes,
  ...mapValues(piidRoutes, addPiid),
} as const;

export function buildPath(
  template: string,
  params: Record<string, string | number> = {},
): string {
  return Object.entries(params).reduce(
    (path, [key, value]) =>
      path.replace(`:${key}`, encodeURIComponent(String(value))),
    template,
  );
}
