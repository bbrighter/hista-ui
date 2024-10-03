import { url } from '../../constants'
import Meal from './Meal'

const ind = {
    routeProps: {
        path: url.MEAL + '/:id',
        element: <Meal />,
    },
    name: 'Meal',
}
export default ind