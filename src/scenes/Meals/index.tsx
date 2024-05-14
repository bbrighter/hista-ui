import { url } from "../../constants"
import Meals from "./Meals"

const ind = {
    routeProps: {
        path: url.MEAL,
        element: <Meals />,
    },
    name: "Meals"
}

export default ind