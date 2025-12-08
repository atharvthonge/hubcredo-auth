import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Refresh metadata like displayName
      await auth.currentUser.reload();

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ margin: "100px auto", width: "300px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value.trim())}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value.trim())}
        style={{ width: "100%", padding: "10px", margin: "10px" }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p
        style={{ cursor: "pointer", color: "green", marginTop: "10px" }}
        onClick={() => navigate("/")}
      >
        Create new account
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
