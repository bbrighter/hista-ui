import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { login } from "../../authentification/login";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loginFailed, setLoginFailed] = useState(false)
    const navigate = useNavigate()

    const onClick = async () => {
        try {
            await login(password, name)
            navigate('/')
        } catch {
            console.log("Catching...")
            setLoginFailed(true)
        }
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