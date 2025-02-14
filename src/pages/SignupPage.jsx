import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
const navigate=useNavigate()

  const { loading, error, user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localErrors, setLocalErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const errors = {};

    if (!username.trim()) errors.username = 'Username is required.';
    if (!email.trim()) errors.email = 'Email address is required.';
    if (!password) errors.password = 'Password is required.';

    setLocalErrors(errors);

    // If there are any validation errors, abort submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Dispatch the async thunk to call the API
    dispatch(signupUser({ userData: { username, email, password }, navigate }));
  };

  useEffect(() => {
    if (user) {
      // For example, you might redirect the user after a successful signup.
      console.log('Signup successful', user);
    }
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' ,
          width:450,
          height:500,
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '6px',
          backgroundColor: '#f4f7fb',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={submitAttempted && Boolean(localErrors.username)}
            helperText={submitAttempted && localErrors.username}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={submitAttempted && Boolean(localErrors.email)}
            helperText={submitAttempted && localErrors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={submitAttempted && Boolean(localErrors.password)}
            helperText={submitAttempted && localErrors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2,width: '100px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <br/>
          <Button
            component={Link}
            to="/"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2,width: '100px' }}
          >
            Sign In
          </Button>

          {/* Display API error (if any) below the form */}
          {error && (
            <Box sx={{ mt: 2, color: 'error.main' }}>
              <Typography variant="body2">
                {typeof error === 'string' ? error : JSON.stringify(error)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
