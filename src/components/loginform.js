import React, { useState } from "react";
import users from "../data/users.json"; // Import JSON langsung

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi login
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(); // Berhasil login
    } else {
      setError("Invalid username or password"); // Gagal login
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-krem">
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
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
