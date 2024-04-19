import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { login } from "../../authentification/login";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onClick = async () => {
        try {
            await login(password, name)
        } catch {
            alert("Something went wrong")
        } finally {
            navigate("/")
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
                    sx={{ pt: '10px', pb: '10px' }}
                    label="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
                <div>
                    <Button
                        variant="contained"
                        onClick={onClick}
                    >Login
                    </Button>
                </div>
            </Paper>
        </Box>)
}