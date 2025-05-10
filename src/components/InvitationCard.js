import React, { forwardRef } from 'react';
import { FaBirthdayCake, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaCalendarAlt, FaMapMarkedAlt, FaHeart, FaStar, FaGift } from 'react-icons/fa';
import './InvitationCard.css';

const InvitationCard = forwardRef(({ name }, ref) => (
  <div className="invitation-card" ref={ref}>
    <div className="invitation-header">
      <FaStar className="invitation-icon star left" />
      <FaBirthdayCake className="invitation-icon cake" />
      <h2 style={{ fontFamily: 'Dancing Script, cursive', color: '#ff4081', fontSize: '2.5rem', margin: 0, letterSpacing: '1px' }}>
        Vinitha's Birthday Celebration Bash!
      </h2>
      <FaGift className="invitation-icon gift" />
      <FaHeart className="invitation-icon heart" />
      <FaStar className="invitation-icon star right" />
    </div>
    <div className="invitation-body">
      <h3 style={{ color: '#4fd1c5', fontSize: '1.7rem', margin: '1.2rem 0 0.5rem 0', fontFamily: 'Dancing Script, cursive', letterSpacing: '0.5px' }}>
      {name ? `Hello ${name}!, You're invited ` : "You're invited!"}
      </h3>
      <div style={{ color: '#f50057', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.3rem', fontFamily: 'Dancing Script, cursive' }}>
        Thank you for your wonderful wish!
      </div>
      <div className="invitation-detail">
        <FaCalendarAlt className="invitation-icon detail" />
        <span><b>Date:</b> 11 May 2025 Sunday</span>
      </div>
      <div className="invitation-detail">
        <FaClock className="invitation-icon detail" />
        <span><b>Time:</b> 6:00 PM - 10:00 PM</span>
      </div>
      <div className="invitation-detail">
        <FaMapMarkerAlt className="invitation-icon detail" />
        <span><b>Venue:</b> CAFE INC </span>
      </div>
      <div className="invitation-detail">
        <FaMapMarkedAlt className="invitation-icon detail" />
        <span><b>Address:</b> 82, Thudiyalur Rd, behind Saro complex, Saravanampatti, Coimbatore</span>
      </div>
      <div className="invitation-contacts">
        <FaPhoneAlt className="invitation-icon detail" />
        <span><b>Contact:</b> 9003742206</span>
      </div>
      <div className="invitation-footer">
        <span className="invitation-emoji">🎉🎂🎈🎊💖✨</span>
        <p className="invitation-message">
          We can't wait to celebrate with you!<br />
          Your presence will make the day even more special.<br/>
          <span style={{ fontSize: '1.1rem', color: '#ffb300' }}>Let's make memories together!</span>
        </p>
      </div>
    </div>
  </div>
));

export default InvitationCard;
