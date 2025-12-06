import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ⭐ New state

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("🎉 Signup successful! You can now login.");

      // Optional: Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: "100px auto", width: "300px", textAlign: "center" }}>
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      <button
        onClick={handleSignup}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
        }}
      >
        Sign Up
      </button>

      <p
        style={{
          cursor: "pointer",
          color: "blue",
          marginTop: "15px",
          textDecoration: "underline",
        }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </p>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Signup;
