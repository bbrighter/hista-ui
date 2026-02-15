import { ingredientsService } from '../../../store/service/ingredients.service'
import TextFieldSaveAndAbort from '../../components/TextFieldSaveAndAbort'

export const EditIngredientName = ({ id, name, onCancel }:
    {
        id: number
        name: string
        onCancel: () => void

    }) => {
    const onSave = (name: string) => ingredientsService.changeName(id, name)

    return (
    <TextFieldSaveAndAbort
      label="Zutat"
      onCancel={onCancel}
      isSaveable={() => true}
      size="small"
      value={name}
      onSave={onSave}
    />
    )
}
