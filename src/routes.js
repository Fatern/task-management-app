import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import LoginForm from "./components/loginform";
import Layout from "./components/layout";
import Dashboard from "./components/homepage";
import Profiles from "./components/profiles";
import Create from "./components/create";
import Task from "./components/tasklist";
import CalendarView from "./components/calender";
import AboutApp from "./components/aboutapp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staff, setStaff] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch("http://localhost:3001/staff");
      const data = await response.json();
      setStaff(data);
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchCalendar = async () => {
      const response = await fetch("http://localhost:3001/calendar");
      const data = await response.json();
      setCalendar(data);
    };
    fetchCalendar();
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
          <Route
            path="dashboard"
            element={
              <Dashboard staff={staff} tasks={tasks} calendar={calendar} />
            }
          />
          <Route path="profiles" element={<Profiles staff={staff} />} />
          <Route
            path="create"
            element={<Create staff={staff} setStaff={setStaff} />}
          />
          <Route path="tasks" element={<Task tasks={tasks} />} />
          <Route
            path="calendar"
            element={<CalendarView calendar={calendar} />}
          />
          <Route path="about" element={<AboutApp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
