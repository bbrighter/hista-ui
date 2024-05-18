import { url } from "../../constants"
import Note from "./Note"

const ind = {
    routeProps: {
        path: url.NOTES + '/:id',
        element: <Note />,
    },
    name: "Note"
}

export default ind