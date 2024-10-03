import { StateCreator } from 'zustand'
import { produce } from 'immer'
import { AuthStore } from '../auth/authStore'
import { MealStore } from '../meal/mealStore'
import { SymptomStore } from '../symptom/symptomStore'
import { isAPIError } from '../../api/generatedApi'

interface State {
    errorMessage: string
    status: number
}

interface Actions {
    setError: (error: unknown) => void
}

export interface ErrorStore extends State, Actions { }

const initialState: State = {
    errorMessage: 'no error',
    status: 0,
}

export const createErrorSlice: StateCreator<
    AuthStore & ErrorStore & MealStore & SymptomStore,
    [],
    [],
    ErrorStore> = ((set, get) => ({
        ...initialState,

        setError: (error: unknown) => {
            if (isAPIError(error)) {
                const status = error.status
                switch (status) {
                    case 401:
                        get().logout()
                        break
                    case 500:
                        set(produce((draft: State) => {
                            draft.errorMessage = error.message
                        }))
                        alert('Etwas ist furchtbar schief gelaufen! ' + get().errorMessage)

                        break
                    case 400:
                        if (error.message == 'invalid uuid') {
                            get().logout()
                            break
                        }
                        set(produce((draft: State) => {
                            draft.errorMessage = error.message
                        }))
                        alert('Huch. Da habe ich mit gerechnet, aber es sollte nicht passieren: ' + get().errorMessage)
                        break
                }
            } else {
                alert('Unbekannter Fehler: ' + error)
            }
        },
    }))