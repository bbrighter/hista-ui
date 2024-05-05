import { MEAL_URL } from "../../api/urls"
import Meals from "./Meals"

const ind = {
    routeProps: {
        path: MEAL_URL,
        element: <Meals />,
    },
    name: "Meals"
}

export default ind