import Button from '@mui/material/Button';
import useHista from '../../../store/store'
import dayjs from 'dayjs';

export default function AddStatus() {
    const addStatus = useHista(state => state.addStatus)
    const statuses = useHista(state => state.statuses)

    const todaysStatusExists = statuses.find(s => s.date.isSame(dayjs(), 'day')) != undefined

    const handleClick = () => addStatus()

    return (
        <Button
            onClick={handleClick}
            disabled={todaysStatusExists}
        > + Status </Button>

    )
}