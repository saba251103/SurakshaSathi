import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
const safetyTips = [
    { title: "Stay Aware of Your Surroundings", content: "Always be mindful of your environment and avoid distractions like your phone while walking." },
    { title: "Share Your Location", content: "Let someone know where you are, especially if you're in an unfamiliar area." },
    { title: "Trust Your Instincts", content: "If something feels wrong, trust your gut and take action." },
    { title: "Have a Safety Plan", content: "Develop a plan for emergency situations, including safe places to go." },
    { title: "Use Technology Wisely", content: "Utilize safety apps that can alert trusted contacts or share your location in emergencies." },
    { title: "Be Cautious with Personal Information", content: "Avoid sharing sensitive information with strangers, especially online." },
    { title: "Stick to Well-Lit Areas", content: "When walking at night, choose well-lit and populated areas to increase your safety." },
    { title: "Stay Sober", content: "Avoid excessive alcohol or substance use that could impair your judgment and awareness." },
    { title: "Avoid Isolated Places", content: "Stay clear of secluded areas, especially when alone or at night." },
    { title: "Learn Self-Defense", content: "Consider taking self-defense classes to empower yourself with skills to handle potential threats." },
    { title: "Use Your Phone Wisely", content: "Keep your phone accessible for emergencies but avoid distractions while walking." },
    { title: "Establish a Safety Network", content: "Create a trusted group of friends or family who can support you in emergencies." },
    { title: "Keep Emergency Contacts Handy", content: "Save important numbers, such as local emergency services, in your phone." },
    { title: "Be Cautious When Accepting Help", content: "If someone offers help, trust your instincts and ensure it's safe." },
    { title: "Secure Your Belongings", content: "Keep bags and valuables close to you, especially in crowded places." },
    { title: "Avoid Using Headphones", content: "When walking alone, refrain from using headphones to stay aware of your surroundings." },
    { title: "Trust Your Gut", content: "If you feel uncomfortable in a situation, remove yourself from it." },
    { title: "Practice Situational Awareness", content: "Regularly scan your environment for anything unusual or suspicious." },
    { title: "Be Mindful of Social Media", content: "Avoid posting your location in real-time on social media platforms." },
    { title: "Use Rideshare Apps Safely", content: "Confirm the driver's identity and vehicle details before getting in." },
    { title: "Know Emergency Exits", content: "Familiarize yourself with exits in places you frequently visit, like malls or public transportation." },
    { title: "Stay in Touch with Friends", content: "Check in regularly with friends or family, especially during outings." },
    { title: "Carry Personal Safety Devices", content: "Consider carrying pepper spray, a whistle, or a personal alarm for added protection." },
    { title: "Avoid Giving Rides to Strangers", content: "Be cautious about offering rides to people you don’t know well." },
    { title: "Educate Yourself on Local Crime", content: "Stay informed about crime trends in your area to be better prepared." }
  ];
  

export default function Tips() {
  return (
    <div className="tips" style={{ backgroundColor: '#0d7b7d', minHeight: '100vh', color: 'white', padding: '20px' }}>
      {/* App Bar Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Safety Tips
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Tips Section */}
      <Box sx={{ maxWidth: '800px', margin: 'auto', marginTop: '40px', padding: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Tips for Your Safety
        </Typography>
        {safetyTips.map((tip, index) => (
          <Paper key={index} sx={{ padding: '15px', marginBottom: '20px', backgroundColor: '#08343f', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {tip.title}
            </Typography>
            <Typography variant="body2">
              {tip.content}
            </Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
}
