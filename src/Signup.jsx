import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // now after email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!email || !name || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setSuccess("🎉 Signup successful! You can now login.");

      // Redirect after 2sec
      setTimeout(() => navigate("/login"), 2000);

      // Clear input values
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: "100px auto", width: "300px", textAlign: "center" }}>
      <h2>Create Account</h2>

      {/* Email FIRST */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      {/* Name SECOND */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      {/* Password THIRD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
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
          cursor: "pointer",
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Signup;
