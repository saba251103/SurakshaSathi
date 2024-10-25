import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebase'; 
import { ref, set } from 'firebase/database';

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, { fullName, email, mobile, gender, address, createdAt: new Date().toISOString() });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150vh', backgroundColor: '#08343f' }}>
      <Paper elevation={3} className="signup-form" sx={{ padding: 4, maxWidth: 800, backgroundColor: '#0d7b7d', color: 'white' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'white' }}>
          Create an Account
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            InputProps={{ startAdornment: <PersonOutlineIcon color="action" />, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            InputProps={{ startAdornment: <PersonOutlineIcon color="action" />, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            InputProps={{ startAdornment: <PhoneIcon color="action" />, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel sx={{ color: 'white' }}>Gender</InputLabel>
            <Select
              label="Gender"
              startAdornment={<WcIcon color="action" />}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
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
            InputProps={{ startAdornment: <HomeIcon color="action" />, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
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
            InputProps={{ startAdornment: <LockOpenIcon color="action" />, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
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
