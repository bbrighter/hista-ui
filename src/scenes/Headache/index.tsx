import { url } from '../../constants'
import Headache from './Headache'



const ind = {
    routeProps: {
        path: url.HEADACHES + '/:id',
        element: <Headache />,
    },
    name: 'Headache',
}
export default ind