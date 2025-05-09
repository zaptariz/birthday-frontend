import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERS = [
  { username: 'birthdaygirl', password: 'happybday', role: 'birthdaygirl' },
  { username: 'admin', password: 'adminpass', role: 'admin' }
]; // Only keep USERS if it is used below

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('role', user.role);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        {error && <div className="error">{error}</div>}
      </form>
      {/* <div style={{marginTop: '1rem', fontSize: '0.9em', color: '#888'}}>
        <div><b>Birthday Girl:</b> birthdaygirl / happybday</div>
        <div><b>Admin:</b> admin / adminpass</div>
      </div> */}
    </div>
  );
};

export default SignIn; 