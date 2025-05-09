import React from 'react';
import { motion } from 'framer-motion'; // Only keep motion if used below

const CoverImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="cover-date-container"
    >
      <div className="cover-date-overlay">
        <div className="cover-date-content">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="date-circle"
          >
            {/* <FaCalendarAlt className="calendar-icon" /> */}
            <div className="date-text">
              <span className="day">11</span>
              <span className="month">MAY</span>
              <span className="year">2025</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="cover-text"
          >
            <h2>Mark Your Calendar</h2>
            {/* <p>A Special Day Awaits</p> */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="cake-icon"
            >
              {/* <FaBirthdayCake /> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoverImage; 