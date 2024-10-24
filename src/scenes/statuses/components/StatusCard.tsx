import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Status } from '../../../store/status/status';
import { useState } from 'react';
import useHista from '../../../store/store';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StatusCardContent from './StatusCardContent';

export default function StatusCard(props: { status: Status }) {
    const deleteStatus = useHista(state => state.deleteStatus)
    const [expanded, setExpanded] = useState(false)

    const handleDelete = () => deleteStatus(props.status.id)

    return (
        <Card
            onClick={() => setExpanded(!expanded)}
            sx={{ margin: '1rem' }}
        >
            <CardHeader
                title={props.status.date.format('dddd, DD.MM.YYYY')}
                titleTypographyProps={{ variant: 'h6' }}
                action={
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>}
            />
            <StatusCardContent status={props.status} expanded={expanded} />
        </Card >
    )
}
