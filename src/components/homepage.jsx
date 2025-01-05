import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Dashboard = ({ staff = [], tasks = [], calendar = [] }) => {
  const getCalendarEvents = () => {
    const taskEvents = tasks.map((task) => ({
      title: task.title,
      date: task.dueDate,
      description: task.description || "No Description",
      status: task.status,
      id: task.id,
      color: task.status === "Completed" ? "green" : "orange",
    }));

    const calendarEvents = calendar.map((event) => ({
      title: event.title,
      date: event.date,
      description: event.description || "No Description",
      id: `event-${event.id}`,
      color: "blue",
    }));

    return [...taskEvents, ...calendarEvents];
  };

  return (
    <div className="p-8 bg-krem dark:bg-gray-900 min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-400">
        Selamat Datang di Dashboard Utama
      </h1>
      <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-400">
        Mengelola Staff, Tasks, dan Kalender dengan mudah.
      </p>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-400">
          Daftar Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staff.length > 0 ? (
            staff.map((person) => (
              <div
                key={person.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                  {person.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {person.role}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Tidak ada staff ditemukan
            </p>
          )}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-400">
          Daftar Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
                <div className="mt-2 text-gray-500 dark:text-gray-300">
                  <p>
                    Due Date:{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-300">
                      {task.dueDate}
                    </span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        task.status === "Completed"
                          ? "text-green-500"
                          : task.status === "Pending"
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              Tidak ada task ditemukan
            </p>
          )}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-400">
          Calendar
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-lg  dark:bg-gray-800 dark:text-gray-400">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getCalendarEvents()}
            height="auto"
            eventClick={(info) =>
              alert(
                `Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
