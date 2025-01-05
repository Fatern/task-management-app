import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Gagal mengambil data tugas. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getEvents = () => {
    if (!Array.isArray(tasks)) return [];
    return tasks.map((task) => ({
      title: task.title || "No Title",
      date: task.dueDate || new Date().toISOString().split("T")[0],
      id: task.id,
      description: task.description || "No Description",
      status: task.status || "Pending",
    }));
  };

  const handleDateClick = (arg) => {
    setSelectedDate(new Date(arg.dateStr));
  };

  const handleEventClick = (clickInfo) => {
    const task = tasks.find((task) => task.id === clickInfo.event.id);
    if (!task) return;

    if (
      window.confirm(`Are you sure you want to delete the task: ${task.title}?`)
    ) {
      deleteTask(task.id);
      clickInfo.event.remove();
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Gagal menghapus tugas. Silakan coba lagi nanti.");
    }
  };

  const markTaskAsComplete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Complete" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Gagal memperbarui status tugas. Silakan coba lagi nanti.");
    }
  };

  const tasksForSelectedDate = React.useMemo(() => {
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(
      (task) =>
        new Date(task.dueDate).toDateString() === selectedDate.toDateString()
    );
  }, [tasks, selectedDate]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Calendar
      </h1>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <div className="mt-6">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={getEvents()}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="80vh" // Mengatur tinggi kalender agar lebih kecil
              contentHeight="auto" // Mengatur tinggi konten agar fleksibel
            />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">
              Tasks on {selectedDate.toDateString()}
            </h2>
            {tasksForSelectedDate.map((task) => (
              <div
                key={task.id}
                className="mt-2 dark:bg-gray-900 bg-gray-300 p-4 rounded-md"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Assigned To:</strong> {task.assignedTo || "Unknown"}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                {task.status === "Pending" && (
                  <button
                    onClick={() => markTaskAsComplete(task.id)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            ))}
            {tasksForSelectedDate.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">
                No tasks for this day
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarPage;
