import React, { useState, useEffect } from "react";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import Products from "./components/Products";
import Invoices from "./components/Invoices";
import Reports from "./components/Reports";

function App() {
  const [route, setRoute] = useState("home");
  const [user, setUser] = useState(null);

  // Restore logged-in user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setRoute("home");
  };

  const renderPage = () => {
    if (route === "home") return <Home setRoute={setRoute} />;
    if (route === "login")
      return <Login setUser={setUser} setRoute={setRoute} />;
    if (route === "register") return <Register setRoute={setRoute} />;
    if (route === "forgot-password")
      return <ForgotPassword setRoute={setRoute} />;

    // Block access if not logged in
    if (!user) {
      return (
        <div className="card">
          <h2>Access Denied</h2>
          <p>
            You must{" "}
            <button className="btn-blue" onClick={() => setRoute("login")}>
              Login
            </button>{" "}
            to continue.
          </p>
        </div>
      );
    }

    // Routes after login
    if (route === "dashboard") return <Dashboard user={user} />;

    if (route === "customers") {
      return user.role === "ADMIN" ? (
        <Customers />
      ) : (
        <div className="card">
          Access Denied: Only Admins can manage customers.
        </div>
      );
    }

    if (route === "products") {
      return user.role === "ADMIN" ? (
        <Products />
      ) : (
        <div className="card">
          Access Denied: Only Admins can manage products.
        </div>
      );
    }

    if (route === "invoices") {
      return user.role === "ADMIN" || user.role === "ACCOUNTANT" ? (
        <Invoices />
      ) : (
        <div className="card">
          Access Denied: Only Admin/Accountant can manage invoices.
        </div>
      );
    }

    if (route === "reports") {
      return user.role === "ADMIN" || user.role === "ACCOUNTANT" ? (
        <Reports />
      ) : (
        <div className="card">
          Access Denied: Only Admin/Accountant can view reports.
        </div>
      );
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Billing App</h1>
        <nav>
          <button onClick={() => setRoute("home")}>Home</button>
          {!user && <button onClick={() => setRoute("login")}>Login</button>}
          {!user && (
            <button onClick={() => setRoute("register")}>Register</button>
          )}

          {user && (
            <button onClick={() => setRoute("dashboard")}>Dashboard</button>
          )}

          {user?.role === "ADMIN" && (
            <>
              <button onClick={() => setRoute("customers")}>Customers</button>
              <button onClick={() => setRoute("products")}>Products</button>
            </>
          )}

          {(user?.role === "ADMIN" || user?.role === "ACCOUNTANT") && (
            <>
              <button onClick={() => setRoute("invoices")}>Invoices</button>
              <button onClick={() => setRoute("reports")}>Reports</button>
            </>
          )}

          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>

      <main className="container">{renderPage()}</main>
    </div>
  );
}

export default App;
