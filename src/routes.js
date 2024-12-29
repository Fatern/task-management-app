import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/loginform";
import Layout from "./components/layout";
import Dashboard from "./components/homepage";
import Profiles from "./components/profiles";
import Create from "./components/create";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staff, setStaff] = useState([]); // Data staff akan dimuat dari JSON Server

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch("http://localhost:3001/staff");
      const data = await response.json();
      setStaff(data);
    };
    fetchStaff();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Layout onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profiles" element={<Profiles staff={staff} />} />
          <Route path="create"element={<Create staff={staff} setStaff={setStaff} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
