import Box from '@mui/material/Box';
import Button, { ButtonOwnProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useHista from '../../store/store';


type LoadingState = 'loading' | 'error' | 'initial'

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
        const ok = await login(password, name)
        if (ok) { setLoadingState('initial') } else { setLoadingState('error') }
    }

    const buttonColor = () => {
        const props: ButtonOwnProps = { color: 'primary' }
        switch (loadingState) {
            case 'loading':
                props.color = 'secondary'
                break
            case 'error':
                props.color = 'error'
                break
            case 'initial':
                props.color = 'primary'
                break
        }
        return props.color
    }

    return (
        <Box component="form" sx={{
            width: '350px',
            left: 'calc(50vw - 175px)',
            top: '20px',
            position: 'absolute',

        }}>
            <Paper sx={{
                padding: '10px',
                textAlign: 'center',
                paddingTop: '20px',
                paddingBottom: '20px',
            }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    sx={{ mt: '2rem', mb: '2rem' }}
                    label="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
                <Box sx={{ position: 'relative', m: 1 }}>
                    <Button
                        color={buttonColor()}
                        variant="contained"
                        onClick={onClick}
                    >Login
                        {loadingState == 'loading' && (
                            <CircularProgress
                                size={24}
                                color="primary"
                                sx={{ position: 'absolute' }}
                            />
                        )}
                    </Button>
                </Box>
            </Paper>
        </Box>)
}