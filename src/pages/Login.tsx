import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
    Container,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { loginSuccess } from '../store/authSlice';
import { LoginCredentials } from '../types/auth.types';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<LoginCredentials>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Simulate authentication (replace with actual API call)
        // For demo purposes, accept any email/password combination
        const mockUser = {
            id: 1,
            username: formData.email.split('@')[0],
            email: formData.email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin' as const,
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        dispatch(loginSuccess({ user: mockUser, token: mockToken }));
        navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #000000 0%, #0d1117 50%, #1a1f2e 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%)',
                    animation: 'pulse 15s ease-in-out infinite',
                },
                '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        backgroundColor: 'rgba(18, 18, 18, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #2196f3',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.2)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <LoginIcon sx={{ fontSize: 60, color: '#2196f3', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700, mb: 1 }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                                Sign in to access Staff Management System
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, backgroundColor: '#1a0000', color: '#ff5252' }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: '#64b5f6' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#64b5f6' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: '#64b5f6' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 3 }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: '#2196f3',
                                    color: '#fff',
                                    fontWeight: 700,
                                    py: 1.5,
                                    mb: 2,
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
                                    },
                                }}
                            >
                                Sign In
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                                    Don't have an account?{' '}
                                    <Link
                                        to="/signup"
                                        style={{
                                            color: '#2196f3',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;
