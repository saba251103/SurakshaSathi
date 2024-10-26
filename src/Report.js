import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Report() {
  const [area, setArea] = useState('');
  const [incident, setIncident] = useState('');
  const [incidentsList, setIncidentsList] = useState([]);

  useEffect(() => {
    // Load incidents from local storage when the component mounts
    const storedIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    setIncidentsList(storedIncidents);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create a new incident object
    const newIncident = { area, incident };
    
    // Update the incidents list
    const updatedIncidents = [...incidentsList, newIncident];
    setIncidentsList(updatedIncidents);

    // Store the updated list in local storage
    localStorage.setItem('incidents', JSON.stringify(updatedIncidents));

    // Clear the input fields
    setArea('');
    setIncident('');
  };

  return (
    <div className="report-incident" style={{ backgroundColor: '#0d7b7d', height: '100vh', color: 'white', padding: '20px' }}>
      {/* App Bar Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Report Incident
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: '600px', margin: 'auto', marginTop: '40px', padding: '20px', backgroundColor: '#08343f', borderRadius: '10px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Report Incident You Faced
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Area Input */}
          <TextField
            label="Area"
            variant="outlined"
            fullWidth
            margin="normal"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#c9c7b8',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />

          {/* Incident Input */}
          <TextField
            label="Incident"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#c9c7b8',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#08343f', color: 'white', marginTop: '20px', width: '100%' }}>
            Submit Incident
          </Button>
        </form>

        {/* Displaying Incidents */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>
            Reported Incidents
          </Typography>
          {incidentsList.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              No incidents reported yet.
            </Typography>
          ) : (
            incidentsList.map((inc, index) => (
              <Box key={index} sx={{ backgroundColor: '#c9c7b8', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                <Typography variant="body1" sx={{ color: 'black' }}><strong>Area:</strong> {inc.area}</Typography>
                <Typography variant="body1" sx={{ color: 'black' }}><strong>Incident:</strong> {inc.incident}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </div>
  );
}
