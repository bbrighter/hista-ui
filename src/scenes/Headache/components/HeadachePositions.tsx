
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useHista from '../../../store/store'
import ToggleButton from '@mui/material/ToggleButton'
import { HeadachePosition, HeadachePositions } from '../../../store/headaches/headaches'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function HeadachePositionsButtons() {
    const positions = useHista(state => state.headache.positions)
    const patchPositions = useHista(state => state.patchHeadachePositions)

    const [loading, setLoading] = useState(false)

    const onChange = (_: React.MouseEvent<HTMLElement>, value: HeadachePositions) => {
        setLoading(true)
        patchPositions(value).finally(() => setLoading(false))
    }


    const availablePositions: HeadachePositions = ['front', 'back', 'ear', 'left', 'right', 'neck', 'temple']

    return (
        <ToggleButtonGroup
            value={positions}
            onChange={onChange}
            color='primary'
            orientation='vertical'
        >
            {
                availablePositions.map(pos => (
                    <PositionButton
                        key={pos}
                        pos={pos}
                        loading={loading}
                    />
                ))
            }
        </ToggleButtonGroup>
    )
}


const PositionButton = (props: { pos: HeadachePosition, loading: boolean }) => {
    const translateHeadachePosition = (position: HeadachePosition): string => {
        const translations: Record<HeadachePosition, string> = {
            front: 'Stirn',
            back: 'Hinterkopf',
            both: 'Beide Seiten',
            left: 'Links',
            right: 'Rechts',
            neck: 'Nacken',
            ear: 'Ohr',
            temple: 'Schläfe',
        };

        return translations[position];
    };


    return (
        <ToggleButton value={props.pos} sx={{ width: '150px' }}>
            {props.loading ? <CircularProgress size={16} /> : translateHeadachePosition(props.pos)}
        </ToggleButton>
    )
}