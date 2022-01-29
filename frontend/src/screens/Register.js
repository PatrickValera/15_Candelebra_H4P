import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../state/actions/userActions';

const Register = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userInfo,error:loginError}=useSelector(state=>state.userLogin)

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password!==confirmPassword){
            setError('Password and confirm password must match')
            return
        }
        setError('')
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        dispatch(register(data.get('email'),data.get('password')))
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
        if (loginError) {
            setError(loginError)
        }
    }, [userInfo, loginError])
    return (
        <Container maxWidth='xs' sx={{display:'flex',alignItems:'center',minHeight:'90vh'}}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography variant='body2' color='error'>{error&&error}</Typography>
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
                    onChange={e=>setEmail(e.target.value)}
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
                    onChange={e=>setPassword(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm password password"
                    label="Confirm Password"
                    type="password"
                    id="confirm password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size='medium'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container >
    )
};

export default Register;
