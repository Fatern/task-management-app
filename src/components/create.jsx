import React, { useState, useEffect } from "react";

const Create = ({ staff, setStaff }) => {
  const [newStaff, setNewStaff] = useState({
    id: "",
    name: "",
    position: "",
    age: "",
    address: "",
    photo: "",
  });

  // Handle perubahan input di form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Tambah data staf baru
  const handleAddStaff = async () => {
    const response = await fetch("http://localhost:3001/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStaff),
    });
    const addedStaff = await response.json();
    setStaff([...staff, addedStaff]);
    setNewStaff({
      id: "",
      name: "",
      position: "",
      age: "",
      address: "",
      photo: "",
    });
  };

  // Edit data staf (mengisi form dengan data staf yang dipilih)
  const handleEditStaff = (id) => {
    const staffToEdit = staff.find((s) => s.id === id);
    setNewStaff(staffToEdit);
  };

  // Update data staf yang diedit
  const handleUpdateStaff = async () => {
    const response = await fetch(`http://localhost:3001/staff/${newStaff.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStaff),
    });
    const updatedStaffData = await response.json();
    const updatedStaff = staff.map((s) =>
      s.id === updatedStaffData.id ? updatedStaffData : s
    );
    setStaff(updatedStaff);
    setNewStaff({
      id: "",
      name: "",
      position: "",
      age: "",
      address: "",
      photo: "",
    });
  };

  // Hapus data staf
  const handleDeleteStaff = async (id) => {
    await fetch(`http://localhost:3001/staff/${id}`, {
      method: "DELETE",
    });
    const updatedStaff = staff.filter((s) => s.id !== id);
    setStaff(updatedStaff);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Staff</h1>

      {/* Form untuk Tambah/Edit Staf */}
      <div className="mb-6">
        <input
          type="text"
          name="name"
          value={newStaff.name}
          placeholder="Name"
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="position"
          value={newStaff.position}
          placeholder="Position"
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          value={newStaff.age}
          placeholder="Age"
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={newStaff.address}
          placeholder="Address"
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="photo"
          value={newStaff.photo}
          placeholder="Photo URL"
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />

        {/* Tombol Tambah/Update */}
        {newStaff.id ? (
          <button
            onClick={handleUpdateStaff}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Staff
          </button>
        ) : (
          <button
            onClick={handleAddStaff}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Staff
          </button>
        )}
      </div>

      {/* Daftar Staf */}
      <h2 className="text-xl font-bold mb-4">Staff List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-bold">{s.name}</h3>
            <p>Position: {s.position}</p>
            <p>Age: {s.age}</p>
            <p>Address: {s.address}</p>
            <img
              src={s.photo}
              alt={s.name}
              className="w-full h-32 object-cover rounded mt-2"
            />

            {/* Tombol Edit dan Delete */}
            <button
              onClick={() => handleEditStaff(s.id)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mt-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteStaff(s.id)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
