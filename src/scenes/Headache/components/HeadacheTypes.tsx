
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useHista from '../../../store/store'
import ToggleButton from '@mui/material/ToggleButton'
import { HeadacheType, HeadacheTypes } from '../../../store/headaches/headaches'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function HeadacheTypesButtons() {
    const types = useHista(state => state.headache.types)
    const patchTypes = useHista(state => state.patchHeadacheTypes)

    const [loading, setLoading] = useState(false)

    const onChange = (_: React.MouseEvent<HTMLElement>, value: HeadacheTypes) => {
        setLoading(true)
        patchTypes(value).finally(() => setLoading(false))
    }


    const availableTypes: HeadacheTypes = ['dull-pressing', 'pulsating-pounding', 'stabbing']

    return (
        <ToggleButtonGroup
            value={types}
            onChange={onChange}
            color='primary'
            orientation='vertical'
        >
            {
                availableTypes.map(pos => (
                    <TypeButton
                        key={pos}
                        pos={pos}
                        loading={loading}
                    />
                ))
            }
        </ToggleButtonGroup>
    )
}


const TypeButton = (props: { pos: HeadacheType, loading: boolean }) => {
    const translateHeadacheTypes = (position: HeadacheType): string => {
        const translations: Record<HeadacheType, string> = {
            'dull-pressing': 'dumpf-drückend',
            'pulsating-pounding': 'pulsierend-pochend',
            'stabbing': 'stechend',
        };

        return translations[position];
    };


    return (
        <ToggleButton value={props.pos} sx={{ width: '150px' }}>
            {props.loading ? <CircularProgress size={16} /> : translateHeadacheTypes(props.pos)}
        </ToggleButton>
    )
}