import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (userEmail) => {
    setEmail(userEmail);
    setPassword('password123');
    setError('');
    setLoading(true);

    try {
      await login(userEmail, 'password123');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#6366F1"/>
              <path d="M8 16C8 11.5817 11.5817 8 16 8V8C20.4183 8 24 11.5817 24 16V24H16C11.5817 24 8 20.4183 16 16V16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Capacity Helpdesk</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-accounts">
          <p>Demo Accounts:</p>
          <div className="demo-buttons">
            <button onClick={() => demoLogin('sarah@capacity.com')} className="demo-btn">
              Sarah (Agent)
            </button>
            <button onClick={() => demoLogin('mike@capacity.com')} className="demo-btn">
              Mike (Agent)
            </button>
          </div>
          <p className="demo-hint">Password: password123</p>
        </div>
      </div>
    </div>
  );
}
