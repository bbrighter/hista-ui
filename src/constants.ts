export const mealConstants = {
    RAW: 'Roh',
    COOKED: 'Gar',
} as const;


export const url = {
    MEALS: (id?: number) => id ? `meals/${id}` : 'meals',
    CONDITION_EVENTS: (id?: number) => id ? `condition-events/${id}` : 'condition-events',
    STATISTICS: () => 'statistics',
    NOTES: (id?: number) => id ? `notes/${id}` : 'notes',
    POLLENS: () => 'pollens',
    STATUSES: (id?: number) => id ? `statuses/${id}` : 'statuses',
    HEADACHES: (id?: number) => id ? `headaches/${id}` : 'headaches',
    MANAGE_SYMPTOMS: () => 'manage-symptoms',
    LOGIN: () => '/login',
    HOMEPAGE: () => '',
    ERROR: () => '/error',
}