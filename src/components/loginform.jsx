import React, { useState, useEffect } from "react";
import show from "../assets/lamp-fill.svg";
import hide from "../assets/lamp.svg";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load user data");
      }
    };

    fetchUsers();
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="font-sans flex items-center justify-center h-screen bg-krem">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="px-2 py-2 right-1 absolute"
          >
            <img
              src={showPassword ? hide : show}
              alt={showPassword ? "Hide password" : "Show password"}
              className="h-6 w-6"
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-dkrem text-white py-2 rounded hover:bg-krem"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
