import { CONDITON_EVENTS_URL } from "../../api/urls";
import ConditionEvents from "./ConditionEvents";

const ind = {
    routeProps: {
        path: CONDITON_EVENTS_URL,
        element: <ConditionEvents />,
    },
    name: "ConditionEvents"
}

export default ind