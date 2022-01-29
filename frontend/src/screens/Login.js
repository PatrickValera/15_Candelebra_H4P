import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { login } from '../state/actions/userActions';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { userInfo, error: loginError } = useSelector(state => state.userLogin)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        dispatch(login(email, password))
    }
    const loadDemo = () => {
        setEmail('admin0715@example.com')
        setPassword('adminpass')
    }
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
        if (loginError) {
            setError("Incorrect email or password")
        }
    }, [userInfo, loginError])

    return (
        <Container maxWidth='xs' sx={{display:'flex',alignItems:'center',minHeight:'90vh'}}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography color='error' variant='body1'>{error&&error}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size='medium'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Container >
    )
};

export default Login;
