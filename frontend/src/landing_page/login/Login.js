import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/login', {
                email,
                password
            });

            if (response.data.token) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', email);
                
                // Redirect to dashboard (assuming dashboard runs on port 3001)
                window.location.href = 'http://localhost:3001';
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message === 'Network Error' || err.code === 'ECONNREFUSED') {
                setError('Cannot connect to server. Please make sure the backend is running.');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '50px', marginBottom: '50px' }}>
            <div className="card shadow">
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

