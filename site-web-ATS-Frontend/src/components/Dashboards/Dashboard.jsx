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
  FaSearch,
  FaFilter,
  FaDownload,
  FaBell,
  FaUserCircle,
  FaCog,
  FaChartLine,
  FaCalendar,
  FaEye,
  FaSignOutAlt,
} from "react-icons/fa";
import apiService from "../Services/apiService.js";
import axios from "axios";

const ModalForm = React.memo(({ modalOpen, modalType, editItem, userForm, articleForm, serviceForm, realisationForm, temoignageForm, setModalOpen, setEditItem, handleUserFormChange, handleArticleFormChange, handleServiceFormChange, handleRealisationFormChange, handleTemoignageFormChange, handleSubmit, setUserForm, setArticleForm, setServiceForm, setRealisationForm, setTemoignageForm, loading }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editItem ? `Modifier ${modalType}` : `Ajouter ${modalType}`}
            </h2>
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
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              aria-label="Fermer la modale"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {modalType === "user" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => handleUserFormChange('username', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Entrez le nom d'utilisateur"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => handleUserFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="exemple@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => handleUserFormChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required={!editItem}
                />
              </div>
            </div>
          )}

          {modalType === "article" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={articleForm.titre}
                  onChange={(e) => handleArticleFormChange('titre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Titre de l'article"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={articleForm.description}
                  onChange={(e) => handleArticleFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none h-32 resize-none"
                  placeholder="Description de l'article..."
                  required
                />
              </div>
            </div>
          )}

          {modalType === "service" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={serviceForm.titre}
                  onChange={(e) => handleServiceFormChange('titre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Nom du service"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => handleServiceFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none h-32 resize-none"
                  placeholder="Description du service..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleServiceFormChange('img', e.target.files[0])}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Formats acceptés: JPG, PNG, GIF (max 5MB)</p>
                {editItem && editItem.img && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image actuelle:</p>
                    <img
                      src={editItem.img}
                      alt="Image actuelle"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
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
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre du projet</label>
                <input
                  type="text"
                  value={realisationForm.titre}
                  onChange={(e) => handleRealisationFormChange('titre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Nom du projet"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={realisationForm.description}
                  onChange={(e) => handleRealisationFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none h-32 resize-none"
                  placeholder="Description du projet..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
                <input
                  type="text"
                  value={realisationForm.client}
                  onChange={(e) => handleRealisationFormChange('client', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Nom du client"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
                <input
                  type="text"
                  value={realisationForm.technologies_names}
                  onChange={(e) => handleRealisationFormChange('technologies_names', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="React, Django, PostgreSQL..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image du projet</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleRealisationFormChange('img', e.target.files[0])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {editItem && editItem.img && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image actuelle:</p>
                    <img
                      src={editItem.img}
                      alt="Image actuelle"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
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
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={temoignageForm.nom}
                  onChange={(e) => handleTemoignageFormChange('nom', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Nom de la personne"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Témoignage</label>
                <textarea
                  value={temoignageForm.description}
                  onChange={(e) => handleTemoignageFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none h-32 resize-none"
                  placeholder="Contenu du témoignage..."
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
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
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              aria-label="Annuler"
            >
              Annuler
            </button>
            <button
              onClick={() => handleSubmit(modalType)}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label={editItem ? "Modifier l'élément" : "Ajouter l'élément"}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Traitement...
                </>
              ) : (
                editItem ? "Modifier" : "Ajouter"
              )}
            </button>
          </div>
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
  const [searchTerm, setSearchTerm] = useState("");

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
      } else if (currentView === "candidature") {
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleUserFormChange = useCallback((field, value) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleArticleFormChange = useCallback((field, value) => {
    setArticleForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleServiceFormChange = useCallback((field, value) => {
    setServiceForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleRealisationFormChange = useCallback((field, value) => {
    setRealisationForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTemoignageFormChange = useCallback((field, value) => {
    setTemoignageForm((prev) => ({ ...prev, [field]: value }));
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
        img: null,
      });
      else if (type === "temoignage") setTemoignageForm({ nom: item.nom, description: item.description });
    }
    setModalOpen(true);
  };

  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">Erreur: {message}</p>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="ml-3 text-lg font-medium text-gray-700">Chargement...</span>
    </div>
  );

  const StatCard = ({ icon, title, value, color, trend }) => (
    <div
      className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-${color}-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 font-medium mt-1">
              <span className="inline-flex items-center">
                <FaChartLine className="w-3 h-3 mr-1" />
                +{trend}% ce mois
              </span>
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const TableHeader = ({ title, onAdd, addLabel, searchPlaceholder }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none w-full sm:w-64"
          />
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={addLabel}
          >
            <FaPlus className="w-4 h-4" />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );

  const ActionButton = ({ onClick, icon, className, label }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={label}
    >
      {icon}
    </button>
  );

  const renderCandidaturesTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader title="Candidatures" searchPlaceholder="Rechercher une candidature..." />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Utilisateur</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Mois de début</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">CV</th>
                </tr>
              </thead>
              <tbody>
                {candidatures
                  .filter(
                    (cand) =>
                      cand.user_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      cand.application_type?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((cand, index) => (
                    <tr
                      key={cand.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{cand.user_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            cand.application_type === "stage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {cand.application_type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {cand.application_type === "stage" ? cand.start_month || "-" : "-"}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="w-3 h-3" />
                          {new Date(cand.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {cand.cv ? (
                          <a
                            href={cand.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                            aria-label="Voir le CV"
                          >
                            <FaFilePdf className="w-4 h-4" />
                            Voir CV
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">Aucun CV</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderArticlesTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader
          title="Articles"
          onAdd={() => openModal("article")}
          addLabel="Nouvel Article"
          searchPlaceholder="Rechercher un article..."
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Titre</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Auteur</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles
                  .filter(
                    (art) =>
                      art.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      art.auteur_username?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((art, index) => (
                    <tr
                      key={art.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{art.titre}</div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">{art.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-3 h-3 text-purple-600" />
                          </div>
                          <span className="text-gray-700">{art.auteur_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="w-3 h-3" />
                          {new Date(art.heure_cree).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => openModal("article", art)}
                            icon={<FaEdit className="w-4 h-4" />}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            label="Modifier article"
                          />
                          <ActionButton
                            onClick={() => handleRemove(art.id, "article")}
                            icon={<FaTrash className="w-4 h-4" />}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            label="Supprimer article"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderServicesTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader
          title="Services"
          onAdd={() => openModal("service")}
          addLabel="Nouveau Service"
          searchPlaceholder="Rechercher un service..."
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Service</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Description</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Auteur</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services
                  .filter(
                    (srv) =>
                      srv.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      srv.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((srv, index) => (
                    <tr
                      key={srv.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {srv.img ? (
                            <img
                              src={srv.img}
                              alt={srv.titre}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                              <FaCartPlus className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{srv.titre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">{srv.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{srv.auteur_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => openModal("service", srv)}
                            icon={<FaEdit className="w-4 h-4" />}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            label="Modifier service"
                          />
                          <ActionButton
                            onClick={() => handleRemove(srv.id, "service")}
                            icon={<FaTrash className="w-4 h-4" />}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            label="Supprimer service"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderPortfolioTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader
          title="Portfolio"
          onAdd={() => openModal("portfolio")}
          addLabel="Nouveau Projet"
          searchPlaceholder="Rechercher un projet..."
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Projet</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Technologies</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Auteur</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio
                  .filter(
                    (p) =>
                      p.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.technologies_names?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p, index) => (
                    <tr
                      key={p.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {p.img ? (
                            <img
                              src={p.img}
                              alt={p.titre}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                              <FaArchive className="w-6 h-6 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{p.titre}</div>
                            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{p.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {p.client}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">{p.technologies_names}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-3 h-3 text-purple-600" />
                          </div>
                          <span className="text-gray-700">{p.auteur_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => openModal("portfolio", p)}
                            icon={<FaEdit className="w-4 h-4" />}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            label="Modifier projet"
                          />
                          <ActionButton
                            onClick={() => handleRemove(p.id, "portfolio")}
                            icon={<FaTrash className="w-4 h-4" />}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            label="Supprimer projet"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderTemoignagesTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader
          title="Témoignages"
          onAdd={() => openModal("temoignage")}
          addLabel="Nouveau Témoignage"
          searchPlaceholder="Rechercher un témoignage..."
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Personne</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Témoignage</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Auteur</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {temoignages
                  .filter(
                    (tem) =>
                      tem.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      tem.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((tem, index) => (
                    <tr
                      key={tem.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <FaComment className="w-5 h-5 text-teal-600" />
                          </div>
                          <span className="font-medium text-gray-900">{tem.nom}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-md">{tem.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                            <FaUserCircle className="w-3 h-3 text-teal-600" />
                          </div>
                          <span className="text-gray-700">{tem.auteur_username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => openModal("temoignage", tem)}
                            icon={<FaEdit className="w-4 h-4" />}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            label="Modifier témoignage"
                          />
                          <ActionButton
                            onClick={() => handleRemove(tem.id, "temoignage")}
                            icon={<FaTrash className="w-4 h-4" />}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            label="Supprimer témoignage"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderUsersTable = () => (
    <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <TableHeader
          title="Utilisateurs"
          onAdd={() => openModal("user")}
          addLabel="Nouvel Utilisateur"
          searchPlaceholder="Rechercher un utilisateur..."
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Utilisateur</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList
                  .filter(
                    (user) =>
                      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{user.email}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            user.status === "Actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <ActionButton
                            onClick={() => handleSuspend(user.id)}
                            icon={<FaBan className="w-4 h-4" />}
                            className={`${
                              user.status === "Actif"
                                ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                                : "text-green-600 hover:bg-green-50 hover:text-green-700"
                            }`}
                            label={user.status === "Actif" ? "Suspendre utilisateur" : "Activer utilisateur"}
                          />
                          <ActionButton
                            onClick={() => openModal("user", user)}
                            icon={<FaEdit className="w-4 h-4" />}
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            label="Modifier utilisateur"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.1) 10px,
              transparent 10px,
              transparent 20px
            )
          `,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                Bienvenue, {currentUser?.username || "Administrateur"}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Gérez vos contenus et utilisateurs depuis ce tableau de bord
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <FaUserCircle className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers className="w-6 h-6" />}
          title="Utilisateurs"
          value={stats.total_users}
          color="blue"
          trend={stats.recent_users}
        />
        <StatCard
          icon={<FaFileAlt className="w-6 h-6" />}
          title="Articles"
          value={stats.total_articles}
          color="purple"
        />
        <StatCard
          icon={<FaCartPlus className="w-6 h-6" />}
          title="Services"
          value={stats.total_services}
          color="green"
        />
        <StatCard
          icon={<FaArchive className="w-6 h-6" />}
          title="Projets"
          value={stats.total_realisations}
          color="indigo"
        />
        <StatCard
          icon={<FaComment className="w-6 h-6" />}
          title="Témoignages"
          value={stats.total_temoignages}
          color="teal"
        />
        <StatCard
          icon={<FaUsers className="w-6 h-6" />}
          title="Utilisateurs Actifs"
          value={stats.active_users}
          color="cyan"
        />
        <StatCard
          icon={<FaBan className="w-6 h-6" />}
          title="Utilisateurs Suspendus"
          value={stats.suspended_users}
          color="red"
        />
        <StatCard
          icon={<FaFilePdf className="w-6 h-6" />}
          title="Candidatures"
          value={stats.total_candidatures || 0} // Assuming API might return this
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Ajouter un Article", type: "article", icon: FaFileAlt },
            { label: "Ajouter un Service", type: "service", icon: FaCartPlus },
            { label: "Ajouter un Projet", type: "portfolio", icon: FaArchive },
            { label: "Ajouter un Témoignage", type: "temoignage", icon: FaComment },
          ].map(({ label, type, icon: Icon }) => (
            <button
              key={type}
              onClick={() => openModal(type)}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-72 h-full bg-white/90 backdrop-blur-sm shadow-2xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50 border-r border-gray-100`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FaTachometerAlt className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              ATS Admin
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer la barre latérale"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
              currentView === "dashboard"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            aria-label="Tableau de bord"
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span className="font-medium">Tableau de bord</span>
          </button>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Contenus</p>
            {[
              { key: "article", label: "Articles", icon: FaFileAlt },
              { key: "service", label: "Services", icon: FaCartPlus },
              { key: "portfolio", label: "Portfolio", icon: FaArchive },
              { key: "temoignage", label: "Témoignages", icon: FaComment },
              { key: "candidature", label: "Candidatures", icon: FaUsers },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                  currentView === key
                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Compte</p>
            <button
              onClick={() => navigate("/profile")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                currentView === "profile"
                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Profil"
            >
              <FaUserCircle className="w-5 h-5" />
              <span className="font-medium">Profil</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-200"
              aria-label="Déconnexion"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Ouvrir la barre latérale"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Profil utilisateur"
              >
                <FaUserCircle className="w-6 h-6" />
                <span className="font-medium text-gray-900">{currentUser?.username || "Utilisateur"}</span>
              </button>
            </div>
          </div>

          {/* Content */}
          {currentView === "dashboard" && renderDashboard()}
          {currentView === "users" && renderUsersTable()}
          {currentView === "article" && renderArticlesTable()}
          {currentView === "service" && renderServicesTable()}
          {currentView === "portfolio" && renderPortfolioTable()}
          {currentView === "temoignage" && renderTemoignagesTable()}
          {currentView === "candidature" && renderCandidaturesTable()}
        </div>

        {/* Modal */}
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
      </main>
    </div>
  );
};

export default Dashboard;