import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { AuthStore } from '../auth/authStore';
import { ErrorStore } from '../error/errorStore';
import { Pollens, respToPollens } from './pollen';
import { client } from '../../api/api';

interface State {
    pollensAreLoaded: boolean
    pollens: Pollens
}

interface Actions {
    resetPollens: () => void,

    getPollens: () => Promise<void>
}

export interface PollenStore extends State, Actions { }

const initialState: State = {
    pollensAreLoaded: false,
    pollens: [],
}

export const createPollensSlice: StateCreator<
    AuthStore & ErrorStore & PollenStore,
    [],
    [],
    PollenStore> = ((set, get) => ({
        ...initialState,

        resetPollens: () => set(initialState),

        getPollens: async () => {
            try {
                const resp = await client.api.GetPollens()
                set(produce((draft: State) => {
                    draft.pollens = respToPollens(resp)
                    draft.pollensAreLoaded = true
                }))
            } catch (error) {
                get().setError(error)
            }
        },
    }))