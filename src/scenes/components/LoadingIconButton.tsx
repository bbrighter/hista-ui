import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'


export default function LoadingIconButton(props: {
    isLoading: boolean
    onClick: () => void
    icon: JSX.Element
},
) {
    return (
        <IconButton onClick={props.onClick}>
            {!props.isLoading && props.icon}
            {props.isLoading && <CircularProgress size={20} />}
        </IconButton>
    )
}