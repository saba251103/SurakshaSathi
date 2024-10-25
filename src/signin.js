import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Paper } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase';  // Ensure firebase is properly initialized in your firebase.js

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function to store location in Firebase
  const storeLocation = async (email, latitude, longitude) => {
    const userRef = ref(db, `users/${email.replace('.', ',')}/location`); // Firebase Realtime DB keys cannot contain '.'
    await set(userRef, { latitude, longitude, timestamp: Date.now() });
  };

  // Function to track and store location every 5 seconds
  const startLocationTracking = (email) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          storeLocation(email, latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }

    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            storeLocation(email, latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation not supported');
      }
    }, 5000); // 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  };

  // Handle email and password sign-in
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save email to local storage
      localStorage.setItem('userEmail', user.email);

      // Start location tracking after sign-in
      startLocationTracking(user.email);

      navigate('/home');
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(false);
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save email to local storage
      localStorage.setItem('userEmail', user.email);

      // Start location tracking after sign-in
      startLocationTracking(user.email);

      navigate('/home');
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
        width: '100%',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%', backgroundColor: '#08343f', borderRadius: '8px' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PersonOutlineIcon color="action" />,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <LockOpenIcon color="action" />,
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          />
          
          {loading && <CircularProgress />}
          {error && <Typography color="error" align="center">{errorMessage}</Typography>}

          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#0d7b7d', marginTop: '20px' }}
            type="submit"
            disabled={loading}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#0d7b7d', marginTop: '20px' }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#0d7b7d', marginTop: '20px' }}
            onClick={handleSignUp}
          >
            Sign Up if you don't have an account
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default SignIn;
