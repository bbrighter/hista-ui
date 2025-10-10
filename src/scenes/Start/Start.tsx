
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';

import useHista from '../../store/store';
import StartPageCard from './components/StartPageCard';

export default function Start() {
    const getPermissions = useHista(state => state.getPermissions)
    useEffect(() => {
        getPermissions()
    }, [])

    return (
        <Grid
            justifyContent='center'
            container
            spacing={2}
            sx={{ padding: '2rem' }}
        >
            <StartPageCard type='meals' />
            <StartPageCard type='conditionEvents' />
            <StartPageCard type='statistics' />
            <StartPageCard type='notes' />
            <StartPageCard type='pollens' />
            <StartPageCard type='status' />
            <StartPageCard type='headaches' />
        </Grid>
    )
}