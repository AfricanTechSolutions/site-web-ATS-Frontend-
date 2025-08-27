import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaFileAlt,
  FaEdit,
  FaBan,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaPlus,
  FaTrash,
  FaSpinner,
  FaComment,
  FaCartPlus,
  FaArchive,
  FaFilePdf,
} from "react-icons/fa";
import apiService from "../Services/apiService.js";
import axios from "axios";

const ModalForm = React.memo(({ modalOpen, modalType, editItem, userForm, articleForm, serviceForm, realisationForm, temoignageForm, setModalOpen, setEditItem, handleUserFormChange, handleArticleFormChange, handleServiceFormChange, handleRealisationFormChange, handleTemoignageFormChange, handleSubmit, setUserForm, setArticleForm, setServiceForm, setRealisationForm, setTemoignageForm, loading }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editItem ? `Modifier ${modalType}` : `Ajouter ${modalType}`}
        </h2>
        {modalType === "user" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Nom d'utilisateur</label>
              <input
                type="text"
                value={userForm.username}
                onChange={(e) => handleUserFormChange('username', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={userForm.email}
                onChange={(e) => handleUserFormChange('email', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                value={userForm.password}
                onChange={(e) => handleUserFormChange('password', e.target.value)}
                className="w-full p-2 border rounded"
                required={!editItem}
              />
            </div>
          </div>
        )}
        {modalType === "article" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Titre</label>
              <input
                type="text"
                value={articleForm.titre}
                onChange={(e) => handleArticleFormChange('titre', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={articleForm.description}
                onChange={(e) => handleArticleFormChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        )}
        {modalType === "service" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Titre</label>
              <input
                type="text"
                value={serviceForm.titre}
                onChange={(e) => handleServiceFormChange('titre', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={serviceForm.description}
                onChange={(e) => handleServiceFormChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleServiceFormChange('img', e.target.files[0])}
                className="w-full p-2 border rounded"
              />
              <small className="text-gray-500 text-sm">Téléchargez une image pour ce service (optionnel)</small>
              {editItem && editItem.img && (
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">Image actuelle :</p>
                  <img
                    src={editItem.img}
                    alt="Image actuelle"
                    className="w-24 h-24 object-cover rounded mt-1"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {modalType === "portfolio" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Titre</label>
              <input
                type="text"
                value={realisationForm.titre}
                onChange={(e) => handleRealisationFormChange('titre', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={realisationForm.description}
                onChange={(e) => handleRealisationFormChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Client</label>
              <input
                type="text"
                value={realisationForm.client}
                onChange={(e) => handleRealisationFormChange('client', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Technologies</label>
              <input
                type="text"
                value={realisationForm.technologies_names}
                onChange={(e) => handleRealisationFormChange('technologies_names', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., React, Django, PostgreSQL"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleRealisationFormChange('img', e.target.files[0])}
                className="w-full p-2 border rounded"
              />
              <small className="text-gray-500 text-sm">Téléchargez une image pour ce projet (optionnel)</small>
              {editItem && editItem.img && (
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">Image actuelle :</p>
                  <img
                    src={editItem.img}
                    alt="Image actuelle"
                    className="w-24 h-24 object-cover rounded mt-1"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {modalType === "temoignage" && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                value={temoignageForm.nom}
                onChange={(e) => handleTemoignageFormChange('nom', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Contenu</label>
              <textarea
                value={temoignageForm.description}
                onChange={(e) => handleTemoignageFormChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setModalOpen(false);
              setEditItem(null);
              setUserForm({ username: "", email: "", password: "" });
              setArticleForm({ titre: "", description: "" });
              setServiceForm({ titre: "", description: "", img: null });
              setRealisationForm({ titre: "", description: "", client: "", technologies: "", img: null });
              setTemoignageForm({ nom: "", description: "" });
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={() => handleSubmit(modalType)}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editItem ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [stats, setStats] = useState({
    total_users: 0,
    total_articles: 0,
    total_services: 0,
    total_realisations: 0,
    total_temoignages: 0,
    recent_users: 0,
    active_users: 0,
    suspended_users: 0,
  });
  const [usersList, setUsersList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [temoignages, setTemoignages] = useState([]);
  const [candidatures, setCandidatures] = useState([]);

  const [userForm, setUserForm] = useState({ username: "", email: "", password: "" });
  const [articleForm, setArticleForm] = useState({ titre: "", description: "" });
  const [serviceForm, setServiceForm] = useState({ titre: "", description: "", img: null });
  const [realisationForm, setRealisationForm] = useState({ titre: "", description: "", client: "", technologies_names: [], img: null });
  const [temoignageForm, setTemoignageForm] = useState({ nom: "", description: "" });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (currentView === "dashboard") {
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard/stats/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setStats(response.data);
      } else if (currentView === "users") {
        const usersData = await apiService.getUsers();
        setUsersList(usersData);
      } else if (currentView === "article") {
        const articlesData = await apiService.getArticles();
        setArticles(articlesData);
      } else if (currentView === "service") {
        const servicesData = await apiService.getServices();
        setServices(servicesData);
      } else if (currentView === "portfolio") {
        const portfolioData = await apiService.getRealisations();
        setPortfolio(portfolioData);
      } else if (currentView === "temoignage") {
        const temoignagesData = await apiService.getTemoignages();
        setTemoignages(temoignagesData);
      }
        else if (currentView === "candidature") {
          const candidaturesData = await apiService.getCandidatures();
          setCandidatures(candidaturesData);
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }, [currentView]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await apiService.getCurrentUser();
        setCurrentUser(userData);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      }
    };

    fetchCurrentUser();
    loadData();
  }, [navigate, loadData]);

  const handleRemove = async (id, type) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer cet élément ?`)) return;

    try {
      setLoading(true);
      if (type === "article") {
        await apiService.deleteArticle(id);
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else if (type === "service") {
        await apiService.deleteService(id);
        setServices((prev) => prev.filter((s) => s.id !== id));
      } else if (type === "portfolio") {
        await apiService.deleteRealisation(id);
        setPortfolio((prev) => prev.filter((p) => p.id !== id));
      } else if (type === "temoignage") {
        await apiService.deleteTemoignage(id);
        setTemoignages((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (type) => {
    try {
      setLoading(true);
      let response;

      if (type === "user") {
        if (editItem) {
          response = await apiService.updateUser(editItem.id, userForm);
          setUsersList((prev) => prev.map((u) => (u.id === editItem.id ? response : u)));
        } else {
          response = await apiService.createUser(userForm);
          setUsersList((prev) => [response, ...prev]);
        }
        setUserForm({ username: "", email: "", password: "" });
      } else if (type === "article") {
        const data = { ...articleForm, auteur: currentUser?.id };
        if (editItem) {
          response = await apiService.updateArticle(editItem.id, data);
          setArticles((prev) => prev.map((a) => (a.id === editItem.id ? response : a)));
        } else {
          response = await apiService.createArticle(data);
          setArticles((prev) => [response, ...prev]);
        }
        setArticleForm({ titre: "", description: "" });
      } else if (type === "service") {
        const formData = new FormData();
        formData.append('titre', serviceForm.titre);
        formData.append('description', serviceForm.description);
        formData.append('auteur', currentUser?.id);
        if (serviceForm.img) {
          formData.append('img', serviceForm.img);
        }
        if (editItem) {
          response = await apiService.updateService(editItem.id, formData);
          setServices((prev) => prev.map((s) => (s.id === editItem.id ? response : s)));
        } else {
          response = await apiService.createService(formData);
          setServices((prev) => [response, ...prev]);
        }
        setServiceForm({ titre: "", description: "", img: null });
      } else if (type === "portfolio") {
        const formData = new FormData();
        formData.append('titre', realisationForm.titre);
        formData.append('description', realisationForm.description);
        formData.append('client', realisationForm.client);
        formData.append('technologies_names', realisationForm.technologies_names);
        formData.append('auteur', currentUser?.id);
        if (realisationForm.img) {
          formData.append('img', realisationForm.img);
        }
        if (editItem) {
          response = await apiService.updateRealisation(editItem.id, formData);
          setPortfolio((prev) => prev.map((p) => (p.id === editItem.id ? response : p)));
        } else {
          response = await apiService.createRealisation(formData);
          setPortfolio((prev) => [response, ...prev]);
        }
        setRealisationForm({ titre: "", description: "", client: "", technologies_names: [], img: null });
      } else if (type === "temoignage") {
        const data = { ...temoignageForm, auteur: currentUser?.id };
        if (editItem) {
          response = await apiService.updateTemoignage(editItem.id, data);
          setTemoignages((prev) => prev.map((t) => (t.id === editItem.id ? response : t)));
        } else {
          response = await apiService.createTemoignage(data);
          setTemoignages((prev) => [response, ...prev]);
        }
        setTemoignageForm({ nom: "", description: "" });
      }

      setModalOpen(false);
      setEditItem(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (userId) => {
    try {
      setLoading(true);
      const user = usersList.find((u) => u.id === userId);
      if (user.status === "Actif") {
        await apiService.suspendUser(userId);
      } else {
        await apiService.activateUser(userId);
      }
      setUsersList((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, status: user.status === "Actif" ? "Suspendu" : "Actif", is_active: user.status === "Actif" ? false : true }
            : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFormChange = useCallback((field, value) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleArticleFormChange = useCallback((field, value) => {
    setArticleForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleServiceFormChange = useCallback((field, value) => {
    setServiceForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRealisationFormChange = useCallback((field, value) => {
    setRealisationForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTemoignageFormChange = useCallback((field, value) => {
    setTemoignageForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    if (item) {
      if (type === "user") setUserForm({ username: item.username, email: item.email, password: "" });
      else if (type === "article") setArticleForm({ titre: item.titre, description: item.description });
      else if (type === "service") setServiceForm({ titre: item.titre, description: item.description, img: null });
      else if (type === "portfolio") setRealisationForm({ 
        titre: item.titre, 
        description: item.description, 
        client: item.client, 
        technologies_names: item.technologies_names,
        img: null
      });
      else if (type === "temoignage") setTemoignageForm({ nom: item.nom, description: item.description });
    }
    setModalOpen(true);
  };

  const ErrorMessage = ({ message }) => (
    <div className="bg-white border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong>Erreur:</strong> {message}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <FaSpinner className="animate-spin text-2xl md:text-4xl text-blue-500" />
      <span className="ml-2 md:text-xl">Chargement...</span>
    </div>
  );

  const renderCandidaturesTable = () => (
  <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg sm:text-xl font-bold">Candidatures</h2>
    </div>
    {loading && <LoadingSpinner />}
    {error && <ErrorMessage message={error} />}
    {!loading && !error && (
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-blue-500 text-gray-200">
            <th className="p-2 text-left">Utilisateur</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Mois de début</th>
            <th className="p-2 text-left">Date de création</th>
            <th className="p-2 text-left">CV</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((cand) => (
            <tr key={cand.id} className="odd:bg-white even:bg-blue-100 hover:bg-gray-100 transition-colors">
              <td className="p-2">{cand.user_username}</td>
              <td className="p-2">{cand.application_type}</td>
              <td className="p-2">{cand.application_type === 'stage' ? cand.start_month || '-' : '-'}</td>
              <td className="p-2">{new Date(cand.created_at).toLocaleDateString()}</td>
              <td className="p-2">
                {cand.cv ? (
                  <a
                    href={cand.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FaFilePdf /> Voir CV
                  </a>
                ) : (
                  <span className="text-gray-400 text-xs">Aucun CV</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

  const renderArticlesTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Articles</h2>
        <button
          onClick={() => openModal("article")}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-gray-200">
              <th className="p-2 text-left">Titre</th>
              <th className="p-2 text-left">Auteur</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((art) => (
              <tr key={art.id} className="odd:bg-white even:bg-blue-100 odd:hover:bg-gray-100 transition-colors odd:text-gray-800">
                <td className="p-2">{art.titre}</td>
                <td className="p-2">{art.auteur_username}</td>
                <td className="p-2">{new Date(art.heure_cree).toLocaleDateString()}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openModal("article", art)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    aria-label="Modifier article"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(art.id, "article")}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    aria-label="Supprimer article"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderServicesTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Services</h2>
        <button
          onClick={() => openModal("service")}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-gray-200">
              <th className="p-2 text-left">Titre</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Auteur</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((srv) => (
              <tr key={srv.id} className="odd:bg-white even:bg-blue-100 hover:bg-gray-100 transition-colors odd:text-gray-700">
                <td className="p-2">{srv.titre}</td>
                <td className="p-2">{srv.description}</td>
                <td className="p-2">
                  {srv.img ? (
                    <img 
                      src={srv.img} 
                      alt={srv.titre}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Aucune image</span>
                  )}
                </td>
                <td className="p-2">{srv.auteur_username}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openModal("service", srv)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    aria-label="Modifier service"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(srv.id, "service")}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    aria-label="Supprimer service"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderPortfolioTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Portfolio</h2>
        <button
          onClick={() => openModal("portfolio")}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-gray-200">
              <th className="p-2 text-left">Projet</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Technologies</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Auteur</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((p) => (
              <tr key={p.id} className="odd:bg-white even:bg-blue-100 odd:hover:bg-gray-100 transition-colors odd:text-gray-800">
                <td className="p-2">{p.titre}</td>
                <td className="p-2">{p.client}</td>
                <td className="p-2">{p.technologies_names}</td>
                <td className="p-2">
                  {p.img ? (
                    <img 
                      src={p.img} 
                      alt={p.titre}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Aucune image</span>
                  )}
                </td>
                <td className="p-2">{p.auteur_username}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openModal("portfolio", p)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    aria-label="Modifier portfolio"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(p.id, "portfolio")}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    aria-label="Supprimer portfolio"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderTemoignagesTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Témoignages</h2>
        <button
          onClick={() => openModal("temoignage")}
          disabled={loading}
          className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded hover:bg-teal-700 transition disabled:opacity-50"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-gray-200">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Contenu</th>
              <th className="p-2 text-left">Auteur</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {temoignages.map((tem) => (
              <tr key={tem.id} className="odd:bg-white even:bg-blue-100 odd:hover:bg-gray-100 transition-colors odd:text-gray-800">
                <td className="p-2">{tem.nom}</td>
                <td className="p-2">{tem.description}</td>
                <td className="p-2">{tem.auteur_username}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => openModal("temoignage", tem)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    aria-label="Modifier témoignage"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(tem.id, "temoignage")}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    aria-label="Supprimer témoignage"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderUsersTable = () => (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-full mx-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Utilisateurs</h2>
        <button
          onClick={() => openModal("user")}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-gray-200">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id} className="odd:bg-white even:bg-blue-100 hover:bg-gray-100 transition-colors odd:text-gray-700">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs sm:text-sm ${
                      user.status === "Actif" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleSuspend(user.id)}
                    disabled={loading}
                    className={`${
                      user.status === "Actif" ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-700"
                    } disabled:opacity-50`}
                    aria-label={user.status === "Actif" ? "Suspendre utilisateur" : "Activer utilisateur"}
                  >
                    <FaBan />
                  </button>
                  <button
                    onClick={() => openModal("user", user)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    aria-label="Modifier utilisateur"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <aside
        className={`fixed left-0 top-15 lg:top-0 lg:bottom-0 w-64 h-full bg-blue-700 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40 overflow-auto lg:top-25`}
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
          <div className="flex flex-col">
            <div className="flex items-center gap-3 p-2">
              <FaFileAlt />
              <select
                value={["article", "service", "portfolio", "temoignage", "candidature"].includes(currentView) ? currentView : ""}
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
                <option value="temoignage">Témoignage</option>
                <option value="candidature">Candidature</option>
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
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 overflow-auto">
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
            {currentView === "temoignage" && "Gestion des Témoignages"}
            {currentView === "candidature" && "Gestion des Candidatures"}
            {currentView === "users" && "Gestion des Utilisateurs"}
          </h1>
          <div className="w-8 lg:hidden" />
        </div>

        <ModalForm
          modalOpen={modalOpen}
          modalType={modalType}
          editItem={editItem}
          userForm={userForm}
          articleForm={articleForm}
          serviceForm={serviceForm}
          realisationForm={realisationForm}
          temoignageForm={temoignageForm}
          setModalOpen={setModalOpen}
          setEditItem={setEditItem}
          handleUserFormChange={handleUserFormChange}
          handleArticleFormChange={handleArticleFormChange}
          handleServiceFormChange={handleServiceFormChange}
          handleRealisationFormChange={handleRealisationFormChange}
          handleTemoignageFormChange={handleTemoignageFormChange}
          handleSubmit={handleSubmit}
          setUserForm={setUserForm}
          setArticleForm={setArticleForm}
          setServiceForm={setServiceForm}
          setRealisationForm={setRealisationForm}
          setTemoignageForm={setTemoignageForm}
          loading={loading}
        />

        {currentView === "dashboard" && (
          <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-blue-500">
                  <FaUsers className="text-blue-500 text-3xl" />
                  <div>
                    <p className="text-gray-500">Total Utilisateurs</p>
                    <h2 className="text-2xl font-bold">{stats.total_users}</h2>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-green-500">
                  <FaComment className="text-green-500 text-3xl" />
                  <div>
                    <p className="text-gray-500">Total temoingages</p>
                    <h2 className="text-2xl font-bold">{stats.total_temoignages}</h2>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-pink-500">
                  <FaArchive className="text-red-500/80 text-3xl" />
                  <div>
                    <p className="text-gray-500">Total realisations</p>
                    <h2 className="text-2xl font-bold">{stats.total_realisations}</h2>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-purple-500">
                  <FaFileAlt className="text-purple-500 text-3xl" />
                  <div>
                    <p className="text-gray-500">Total Articles</p>
                    <h2 className="text-2xl font-bold">{stats.total_articles}</h2>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-orange-500">
                  <FaComment className="text-orange-500 text-3xl" />
                  <div>
                    <p className="text-gray-500">Nouveaux utilisateurs</p>
                    <h2 className="text-2xl font-bold">{stats.recent_users}</h2>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-teal-500">
                  <FaCartPlus className="text-teal-500 text-3xl" />
                  <div>
                    <p className="text-gray-500">Total Services</p>
                    <h2 className="text-2xl font-bold">{stats.total_services}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === "article" && renderArticlesTable()}
        {currentView === "service" && renderServicesTable()}
        {currentView === "portfolio" && renderPortfolioTable()}
        {currentView === "temoignage" && renderTemoignagesTable()}
        {currentView === "candidature" && renderCandidaturesTable()}
        {currentView === "users" && renderUsersTable()}
      </main>
    </div>
  );
};

export default Dashboard;