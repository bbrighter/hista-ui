import { MEAL_URL } from "../../api/urls"
import Meal from "./Meal"

const ind = {
    routeProps: {
        path: MEAL_URL + '/:id',
        element: <Meal />,
    },
    name: "Meal"
}
export default ind