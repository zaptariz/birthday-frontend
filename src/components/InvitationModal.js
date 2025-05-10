import React, { useRef, useEffect } from 'react';
import InvitationCard from './InvitationCard';
import confetti from 'canvas-confetti';
import './InvitationModal.css';

const balloonImgs = [
  'https://pngimg.com/uploads/balloon/balloon_PNG4952.png',
  'https://pngimg.com/uploads/balloon/balloon_PNG4953.png',
  'https://pngimg.com/uploads/balloon/balloon_PNG4954.png',
  'https://pngimg.com/uploads/balloon/balloon_PNG4955.png',
];

const InvitationModal = ({ open, onClose, wisherName }) => {
  const cardRef = useRef();
  const downloadCardRef = useRef();

  useEffect(() => {
    if (open && cardRef.current) {
      // Confetti burst!
      setTimeout(() => {
        confetti({
          particleCount: 180,
          spread: 120,
          origin: { y: 0.35 },
          colors: ['#ff4081', '#ffb300', '#4fd1c5', '#ffe066', '#f50057', '#fffbe7'],
          shapes: ['circle', 'star', 'square'],
        });
        confetti({
          particleCount: 110,
          spread: 180,
          origin: { y: 0.7 },
          colors: ['#ff4081', '#ffb300', '#4fd1c5', '#ffe066', '#f50057', '#fffbe7'],
          shapes: ['circle', 'star', 'square'],
        });
      }, 350);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="invitation-modal-overlay">
      {/* Animated floating balloons and stars */}
      <div className="invitation-modal-balloons">
        {Array.from({ length: 6 }).map((_, i) => (
          <img
            key={i}
            src={balloonImgs[i % balloonImgs.length]}
            className="invitation-modal-balloon"
            style={{ left: `${10 + i * 15}vw`, animationDelay: `${i * 0.7}s` }}
            alt="balloon"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={100 + i}
            className="invitation-modal-star"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%`, animationDelay: `${i * 0.3}s` }}
          >
            ✨
          </span>
        ))}
      </div>
      <div className="invitation-modal-content">
        <button className="invitation-modal-close" onClick={onClose}>&times;</button>
        <InvitationCard ref={cardRef} name={wisherName} />
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          {/* Download-only plain invitation card */}
          <div ref={downloadCardRef} style={{
            width: 320,
            minHeight: 520,
            background: 'linear-gradient(135deg, #ffe3ed 0%, #e7faff 100%)',
            borderRadius: 20,
            boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
            padding: 20,
            boxSizing: 'border-box',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            color: '#ff4081',
            display: 'block',
            wordBreak: 'break-word',
          }}>
            <div style={{ fontSize: 20, marginBottom: 10, lineHeight: 1.3 }}>🎂🎉</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>Vinitha's Birthday Celebration Bash!</div>
            <div style={{ fontSize: 13, color: '#4fd1c5', marginBottom: 10, lineHeight: 1.4 }}>{wisherName ? `You're invited, ${wisherName}!` : "You're invited!"}</div>
            <div style={{ color: '#f50057', fontWeight: 700, fontSize: 13, marginBottom: 12, lineHeight: 1.4 }}>Thank you for your wonderful wish!</div>
            <div style={{ fontSize: 13, color: '#d81b60', fontWeight: 700, marginBottom: 6, lineHeight: 1.5 }}>📅 Date: 11 May 2025 Sunday</div>
            <div style={{ fontSize: 13, color: '#d81b60', fontWeight: 700, marginBottom: 6, lineHeight: 1.5 }}>⏰ Time: 6:00 PM - 10:00 PM</div>
            <div style={{ fontSize: 13, color: '#d81b60', fontWeight: 700, marginBottom: 6, lineHeight: 1.5 }}>📍 Venue: CAFE INC</div>
            <div style={{ fontSize: 13, color: '#d81b60', fontWeight: 700, marginBottom: 6, lineHeight: 1.5 }}>🗺️ Address: 82, Thudiyalur Rd, behind Saro complex, Saravanampatti, Coimbatore</div>
            <div style={{ fontSize: 13, color: '#d81b60', fontWeight: 700, marginBottom: 14, lineHeight: 1.5 }}>☎️ Contact: 9003742206</div>
            <div style={{ fontSize: 20, margin: '10px 0 10px 0', color: '#ff4081', lineHeight: 1.3 }}>🎈🎊💖✨</div>
            <div style={{ fontSize: 13, color: '#222', marginBottom: 5, lineHeight: 1.5 }}>We can't wait to celebrate with you!</div>
            <div style={{ fontSize: 13, color: '#222', marginBottom: 5, lineHeight: 1.5 }}>Your presence will make the day even more special.</div>
            <div style={{ fontSize: 13, color: '#ffb300', marginTop: 8, lineHeight: 1.4, fontWeight: 700 }}>Let's make memories together!</div>
          </div>
        </div>
        <div className="invitation-modal-download-msg">
          <span>🎉 Your invitation card has been downloaded!</span>
        </div>
      </div>
      <canvas id="confetti-canvas" style={{ position: 'fixed', pointerEvents: 'none', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2002 }} />
    </div>
  );
};

export default InvitationModal;
