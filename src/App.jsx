import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import MainPage from './pages/MainPage';
const App = () => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
         <ToastContainer />
         <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/tasks" element={<MainPage />} />
      </Routes>
    </Router>
        </Container>
    );
};

export default App;
