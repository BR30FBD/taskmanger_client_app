import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinUser } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your login logic (e.g., API call)
    dispatch(signinUser({ userData:{ email, password }, navigate }));
    console.log('Logging in with:', { email, password });
  };

  return (
    <Container maxWidth="sm" >
      <Box 
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' ,
          width:450,
          height:400,
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '6px',
          backgroundColor: '#f4f7fb',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 ,width:"100px"}}
          >
            Login
          </Button>
          <br/>
            <Button to="/register" 
                       component={Link}
                      // fullWidth 
                      variant="contained" 
                      color="secondary"
                      sx={{ mt: 2 ,width:"100px"}}
                    >
                      Sign Up
                    </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
