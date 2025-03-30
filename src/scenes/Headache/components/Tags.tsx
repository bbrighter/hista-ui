
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function HeadacheInputs(props: {
    label: string
    values: Array<ValueLabelPair>
    options: Array<ValueLabelPair>
    loading: boolean
    onAdd: (value: ValueLabelPair) => void
    onRemove: (value: ValueLabelPair) => void
}) {


    return (
        <>
            <Divider sx={{ pt: 1 }} />
            <Typography variant='h6'>{props.label}</Typography>
            {
                props.options.map(opt => {
                    const isFound = props.values.some(v => v.value == opt.value)
                    return (
                        <HeadacheTag
                            key={opt.value}
                            value={opt}
                            loading={props.loading}
                            active={isFound}
                            onAdd={props.onAdd}
                            onRemove={props.onRemove}
                        />
                    )
                })
            }
        </>
    )
}

export interface ValueLabelPair {
    value: string
    label: string
}

function HeadacheTag(props: {
    value: ValueLabelPair,
    loading: boolean,
    active: boolean,
    onAdd: (value: ValueLabelPair) => void
    onRemove: (value: ValueLabelPair) => void
}) {

    const handleClick = () => {
        if (props.active) {
            props.onRemove(props.value)
        } else {
            props.onAdd(props.value)
        }
    }

    let color: 'primary' | 'default' | 'secondary' = 'primary'
    if (props.active) {
        color = 'default'
    }
    if (props.loading) {
        color = 'secondary'
    }

    return (
        <Chip
            label={<Typography variant='body1' >{props.value.label}</Typography >}
            onClick={handleClick}
            color={color}
            sx={{
                margin: 0.5,
                padding: 0.2,
            }}
        />
    )

}