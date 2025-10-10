import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppNavigate } from '../../hooks/useNavigate';
import useHista from '../../store/store';


type LoadingState = 'loading' | 'error' | 'initial'

const LOGIN_STATES: Record<LoadingState, ButtonProps['color']> = {
    'initial': 'primary',
    'loading': 'secondary',
    'error': 'error',
} as const

export default function Login() {
    const [searchParams] = useSearchParams()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loadingState, setLoadingState] = useState<LoadingState>('initial')

    const piid = useHista(state => state.selectedPiid)
    const isAuthProblem = useHista(state => state.isAuthProblem)
    const getPermissions = useHista(state => state.getPermissions)
    const login = useHista(state => state.login)

    const navigate = useNavigate()
    const appNavigate = useAppNavigate()



    useEffect(() => {
        const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        if (piid && regex.test(piid) && !isAuthProblem) {
            const redirectTo = searchParams.get('redirectTo')
            if (redirectTo) {
                navigate(redirectTo, { replace: true })
            } else {
                appNavigate.to.home()
            }
            setLoadingState('initial')

        }
    }, [piid, isAuthProblem])


    const onClick = async () => {
        setLoadingState('loading')
        const ok = await login(password, name)
        if (!ok) {
            setLoadingState('error')
        } else {
            getPermissions()
            setLoadingState('initial')
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