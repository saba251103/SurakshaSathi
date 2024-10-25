import Anomoly from './anomoly';
import './App.css';
import Home from './Home';
import SafetyDashboard from './Proximity';
import SignIn from './signin';
import SignUp from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/safety-dashboard" element={<SafetyDashboard />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/anomoly" element={<Anomoly />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;