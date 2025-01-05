import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    assignedTo: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.dueDate ||
      !newTask.assignedTo
    ) {
      alert("Please fill in all fields");
      return;
    }

    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const addedTask = await response.json();

    setTasks((prevTasks) => [...prevTasks, addedTask]);

    const calendarEvent = {
      id: addedTask.id,
      eventTitle: addedTask.title,
      eventDate: addedTask.dueDate,
    };

    await fetch("http://localhost:3001/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(calendarEvent),
    });

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      assignedTo: "",
    });
  };
  const handleEditTask = (task) => {
    setNewTask(task);
  };
  const handleUpdateTask = async () => {
    if (!newTask.id) {
      alert("Task ID is missing.");
      return;
    }
    const response = await fetch(`http://localhost:3001/tasks/${newTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const updatedTask = await response.json();
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setNewTask({
      id: null,
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      assignedTo: "",
    });
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));

//INI buat ngehapus data yang ditarik ke calender
    await fetch(`http://localhost:3001/calendar/${id}`, { method: "DELETE" });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>
      <Box
        className="dark:bg-gray-800 rounded-lg p-5"
        component="form"
        noValidate
        autoComplete="off"
        mb={3}
      >
        <TextField
          label="Title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: "gray" },
            className: "dark:text-black",
          }}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: "gray" },
            className: "dark:text-black",
          }}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <TextField
          label="Due Date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          fullWidth
          type="date"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
            style: { color: "gray" },
            className: "dark:text-black",
          }}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <TextField
          label="Assigned To"
          name="assignedTo"
          value={newTask.assignedTo}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: "gray" },
            className: "dark:text-black",
          }}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={newTask.id ? handleUpdateTask : handleAddTask}
        >
          {newTask.id ? "Update Task" : "Add Task"}
        </Button>
      </Box>

      {/* Task List */}
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-bold dark:text-gray-100">
              {task.title}
            </h3>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Status: {task.status}</p>

            <div className="flex space-x-2 mt-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditTask(task)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/calendar" className="mt-4 inline-block text-blue-500">
        Go to Calendar
      </Link>
    </div>
  );
};

export default TaskList;
