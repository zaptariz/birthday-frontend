import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaBirthdayCake, FaHeart, FaClock } from 'react-icons/fa';
import axios from 'axios';
import MusicPlayer from './components/MusicPlayer';
import CoverImage from './components/CoverImage';
import { API_URL } from './config';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fce4ec',
    },
  },
  typography: {
    fontFamily: '"Dancing Script", cursive',
  },
});

const relationships = [
  'Family',
  'Friend',
  'Sister',
  'Brother',
  // 'Best Friend',
  'Colleague',
  'Other'
];

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ 
    name: '', 
    relationship: '', 
    message: '' 
  });

  useEffect(() => {
    fetchMessages();
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      let timeOfDay;
      
      if (hours >= 5 && hours < 12) {
        timeOfDay = 'Morning';
      } else if (hours >= 12 && hours < 17) {
        timeOfDay = 'Afternoon';
      } else if (hours >= 17 && hours < 21) {
        timeOfDay = 'Evening';
      } else {
        timeOfDay = 'Night';
      }

      const messageWithTime = {
        ...newMessage,
        timeOfDay,
        createdAt: currentTime
      };

      await axios.post(`${API_URL}/api/messages`, messageWithTime);
      setNewMessage({ name: '', relationship: '', message: '' });
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const getRelationshipEmoji = (relationship) => {
    const emojis = {
      'Family': '👨‍👩‍👧‍👦',
      'Friend': '👥',
      'Sister': '👭',
      'Brother': '👬',
      'Best Friend': '💖',
      'Colleague': '💼',
      'Other': '🌟'
    };
    return emojis[relationship] || '💫';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            // Home page (public)
            <>
              <div className="animated-bg-confetti"></div>
              <div className="animated-bg">
                {/* <img src="https://pngimg.com/uploads/balloon/balloon_PNG4951.png" className="animated-bg-balloon" style={{left: '10vw'}} alt="balloon" /> */}
                <img src="https://pngimg.com/uploads/balloon/balloon_PNG4952.png" className="animated-bg-balloon" style={{left: '30vw'}} alt="balloon" />
                <img src="https://pngimg.com/uploads/balloon/balloon_PNG4953.png" className="animated-bg-balloon" style={{left: '50vw'}} alt="balloon" />
                <img src="https://pngimg.com/uploads/balloon/balloon_PNG4954.png" className="animated-bg-balloon" style={{left: '70vw'}} alt="balloon" />
                <img src="https://pngimg.com/uploads/balloon/balloon_PNG4955.png" className="animated-bg-balloon" style={{left: '90vw'}} alt="balloon" />
              </div>
              <div className="app-container">
                <CoverImage />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="header"
                >
                  <div style={{
                    background: 'url("/birthday-bg.jpg")',
                    backgroundSize: 'cover',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 0,
                      animation: 'float 3s infinite ease-in-out'
                    }}>
                      {Array(50).fill().map((_, i) => (
                        <span key={i} style={{
                          position: 'absolute',
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          transform: `rotate(${Math.random() * 360}deg)`
                        }}>
                          {['🎈', '🎂', '🎁', '🎊', '🎉', '⭐', '��', '💫', '💝'][Math.floor(Math.random() * 9)]}
                        </span>
                      ))}
                    </div>
                    <div style={{position: 'relative', zIndex: 1}}>
                      <FaBirthdayCake className="icon" />
                      <h1>Its Vinitha's Birthday </h1>
                      <FaHeart className="icon" />
                    </div>
                  </div>
                </motion.div>

                <MusicPlayer />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="content"
                >
                  <div className="message-form">
                    <h2>Leave a Birthday Wish</h2>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newMessage.name}
                        onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                        required
                      />
                      <select
                        value={newMessage.relationship}
                        onChange={(e) => setNewMessage({ ...newMessage, relationship: e.target.value })}
                        required
                        className="relationship-select"
                      >
                        <option value="">Select Relationship</option>
                        {relationships.map(rel => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                      <textarea
                        placeholder="Write your heartfelt message..."
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                        required
                      />
                      <button type="submit">Send Wish</button>
                    </form>
                  </div>

                  <div className="messages">
                    <h2>Birthday Wishes</h2>
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="message-card"
                        >
                          <div className="message-header">
                            <h3 style={{fontSize: '2em'}}>
                              {getRelationshipEmoji(msg.relationship)} {msg.name}
                              <span className="relationship-tag" style={{fontSize: '.6em', marginLeft: 6, backgroundColor: 'skyblue', color: 'black' }}>{msg.relationship}</span>
                            </h3>
                            <div className="message-time">
                              <FaClock  />
                              <span style={{ marginLeft: 6, fontSize: '0.95em' }}>{msg.timeOfDay}</span>
                              <span style={{ marginLeft: 12, color: '#888', fontSize: '0.95em' }}>
                                {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                          <p style={{fontSize: '1.2em', lineHeight: '1.5', fontWeight: 'bold'}}>{msg.message}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
