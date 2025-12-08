import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("Loading...");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 🔥 This listens for real-time auth updates (fixes "Guest" issue)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        const name = user.displayName?.split(" ")[0] || "User";
        setFirstName(name);

        setTimeout(() => setFade(true), 200);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.error("Logout Error:", err));
  };

  const styles = {
    container: {
      textAlign: "center",
      minHeight: "100vh",
      background: "#1A1A1A",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(20px)",
      transition: "all 1s ease",
    },
    heading: {
      fontSize: "50px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    nameSpan: {
      color: "red",
      textShadow: "0px 0px 10px rgba(255,0,0,0.7)",
    },
    button: {
      marginTop: "20px",
      padding: "12px 30px",
      background: "red",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "30px",
      fontSize: "18px",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Welcome, <span style={styles.nameSpan}>{firstName}</span> 👋
      </h1>

      <button
        style={styles.button}
        onClick={handleLogout}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Logout 🚪
      </button>
    </div>
  );
};

export default Dashboard;
