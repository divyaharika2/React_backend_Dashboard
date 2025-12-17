import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      /* ===============================
         LOGIN API
      =============================== */
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Store token
      localStorage.setItem("loginToken", data.token);

      // ✅ Clear old data
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmName");
      localStorage.removeItem("firmImage");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      /* ===============================
         FETCH FULL VENDOR PROFILE
      =============================== */
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${data.vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const vendorData = await vendorResponse.json();

      if (!vendorResponse.ok) {
        throw new Error("Failed to fetch vendor details");
      }

      /* ===============================
         STORE USER DETAILS
      =============================== */
      const vendor = vendorData.vendor;
      localStorage.setItem("username", vendor.username);
      localStorage.setItem("email", vendor.email);

      /* ===============================
         STORE FIRM DETAILS (IF EXISTS)
      =============================== */
      if (vendor.firm && vendor.firm.length > 0) {
        const firm = vendor.firm[0];

        localStorage.setItem("firmId", firm._id);
        localStorage.setItem("firmName", firm.firmName);

        if (firm.image) {
          localStorage.setItem("firmImage", firm.image);
        }
      }

      setEmail("");
      setPassword("");

      alert("Login successful");
      showWelcomeHandler(); // SPA navigation

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles height={100} width={100} color="#4fa94d" />
          <p>Login in process...</p>
          <p>Please wait</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3>Vendor Login</h3>

          {error && <p className="errorText">{error}</p>}

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

export default Login;
