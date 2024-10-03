import { url } from '../../constants'
import ConditionEvent from './ConditionEvent'


const ind = {
    routeProps: {
        path: url.CONDITION_EVENTS + '/:id',
        element: <ConditionEvent />,
    },
    name: 'ConditionEvent',
}

export default ind