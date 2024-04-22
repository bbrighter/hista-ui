import { Box, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHista from "../../store/store";


export default function Login() {
    const isAuthenticated = useHista(state => state.isAuthenticated)
    const login = useHista(state => state.login)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loginFailed, setLoginFailed] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    const onClick = async () => {
        const ok = await login(password, name)
        setLoginFailed(!ok)
    }

    return (
        <Box component="form" sx={{
            width: '400px',
            left: 'calc(50vw - 200px)',
            top: '20px',
            position: 'absolute'
        }}>
            <Paper sx={{
                padding: '10px'
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
                <div>
                    <Button
                        color={loginFailed ? "error" : "primary"}
                        variant="contained"
                        onClick={onClick}
                    >Login
                    </Button>
                </div>
            </Paper>
        </Box>)
}