import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      await auth.currentUser.reload();

      setSuccess("🎉 Account created successfully! Redirecting...");

      setTimeout(() => navigate("/login"), 2000);

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

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

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
        onClick={() => navigate("/login")}
        style={{
          cursor: "pointer",
          color: "blue",
          marginTop: "15px",
          textDecoration: "underline",
        }}
      >
        Already have an account? Login
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>
      )}
    </div>
  );
};

export default Signup;
