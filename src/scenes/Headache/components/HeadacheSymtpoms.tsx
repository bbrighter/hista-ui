
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useHista from '../../../store/store'
import ToggleButton from '@mui/material/ToggleButton'
import { HeadacheSymptom, HeadacheSymptoms } from '../../../store/headaches/headaches'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function HeadacheSymptomsButtons() {
    const symptoms = useHista(state => state.headache.symptoms)
    const patchSymptoms = useHista(state => state.patchHeadacheSymptoms)

    const [loading, setLoading] = useState(false)

    const onChange = (_: React.MouseEvent<HTMLElement>, value: HeadacheSymptoms) => {
        setLoading(true)
        patchSymptoms(value).finally(() => setLoading(false))
    }


    const availableSymptoms: HeadacheSymptoms = ['dizziness', 'exhausted', 'lack of concentration', 'light-sensitive', 'odor-sensitive', 'short-term memory', 'tinnitus', 'tired', 'noise-sensitive']

    return (
        <ToggleButtonGroup
            value={symptoms}
            onChange={onChange}
            color='primary'
            orientation='vertical'
        >
            {
                availableSymptoms.map(pos => (
                    <TypeButton
                        key={pos}
                        sym={pos}
                        loading={loading}
                    />
                ))
            }
        </ToggleButtonGroup>
    )
}


const TypeButton = (props: { sym: HeadacheSymptom, loading: boolean }) => {
    const translateHeadacheTypes = (position: HeadacheSymptom): string => {
        const translations: Record<HeadacheSymptom, string> = {
            'dizziness': 'Schwindel',
            'exhausted': 'Erschöpft',
            'lack of concentration': 'Konzentrationsstörung',
            'light-sensitive': 'Lichtempfindlich',
            'odor-sensitive': 'Geruchsempfindlich',
            'short-term memory': 'Kurzzeitgedächtnis',
            'tinnitus': 'Ohrenpiepsen',
            'tired': 'Müde',
            'noise-sensitive': 'Geräuschempfindlich',
        };

        return translations[position];
    };


    return (
        <ToggleButton value={props.sym} sx={{ width: '300px' }}>
            {props.loading ? <CircularProgress size={16} /> : translateHeadacheTypes(props.sym)}
        </ToggleButton>
    )
}