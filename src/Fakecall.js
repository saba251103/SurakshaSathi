import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

function VideoPlayer() {
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  
  const toggleVideoPlay = () => setVideoPlaying((prev) => !prev);
  const toggleAudioPlay = () => setAudioPlaying((prev) => !prev);

  return (
    <Box sx={styles.container}>
      {/* Video Section */}
      <Box sx={styles.section}>
        <Typography variant="h5" sx={styles.heading}>
          <VideoLibraryIcon sx={{ fontSize: 28, verticalAlign: 'middle', marginRight: 1 }} />
          This video is for when you are heading home alone
        </Typography>
        <video
          style={styles.video}
          controls
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
        >
          <source src={`${process.env.PUBLIC_URL}/fakecall.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <IconButton color="secondary" onClick={toggleVideoPlay} sx={styles.playButton}>
          {videoPlaying ? <PauseCircleFilledIcon fontSize="large" /> : <PlayCircleFilledIcon fontSize="large" />}
        </IconButton>
      </Box>

      {/* Audio Section */}
      <Box sx={styles.section}>
        <Typography variant="h5" sx={styles.heading}>
          <PhoneInTalkIcon sx={{ fontSize: 28, verticalAlign: 'middle', marginRight: 1 }} />
          This should be played when you need to pretend to take a call
        </Typography>
        <audio
          style={styles.audio}
          controls
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
        >
          <source src={`${process.env.PUBLIC_URL}/ringtone.mp3`} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
        <IconButton color="secondary" onClick={toggleAudioPlay} sx={styles.playButton}>
          {audioPlaying ? <PauseCircleFilledIcon fontSize="large" /> : <PlayCircleFilledIcon fontSize="large" />}
        </IconButton>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#08343f',
    color: '#FFFFFF',
    padding: '40px',
    minHeight: '100vh',
    gap: '30px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#0d7b7d',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  heading: {
    fontSize: '24px',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  video: {
    maxWidth: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
  },
  audio: {
    width: '100%',
    maxWidth: '600px',
  },
  playButton: {
    color: '#ffeb3b',
    position: 'absolute',
    top: 'calc(50% - 24px)',
    right: '20px',
  },
};

export default VideoPlayer;
