// src/components/ForgotPassword.js
import React, { useState } from "react";

export default function ForgotPassword({ setRoute }) {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
      (u) => u.username === identifier || u.email === identifier
    );

    if (userIndex === -1) {
      alert("❌ No account found with that username or email");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Password updated! Please login.");
    setRoute("login");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <label>Username / Email</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter username or email"
          required
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />

        <button type="submit" className="btn-blue">
          Update Password
        </button>

        <p style={{ marginTop: "10px" }}>
          Back to{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => setRoute("login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
