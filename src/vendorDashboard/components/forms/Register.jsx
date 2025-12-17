import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ store from input (not backend)
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // new user → no firm yet
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");

        if (data.token) {
          localStorage.setItem("loginToken", data.token);
        }

        setUsername("");
        setEmail("");
        setPassword("");

        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error || "Registration failed");
        alert("Registration Failed, Contact Admin");
      }
    } catch (err) {
      console.error("Registration failed", err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles height={100} width={100} color="#4fa94d" />
          <p>Hi, your registration is in progress</p>
        </div>
      )}

      {!loading && (
        <form className="authForm" onSubmit={handleSubmit} autoComplete="off">
          <h3>Vendor Register</h3>

          {error && <p className="errorText">{error}</p>}

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="passwordField">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="showPassword" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
