import { url } from '../../constants';
import SymptomManagement from './SymptomManagement';


const ind = {
    routeProps: {
        path: url.MANAGE_SYMPTOMS,
        element: <SymptomManagement />,
    },
    name: 'ManageSymptoms',
}

export default ind