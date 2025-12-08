import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = auth.currentUser;

  // Safely extract the first name, defaulting to "Guest" if user/displayName is null
  const firstName = user?.displayName?.split(" ")[0] || "Guest";

  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 1. Safety check: Redirect if user is null (not logged in)
    if (!user) {
      navigate("/login");
      return;
    }

    // 2. Start the fade-in animation
    setTimeout(() => setFade(true), 100);
  }, [user, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.error("Logout Error:", err));
  };

  // If the user is not logged in, render nothing while redirecting
  if (!user) {
    return null;
  }

  // --- UPDATED STYLES OBJECTS ---
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      // ⭐️ CHANGED BACKGROUND COLOR HERE
      backgroundColor: "#1A1A1A", // Dark Gray (less intense than pure black)
      color: "white",
      padding: "20px",
      transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(30px)",
    },
    heading: {
      fontSize: "clamp(30px, 5vw, 60px)",
      fontWeight: "900",
      marginBottom: "30px",
    },
    nameSpan: {
      color: "#FF6347", // Tomato Red (a slightly brighter red)
      textShadow: "0px 0px 15px rgba(255, 99, 71, 0.8)",
    },
    logoutButton: {
      padding: "12px 30px",
      background: "#FF6347",
      color: "white",
      border: "2px solid #FF6347",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      boxShadow: "0 4px 15px rgba(255, 99, 71, 0.4)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 20px rgba(255, 99, 71, 0.6)",
      background: "#E55337", // Darker shade on hover
    },
  };
  // ------------------------------------------------------------------

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Welcome, <span style={styles.nameSpan}>{firstName}</span> 👋
      </h1>

      <button
        onClick={handleLogout}
        style={styles.logoutButton}
        // Applying hover effects directly via onMouseEnter/onMouseLeave
        onMouseEnter={(e) => {
          Object.assign(e.target.style, styles.buttonHover);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.target.style, styles.logoutButton);
        }}
      >
        Logout 🚪
      </button>
    </div>
  );
};

export default Dashboard;
