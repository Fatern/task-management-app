const Profiles = ({ staff }) => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Staff Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{s.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Position:</strong> {s.position}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Age:</strong> {s.age}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> {s.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
