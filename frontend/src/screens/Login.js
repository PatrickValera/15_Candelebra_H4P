import { Box, Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../state/actions/userActions'

const Login = () => {
    // let navigate = useNavigate()
    // let dispatch = useDispatch()
    // const { userInfo, error: loginError } = useSelector(state => state.userLogin)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        setError('')
        // dispatch(login(email, password))
    }
    const loadDemo = () => {
        setEmail('sampleuser@email.com')
        setPassword('pooplol')
    }
    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/')
    //     }
    //     if (loginError) {
    //         setError("Incorrect email or password")
    //     }
    // }, [userInfo, loginError])
    // useEffect(() => {
    //     console.log('IN LOGIN')
    // }, [])
    return (
        <Container maxWidth='xs' sx={{display:'flex',alignItems:'center',minHeight:'90vh'}}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
