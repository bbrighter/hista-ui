import { CONDITON_EVENTS_URL } from "../../api/urls"
import ConditionEvent from "./ConditionEvent"


const ind = {
    routeProps: {
        path: CONDITON_EVENTS_URL + '/:id',
        element: <ConditionEvent />,
    },
    name: "ConditionEvent"
}

export default ind