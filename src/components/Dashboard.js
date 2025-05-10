import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const Dashboard = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [litUp, setLitUp] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Only use 'role' if it's referenced in logic or JSX below
  const role = localStorage.getItem('role');


  useEffect(() => {
    if (!role) {
      navigate('/signin');
      return;
    }
    fetchMessages();
    // eslint-disable-next-line
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/messages`);
      setMessages(res.data);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this wish?')) return;
    try {
      await axios.delete(`${API_URL}/api/messages/${id}`);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/signin');
  };

  return (
    <>
      <div className="animated-bg-confetti"></div>
      <div className="animated-bg">
        {/* <img src="https://pngimg.com/uploads/balloon/balloon_PNG4951.png" className="animated-bg-balloon" style={{left: '10vw'}} alt="balloon" /> */}
        <img src="https://pngimg.com/uploads/balloon/balloon_PNG4953.png" className="animated-bg-balloon" style={{left: '50vw'}} alt="balloon" />

        <img src="https://pngimg.com/uploads/balloon/balloon_PNG4952.png" className="animated-bg-balloon" style={{left: '30vw'}} alt="balloon" />
        <img src="https://pngimg.com/uploads/balloon/balloon_PNG4953.png" className="animated-bg-balloon" style={{left: '50vw'}} alt="balloon" />
        <img src="https://pngimg.com/uploads/balloon/balloon_PNG4954.png" className="animated-bg-balloon" style={{left: '70vw'}} alt="balloon" />
        <img src="https://pngimg.com/uploads/balloon/balloon_PNG4955.png" className="animated-bg-balloon" style={{left: '90vw'}} alt="balloon" />
      </div>
      <div className={`dashboard-container${role === 'birthdaygirl' && !overlayGone ? ' dimmed' : ''}`}>
        {role === 'birthdaygirl' && (
          <>
            {/* Overlay for lighting up the page */}
            {!litUp && !overlayGone && (
              <div className="lightup-overlay">
                <button
                  className="lightup-btn"
                  onClick={async () => {
                    setLitUp(true);
                    setTimeout(() => setOverlayGone(true), 1800); // match CSS transition duration
                    // Try to autoplay audio
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      try {
                        await audioRef.current.play();
                        setIsPlaying(true);
                      } catch (err) {
                        // Autoplay blocked, show play button
                        setIsPlaying(false);
                      }
                    }
                  }}
                >
                  ✨ Light up the page! ✨
                </button>
              </div>
            )}
            <audio
              ref={audioRef}
              src="/welcome.mp3"
              style={{ display: 'none' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {litUp && (
              <button
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlaying) {
                      audioRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }
                }}
                style={{margin: '16px 0', padding: '8px 16px', fontWeight: 'bold', fontSize: '1.1em', borderRadius: '8px', background: '#ffb347', border: 'none', cursor: 'pointer'}}
              >
                {isPlaying ? '⏸️ Pause Welcome Song' : '▶️ Play Welcome Song'}
              </button>
            )}
            <div className="dashboard-welcome">
              <h1 className="dashboard-birthday-title">🎉 Happy Birthday Vinitha! 🎉</h1>
              <p className="dashboard-birthday-subtext">Here are your lovely wishes…</p>
            </div>
            {/* <div className="dashboard-characters">
              <div className="character-block">
                <img src="https://media.tenor.com/2roX3uxz_68AAAAC/cat-tom.gif" alt="Tom and Jerry" className="character-gif" />
                <div className="speech-bubble">Tom & Jerry: Happy Birthday, Vinitha!</div>
              </div>
              <div className="character-block">
                <img src="https://media.tenor.com/6k1JtGkQKp8AAAAC/scooby-doo-dance.gif" alt="Scooby Doo" className="character-gif" />
                <div className="speech-bubble">Scooby-Doo: Ruh-roh! Happy Birthday!</div>
              </div>
            </div> */}
          </>
        )}
        <div className="dashboard-header">
          <h2>Vinitha<span className="dashboard-role">{role === 'admin' ? 'Admin' : 'ONCE AGAIN HAPPY BORN DAY DARLING'}</span></h2>
          <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>
        {loading ? <div className="dashboard-loading">Loading...</div> : (
          <div className="dashboard-messages">
            {messages.length === 0 && <div className="dashboard-empty">No wishes yet.</div>}
            {messages.map((msg, idx) => (
              <div key={msg._id} className="dashboard-message-card dashboard-animate-in" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="dashboard-message-header">
                  <div>
                    <b style={{fontSize: '3em'}}>{msg.name}</b> <span className="dashboard-relationship">({msg.relationship})</span>
                  </div>
                  <div className="dashboard-message-time">
                    <span>{msg.timeOfDay}</span>
                    <span style={{ marginLeft: 10, color: '#888', fontSize: '0.95em' }}>
                      {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="dashboard-message-content" style={{ fontSize: '3.25rem', fontWeight: 500, lineHeight: 1.6 }}>{msg.message}</div>
                {role === 'admin' && (
                  <button className="dashboard-delete-btn" onClick={() => handleDelete(msg._id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard; 