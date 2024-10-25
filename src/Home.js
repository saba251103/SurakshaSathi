import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Instagram } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import logo from './logo.png';
import front from './front.jpeg'; 
import about from './aboutus.png';
import { Paper, Grid } from '@mui/material';
import './App.css';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
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
    {
      name: 'Journey Anomaly Detection',
      content: 'Identify irregularities in planned routes, providing alerts for potentially unsafe or unusual paths.',
      route:'/anomoly'
    },
    {
      name: 'Proximity Alert',
      content: 'Receive alerts when specific individuals or objects approach a defined safe or danger zone.',
      route:'/safety-dashboard'
    },
    {
      name: 'Area and Crowd Flagging',
      content: 'Monitor crowd density and flag areas with potential risks, helping manage safety in real-time.',

    },
    {
      name: 'Fake Call',
      content: 'Trigger a simulated call as a safety feature, providing a discreet way to signal distress or seek help.',
    },
    {
      name: 'Mental Health Chatbot',
      content: 'Access a supportive chatbot for mental health resources, providing guidance and help in stressful situations.',
    },
  ];
  
  // Mission Statements
  const mission = [
    {
      name: 'Improve communication and coordination',
      content: 'Develop tools that facilitate seamless information sharing and collaboration among emergency responders, volunteers, and affected populations.',
    },
    {
      name: 'Enhance situational awareness',
      content: 'Create a platform that provides real-time data and insights to help emergency responders make informed decisions.',
    },
    {
      name: 'Enhance resource allocation',
      content: 'Create platforms that optimize the distribution of essential supplies and services to those in need.',
    },
    {
      name: 'Promote disaster preparedness',
      content: 'Provide resources and educational materials to help individuals and communities build resilience and mitigate the impact of future disasters.',
    },
  ];

  return (
    <div className="home">

    
      {/* App Bar Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="white" aria-label="menu" sx={{ mr: 2,backgroundColor:'white' }}>
              <Search />
            </IconButton>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <img src={logo} alt="displaying logo That Trifecta Muse" width={150} />
            </Typography>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4 ,backgroundColor:'white'}} onClick={openInstagram}>
              <Instagram />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4 ,backgroundColor:'white'}} onClick={openX}>
              <X />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4 ,backgroundColor:'white'}} onClick={openFacebook}>
              <Facebook />
            </IconButton>
            <IconButton size="large" edge="start" color="#c9c7b8" aria-label="menu" sx={{ mr: 4 ,backgroundColor:'white'}} onClick={openFacebook}>
              <LogoutIcon/>
            </IconButton>

          </Toolbar>
        </AppBar>
      </Box>
   {/* Navigation Bar */}
   <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginTop: 2, backgroundColor: "black", color: 'white' ,textAlign:'center'}}>
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
        <img src={front} alt="front" style={{ width: '100%' }} />
        <Typography variant="h4" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>
        "I will always be travelling with you by your side!!"
        </Typography>
      </Box>


            {/* Features Section */}
            <Box sx={{  padding: '5%' ,background: 'black',  }}>
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
    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
      {features.map((feature, index) => (
        <Button
          key={index}
          onClick={() => navigate(feature.route)}
          sx={{
            padding: '10px',
            backgroundColor: '#08343f',
            width: '250px',
            minHeight: '300px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' ,textAlign: 'center',color:'white'}}>
            {feature.name}
          </Typography>
         </Button>
      ))}
    </Box>
  </Box>
</Box>


      {/* About Us Section */}
      <Box id="about" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: '2%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#08343f', padding: '2%', borderRadius: '10px' }}>
    <img src={about} style={{ maxWidth: '50%', borderRadius: '10px' }} alt="about us" />
    <Box sx={{ textAlign: 'justify', maxWidth: '60%', marginLeft: '5%', marginRight: '3%' }}>
      <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' ,color:'white'}}>
        About 
        Us
      </Typography>
      <Typography variant="h6" fontFamily="Roboto" sx={{textAlign: 'center',color:'white'}}>
        Empowering Safety, One Tap at a Time
      </Typography>
      <br />
      <Typography variant="h9" fontFamily="Roboto" sx={{color:'white'}}>
        We're a team of passionate developers dedicated to enhancing women's safety through technology. Inspired by the increasing need for reliable and accessible safety solutions, we've come together to create a cutting-edge app that empowers women to feel secure in their daily lives.
      </Typography>
      <br />
    </Box>
  </Box>
</Box>



<Box sx={{  padding: '5%' ,background: 'black',  }}>
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
      Our Mission
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
      {mission.map((mission, index) => (
        <Paper
          key={index}
          sx={{
            padding: '10px',
            backgroundColor: '#08343f',
            width: '250px',
            minHeight: '300px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '5px' ,textAlign: 'center',color:'white'}}>
            {mission.name}
          </Typography>
          <Typography variant="body2" sx={{color:'white'}}>{mission.content}</Typography>
        </Paper>
      ))}
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
          <Typography variant="body2">&copy; 2024 suraksha. All rights reserved.</Typography>
          <br />
        </Box>
      </Box>
    </div>
  );
}
