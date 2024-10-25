import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebase';  // Import Firebase authentication and Realtime Database
import { ref, set } from 'firebase/database';  // Import Realtime Database methods

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Step 1: Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Store additional user information in Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        fullName,
        email,
        mobile,
        gender,
        address,
        createdAt: new Date().toISOString(),
      });

      // Step 3: Navigate to the home page after successful signup
      navigate('/home');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Paper className="signup-form">
        <Typography variant="h4" color="#797c69" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PersonOutlineIcon color="action" />,
            }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          />
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PhoneIcon color="action" />,
            }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              startAdornment={<WcIcon color="action" />}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <HomeIcon color="action" />,
            }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            multiline
            rows={3}
            required
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
          />
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
           
            style={{ backgroundColor: 'black', marginTop: '20px' }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignupPage;
