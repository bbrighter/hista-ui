import useHista from '../../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import Severity from './Severity';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

export default function ConditionList() {
    const deleteCondition = useHista(state => state.deleteCondition)
    const conditions = useHista(state => state.conditionEvent.conditions)
    const categories = useHista(state => state.symptoms)

    const conditionsAndCategories = conditions.map(con => {
        const name = categories.find(cat => cat.categoryId == con.symptom.categoryId)?.categoryName || ''
        return { ...con, categoryName: name }
    })
    conditionsAndCategories.sort((a, b) => b.id - a.id)

    const onDelete = (conditionId: number) => {
        deleteCondition(conditionId)
    }

    return (
        <List>
            {conditionsAndCategories.map(con => (
                <ListItem key={con.id} secondaryAction={
                    <IconButton onClick={() => onDelete(con.id)}>
                        <DeleteIcon />
                    </IconButton>
                } >
                    <ListItemText
                        primary={con.symptom.name}
                        secondary={con.categoryName} />
                    <Severity
                        conditionId={con.id}
                        severity={con.severity}
                    />
                </ListItem>
            ))}
        </List>)
}