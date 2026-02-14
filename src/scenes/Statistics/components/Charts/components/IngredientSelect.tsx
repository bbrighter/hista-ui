import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'

import useHista from '../../../../../store/store'

export default function IngredientSelect({ onChange }: {
    onChange: (id: number) => void
}) {
    const getIngredients = useHista(state => state.getIngredients)
    const ingredients = useHista(state => state.ingredients)
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (ingredients.length == 0) {
            getIngredients()
        }
    }, [])

    const handleChange = (e: SelectChangeEvent<number>) => {
        const newValue = Number(e.target.value)
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <Select
          sx={{ width: '10rem' }}
          value={value}
          onChange={handleChange}
        >
            <MenuItem key="" value={0}>-</MenuItem>
            {ingredients.map(i =>
                (<MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>),
            )}
        </Select>
    )
}
