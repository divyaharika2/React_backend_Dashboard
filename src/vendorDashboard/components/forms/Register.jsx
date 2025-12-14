import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registered vendor:", data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully!");
        showLoginHandler();
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Server unreachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        {error && <div className="error-message">{error}</div>}

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        /><br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        /><br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        /><br />

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div><br />
      </form>
    </div>
  );
};

export default Register;