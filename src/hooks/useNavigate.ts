import { useNavigate } from 'react-router-dom';

import { appRoutes, buildPath } from '../constants';
import useHista from '../store/store';

export const useAppNavigate = () => {
    const navigate = useNavigate()
    const piid = useHista(state => state.selectedPiid)

    const navigateWithPiid = (template: string, params: Record<string, number> = {}) => {
        if (!piid) {
            return navigate(appRoutes.login, { replace: true })
        }
        const path = buildPath(template, params)
        const piidPath = path.replace(':piid', piid)
        return navigate(piidPath)
    }

    return {
        to: {
            home: () => navigateWithPiid(appRoutes.homepagePiid),
            meals: () => navigateWithPiid(appRoutes.meals),
            mealDetail: (mealId: number) => navigateWithPiid(appRoutes.mealDetails, { mealId }),
            conditionEvents: () => navigateWithPiid(appRoutes.conditionEvents),
            conditionEventDetails: (eventId: number) => navigateWithPiid(appRoutes.conditionEventDetails, { eventId }),
            statistics: () => navigateWithPiid(appRoutes.statistics),
            notes: () => navigateWithPiid(appRoutes.notes),
            noteDetails: (noteId: number) => navigateWithPiid(appRoutes.noteDetails, { noteId }),
            pollens: () => navigateWithPiid(appRoutes.pollens),
            statuses: () => navigateWithPiid(appRoutes.statuses),
            statusDetails: (statusId: number) => navigateWithPiid(appRoutes.statusDetails, { statusId }),
            headaches: () => navigateWithPiid(appRoutes.headaches),
            headacheDetails: (headacheId: number) => navigateWithPiid(appRoutes.headacheDetails, { headacheId }),
            manageSymptoms: () => navigateWithPiid(appRoutes.manageSymptoms),
        },
    }


}