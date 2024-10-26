import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Instagram, X, Facebook, Search } from '@mui/icons-material';
import logo from './logo.png';
import front from './front.jpeg'; 
import about from './aboutus.png';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid, Paper } from '@mui/material';

export default function Home() {
  const navigate = useNavigate();

  // Navigation Functions for external links
  const openInstagram = () => {
    window.open('https://www.instagram.com', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com', '_blank');
  };

  const openX = () => {
    window.open('https://www.x.com', '_blank');
  };

  const features = [
    { name: 'Journey Anomaly Detection', route: '/anomoly' },
    { name: 'Proximity Alert', route: '/safety-dashboard' },
    { name: 'Area and Crowd Flagging', route: '/flag.html' },
    { name: 'Fake Call', route: '/fakecall' },
    { name: 'Mental Health Chatbot', route: 'http://127.0.0.1:5000' },
    { name: 'Report Unsafe Area', route: '/report' },
    { name: 'Tips', route: '/tips' },
  ];

  // Function to handle SOS
  const handleSOS = async () => {
    // Request camera and microphone permission
    await navigator.mediaDevices.getUserMedia({ video: true });
    await navigator.mediaDevices.getUserMedia({ audio: true });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location:", latitude, longitude);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    console.log("Camera and microphone permissions granted.");
  };

  return (
    <div className="home">
      {/* App Bar Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="white" aria-label="menu" sx={{ mr: 2, backgroundColor: 'white' }}>
              <Search />
            </IconButton>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <img src={logo} alt="displaying logo That Trifecta Muse" width={150} />
            </Typography>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4, backgroundColor: 'white' }} onClick={openInstagram}>
              <Instagram />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4, backgroundColor: 'white' }} onClick={openX}>
              <X />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4, backgroundColor: 'white' }} onClick={openFacebook}>
              <Facebook />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4, backgroundColor: 'white' }} onClick={openFacebook}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Navigation Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginTop: 2, backgroundColor: "black", color: 'white', textAlign: 'center' }}>
          <Box sx={{ height: '100px', justifyContent: "center", alignContent: 'center' }}>
            <Button href="#home" title="Home" sx={{ color: 'white' }}>Home</Button>
            <Button href="#about" title="About Us" sx={{ color: 'white' }}>About Us</Button>
            <Button href="#features" title="Features" sx={{ color: 'white' }}>Features</Button>
            <Button href="#contact" title="Contact Us" sx={{ color: 'white' }}>Contact Us</Button>
          </Box>
        </AppBar>
      </Box>

      {/* Front Image with Quote */}
      <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', marginTop: 2 }}>
        <img src={front} alt="front" style={{ width: '100%', height: 'auto' }} />
        <Typography variant="h4" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>
          "I will always be travelling with you by your side!!"
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: '5%', background: 'black' }}>
        <Box
          id="features"
          sx={{
            padding: '5%',
            backgroundColor: '#0d7b7d',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: '2%',
              textAlign: 'center',
              fontFamily: 'Atteron',
              color: 'white',
            }}
          >
            Our Features
          </Typography>

       {/* SOS Button */}
<Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
  <Button
    variant="contained"
    onClick={handleSOS}
    sx={{
      backgroundColor: 'red',
      color: 'black',
      fontWeight: 'bold',
      borderRadius: '50%',
      fontSize: '24px', // Set font size to display "SOS"
      width: '200px',
      height: '200px',
      '&:hover': {
        backgroundColor: '#d32f2f',
      },
    }}
  >
    SOS
  </Button>
</Box>

          {/* Features Grid */}
          <Grid container spacing={2} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Button
                  onClick={() => {
                    if (feature.route.startsWith('http')) {
                      window.open(feature.route, '_blank');
                    } else if (feature.route.endsWith('.html')) {
                      window.location.href = feature.route;
                    } else {
                      navigate(feature.route);
                    }
                  }}
                  sx={{
                    padding: '10px',
                    backgroundColor: '#08343f',
                    width: '100%', // Make it responsive
                    minHeight: '200px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {feature.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* About Us Section */}
      <Box id="about" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: '2%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#08343f', padding: '2%', borderRadius: '10px' }}>
          <img src={about} style={{ maxWidth: '50%', borderRadius: '10px' }} alt="about us" />
          <Box sx={{ textAlign: 'justify', maxWidth: '60%', marginLeft: '5%', marginRight: '3%' }}>
            <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron', color: 'white' }}>
              About Us
            </Typography>
            <Typography variant="h6" fontFamily="Roboto" sx={{ textAlign: 'center', color: 'white' }}>
              Empowering Safety, One Tap at a Time
            </Typography>
            <br />
            <Typography variant="body1" fontFamily="Roboto" sx={{ color: 'white' }}>
              We're a team of passionate developers dedicated to enhancing women's safety through technology. Inspired by the increasing need for safety solutions, we have developed a user-friendly app that enables women to stay connected and informed, ensuring their peace of mind in every situation. Join us in our mission to make the world a safer place for women everywhere!
            </Typography>
          </Box>
        </Box>
      </Box>
            {/* Contact Us Section */}
            <Box id="contact" sx={{ backgroundColor: '#08343f' }}>
        <footer className="footer">
          <Box sx={{ justifyContent: 'left', textAlign: 'left', marginLeft: '25px' }}>
            <Typography variant="h4"sx={{color:'white'}}>Contact Us</Typography>
            <Typography variant="body1" sx={{color:'white'}}>Email: support@suraksha.com</Typography>
            <Typography variant="body1" sx={{color:'white'}}>Phone: +123-456-7890</Typography>
            <Typography variant="body1" sx={{color:'white'}}>Address: 123 Emergency Road, Suraksha City</Typography>
          </Box>
        </footer>
        <Box sx={{ marginTop: 6 }}>
          <Typography variant="body2"sx={{color:'white'}}>&copy; 2024 suraksha. All rights reserved.</Typography>
          <br />
        </Box>
      </Box>
    </div>
  );
}
