import { Container } from '@mui/material'
import useHista from '../../store/store'
import OverviewList from '../components/OverviewList'
import LoadingButton from '@mui/lab/LoadingButton'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { url } from '../../constants';
import { getColor } from '../Headache/components/colorMapping';


export default function Headaches() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const getHeadaches = useHista(state => state.getHeadaches)
    const postHeadache = useHista(state => state.postHeadache)
    const deleteHeadache = useHista(state => state.deleteHeadache)
    const headaches = useHista(state => state.headaches)

    const onCreate = async () => {
        setLoading(true)
        const id = await postHeadache()
        setLoading(false)
        if (id) {
            navigate(url.HEADACHES + '/' + id)
        }
    }

    const onClick = (id: number) => {
        navigate(url.HEADACHES + '/' + id)
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <LoadingButton
                startIcon={<FaceRetouchingNaturalIcon />}
                variant='outlined'
                onClick={onCreate}
                loading={loading}
            >Neuer Kopfschmerz
            </LoadingButton>
            <OverviewList
                getData={getHeadaches}
                items={headaches}
                onClick={onClick}
                onDelete={deleteHeadache}
                showSeverity
                severityColorMapping={getColor}
            />
        </Container>

    )
}