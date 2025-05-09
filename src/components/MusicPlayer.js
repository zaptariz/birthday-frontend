import React, { useState, useRef, useEffect } from 'react';
import { FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Only keep motion if it is used below

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Add error handling for audio loading
    const audio = audioRef.current;
    const handleError = (e) => {
      console.error('Audio loading error:', e);
      setError('Failed to load audio file');
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    if (error) {
      console.error('Cannot play audio:', error);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Add error handling for play attempt
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Playback error:', error);
          setError('Failed to play audio');
          setIsPlaying(false);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="music-player"
    >
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + '/birthday-song.mp3'}
        preload="auto"
        loop
      />
      <button
        onClick={togglePlay}
        className={`music-button ${error ? 'error' : ''}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={error || (isPlaying ? 'Pause music' : 'Play music')}
      >
        <FaMusic className="music-icon" />
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </motion.div>
  );
};

export default MusicPlayer; 