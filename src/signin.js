// SignIn.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Paper } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google'; // Ensure you have this icon

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const errorMessage = "An error occurred during sign in"; // Define your error message here

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Handle sign-in logic here
    console.log("Sign In Submitted");
    
    // Simulate an asynchronous sign-in operation
    setTimeout(() => {
      setLoading(false);
      // Example logic: setError(true) to trigger error state
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log("Google Sign In");
  };

  const handleSignUp = () => {
    // Redirect to sign up page or implement sign-up logic
    console.log("Sign Up Redirect");
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
          
          {/* Display loading spinner or error messages */}
          {loading && <CircularProgress />}
          {error && <Typography color="error">{errorMessage}</Typography>}

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
