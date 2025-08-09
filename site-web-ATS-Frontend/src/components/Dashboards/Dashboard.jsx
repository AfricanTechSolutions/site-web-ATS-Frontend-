import React, { useState } from "react";
import {
  FaUsers,
  FaEye,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaBan,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats] = useState({
    traffic: 1520,
    users: 128,
  });

  const [usersList, setUsersList] = useState([
    { id: 1, name: "Jean Dupont", email: "jean@example.com", status: "Actif" },
    { id: 2, name: "Marie Claire", email: "marie@example.com", status: "Suspendu" },
  ]);

  const handleSuspend = (id) => {
    setUsersList((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Actif" ? "Suspendu" : "Actif" }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      {/* Sidebar:
           - fixed on all sizes for the slide animation on mobile
           - on lg it keeps top/bottom offsets so it doesn't cover header/footer (adjust top/bottom if needed)
           - overflow-auto to allow internal scroll
      */}
      <aside
        className={`fixed left-0 top-15 lg:top-26 lg:bottom-16 w-64 bg-blue-600 text-white transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 z-40 overflow-auto`}
        aria-hidden={false}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-300">
          <h1 className="text-lg sm:text-xl font-semibold">ATS Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white" aria-label="Fermer le menu">
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-2 sm:gap-4">
          <a href="/admin" className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded">
            <FaTachometerAlt /> Tableau de bord
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded">
            <FaFileAlt /> Contenus
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded">
            <FaUsers /> Utilisateurs
          </a>
        </nav>
      </aside>

      {/* Main content — pushed right on lg so it doesn't go under the fixed sidebar */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 overflow-auto">
        {/* Top Bar (make it relative so it doesn't interact with the sidebar positioning) */}
        <div className="flex items-center  justify-between py-2 mb-6 px-2 w-full">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-blue-600 text-2xl" aria-label="Ouvrir le menu">
            <FaBars />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-1">Dashboard ATS</h1>
          <div className="w-8 lg:hidden" /> {/* spacer */}
        </div>

        {/* Key Indicators */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-2 sm:p-4 flex items-center gap-4 border border-blue-500 w-full max-w-full mx-auto">
            <FaEye className="text-blue-500 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm sm:text-base">Trafic</p>
              <h2 className="text-xl sm:text-2xl font-bold">{stats.traffic}</h2>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg px-2 py-4 flex items-center gap-4 border border-green-500 w-full max-w-full mx-auto">
            <FaUsers className="text-green-500 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm sm:text-base">Utilisateurs inscrits</p>
              <h2 className="text-xl sm:text-2xl font-bold">{stats.users}</h2>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-orange-500 w-full max-w-full mx-auto">
            <FaFileAlt className="text-orange-500 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm sm:text-base">Articles & Services</p>
              <h2 className="text-xl sm:text-2xl font-bold">12</h2>
            </div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">Gestion des contenus</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-3 justify-center sm:gap-4">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-3 sm:px-4 py-4 rounded hover:bg-blue-600 text-sm sm:text-base justify-center">
              <FaPlus /> Ajouter un article
            </button>
            <button className="flex items-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-4 rounded hover:bg-green-600 text-sm sm:text-base justify-center">
              <FaPlus /> Ajouter un service
            </button>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-3 sm:px-4 py-4 rounded hover:bg-orange-600 text-sm sm:text-base justify-center">
              <FaPlus /> Ajouter au portfolio
            </button>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white mx-2 shadow-md rounded-lg p-4 sm:p-6 max-w-full overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Gestion des utilisateurs</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[350px] sm:min-w-[500px] text-xs sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Nom</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Statut</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td
                      className={`border p-2 font-semibold ${user.status === "Actif" ? "text-green-500" : "text-red-500"}`}
                    >
                      {user.status}
                    </td>
                    <td className="border p-4 text-center flex justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className={`m-0 ${user.status === "Actif" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}`}
                      >
                        <FaBan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
