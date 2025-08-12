import React, { useState } from "react";
import {
  FaUsers,
  FaEye,
  FaFileAlt,
  FaEdit,
  FaBan,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const [stats] = useState({
    traffic: 1520,
    users: 128,
  });

  const [usersList, setUsersList] = useState([
    { id: 1, name: "Jean Dupont", email: "jean@example.com", status: "Actif" },
    { id: 2, name: "Marie Claire", email: "marie@example.com", status: "Suspendu" },
  ]);

  // Sample data for articles, services, portfolio
  const [articles, setArticles] = useState([
    { id: 1, title: "Article 1", author: "Jean" },
    { id: 2, title: "Article 2", author: "Marie" },
  ]);
  const [services, setServices] = useState([
    { id: 1, name: "Service A", description: "Description A" },
  ]);
  const [portfolio, setPortfolio] = useState([
    { id: 1, project: "Portfolio X", client: "Client X" },
  ]);

  // Generic remove function by id and setter
  const handleRemove = (id, type) => {
    if (type === "article") setArticles((prev) => prev.filter((a) => a.id !== id));
    else if (type === "service") setServices((prev) => prev.filter((s) => s.id !== id));
    else if (type === "portfolio") setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  // Generic add function for demo (adds a dummy item)
  const handleAdd = (type) => {
    if (type === "article") {
      const newId = articles.length ? articles[articles.length - 1].id + 1 : 1;
      setArticles([...articles, { id: newId, title: `Article ${newId}`, author: "Nouveau" }]);
    } else if (type === "service") {
      const newId = services.length ? services[services.length - 1].id + 1 : 1;
      setServices([...services, { id: newId, name: `Service ${newId}`, description: "Nouveau" }]);
    } else if (type === "portfolio") {
      const newId = portfolio.length ? portfolio[portfolio.length - 1].id + 1 : 1;
      setPortfolio([...portfolio, { id: newId, project: `Projet ${newId}`, client: "Nouveau" }]);
    }
  };

  // Users suspend function as before
  const handleSuspend = (id) => {
    setUsersList((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Actif" ? "Suspendu" : "Actif" }
          : user
      )
    );
  };

  // Table renderers for each section
  const renderArticlesTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Articles</h2>
        <button
          onClick={() => handleAdd("article")}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 text-left">Titre</th>
            <th className="p-2 text-left">Auteur</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art) => (
            <tr key={art.id} className="hover:bg-gray-100 transition-colors">
              <td className="p-2">{art.title}</td>
              <td className="p-2">{art.author}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemove(art.id, "article")}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Retirer article"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderServicesTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Services</h2>
        <button
          onClick={() => handleAdd("service")}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((srv) => (
            <tr key={srv.id} className="hover:bg-gray-100 transition-colors">
              <td className="p-2">{srv.name}</td>
              <td className="p-2">{srv.description}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemove(srv.id, "service")}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Retirer service"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPortfolioTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Portfolio</h2>
        <button
          onClick={() => handleAdd("portfolio")}
          className="flex items-center gap-2 bg-orange-600 text-white px-3 py-2 rounded hover:bg-orange-700 transition"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 text-left">Projet</th>
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((p) => (
            <tr key={p.id} className="hover:bg-gray-100 transition-colors">
              <td className="p-2">{p.project}</td>
              <td className="p-2">{p.client}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemove(p.id, "portfolio")}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Retirer portfolio"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-15 lg:top-26 lg:bottom-16 w-64 h-[100vh] bg-blue-700 text-white transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 z-40 overflow-auto`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h1 className="text-lg sm:text-xl font-semibold">ATS Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300 transition-colors"
            aria-label="Fermer le menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-2 sm:gap-4">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-600 text-left transition-colors ${
              currentView === "dashboard" ? "bg-blue-800 font-semibold" : ""
            }`}
          >
            <FaTachometerAlt /> Tableau de bord
          </button>

          {/* Contenus dropdown */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 p-2">
              <FaFileAlt />
              <select
                value={["article", "service", "portfolio"].includes(currentView) ? currentView : ""}
                onChange={(e) => setCurrentView(e.target.value)}
                className="bg-blue-700 text-white border border-blue-500 rounded p-1 w-full cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Contenus navigation"
              >
                <option value="" disabled>
                  Contenus
                </option>
                <option value="article">Article</option>
                <option value="service">Service</option>
                <option value="portfolio">Portfolio</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setCurrentView("users")}
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-600 text-left transition-colors ${
              currentView === "users" ? "bg-blue-800 font-semibold" : ""
            }`}
          >
            <FaUsers /> Utilisateurs
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 mb-6 px-2 w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-blue-600 text-2xl"
            aria-label="Ouvrir le menu"
          >
            <FaBars />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-1">
            {currentView === "dashboard" && "Dashboard ATS"}
            {currentView === "article" && "Gestion des Articles"}
            {currentView === "service" && "Gestion des Services"}
            {currentView === "portfolio" && "Gestion du Portfolio"}
            {currentView === "users" && "Gestion des Utilisateurs"}
          </h1>
          <div className="w-8 lg:hidden" /> {/* spacer */}
        </div>

        {/* Content based on currentView */}
        {currentView === "dashboard" && (
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
        )}

        {currentView === "article" && renderArticlesTable()}
        {currentView === "service" && renderServicesTable()}
        {currentView === "portfolio" && renderPortfolioTable()}

        {currentView === "users" && (
          <div className="bg-white mx-2 shadow-lg rounded-xl p-4 sm:p-6 max-w-full overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
              👥 Gestion des utilisateurs
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[350px] sm:min-w-[500px] text-sm sm:text-base">
                <thead>
                  <tr className="text-gray-50 bg-gray-500">
                    <th className="px-4 py-3 text-left font-semibold">Nom</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Statut</th>
                    <th className="px-4 py-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          user.status === "Actif" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="px-4 py-3 text-center flex justify-center gap-3">
                        <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className={`p-2 rounded-full transition ${
                            user.status === "Actif"
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
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
        )}
      </main>
    </div>
  );
};

export default Dashboard;
