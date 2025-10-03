import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { url } from '../../constants';
import useHista from '../../store/store';


type LoadingState = 'loading' | 'error' | 'initial'

const LOGIN_STATES: Record<LoadingState, ButtonProps['color']> = {
    'initial': 'primary',
    'loading': 'secondary',
    'error': 'error',
} as const

export default function Login() {
    const login = useHista(state => state.login)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const piid = useHista(state => state.piid)
    const [loadingState, setLoadingState] = useState<LoadingState>('initial')
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')
    const navigate = useNavigate()


    useEffect(() => {
        const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        if (piid && regex.test(piid)) {
            const redirectUrl = redirectTo ? redirectTo : '/' + piid + '/' + url.HOMEPAGE()
            setLoadingState('initial')
            navigate(redirectUrl, { replace: true })
            navigate(0) // This is a workaround. Otherwise, calling this without a valid token will not load anything
        }
    }, [piid])


    const onClick = async () => {
        setLoadingState('loading')
        const resp = await login(password, name)
        if (!resp) {
            setLoadingState('error')
        }
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