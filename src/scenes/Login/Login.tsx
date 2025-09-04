import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useHista from '../../store/store';


type LoadingState = 'loading' | 'error' | 'initial'

const LOGIN_STATES: Record<LoadingState, ButtonProps['color']> = {
    'initial': 'primary',
    'loading': 'secondary',
    'error': 'error',
} as const

export default function Login() {
    const isAuthenticated = useHista(state => state.isAuthenticated)
    const login = useHista(state => state.login)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loadingState, setLoadingState] = useState<LoadingState>('initial')
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const onClick = async () => {
        setLoadingState('loading')
        await login(password, name)
        if (!isAuthenticated) setLoadingState('error')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100vw',
                justifyContent: 'center',
                height: '100vh',
                alignItems: 'center',
            }}>
            <Stack
                spacing={2}
                width='300px'
                textAlign='center'
            >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />

                <Button
                    sx={{ width: '50%', alignSelf: 'center' }}
                    color={LOGIN_STATES[loadingState]}
                    variant="contained"
                    onClick={onClick}
                    loading={loadingState == 'loading'}
                >Login</Button>
                {loadingState == 'error' &&
                    <Alert
                        severity='error'
                    >Login fehlgeschlagen</Alert>
                }
            </Stack>
        </Box>
    )
}