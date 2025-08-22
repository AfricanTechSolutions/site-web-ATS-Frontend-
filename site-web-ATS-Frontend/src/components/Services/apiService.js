import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust to your Django backend URL

// Add JWT token to all requests if available
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const apiService = {
  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch dashboard stats' };
    }
  },

  // User Operations
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch users' };
    }
  },
  createUser: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create user' };
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update user' };
    }
  },
  suspendUser: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${id}/suspend/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to suspend user' };
    }
  },
  activateUser: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${id}/activate/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to activate user' };
    }
  },

  // Article Operations
  getArticles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch articles' };
    }
  },
  createArticle: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/articles/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create article' };
    }
  },
  updateArticle: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/articles/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update article' };
    }
  },
  deleteArticle: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/articles/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to delete article' };
    }
  },

  // Service Operations
  getServices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch services' };
    }
  },
  createService: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/services/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create service' };
    }
  },
  updateService: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/services/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update service' };
    }
  },
  deleteService: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/services/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to delete service' };
    }
  },

  // Realisation Operations
  getRealisations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/realisations/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch realisations' };
    }
  },
  createRealisation: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/realisations/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create realisation' };
    }
  },
  updateRealisation: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/realisations/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update realisation' };
    }
  },
  deleteRealisation: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/realisations/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to delete realisation' };
    }
  },

  // Temoignage Operations
  getTemoignages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temoignages/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch temoignages' };
    }
  },
  createTemoignage: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/temoignages/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create temoignage' };
    }
  },
  updateTemoignage: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/temoignages/${id}/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update temoignage' };
    }
  },
  deleteTemoignage: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/temoignages/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to delete temoignage' };
    }
  },

  // Authentication
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Login failed' };
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/current-user/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch current user' };
    }
  },
  createCandidature: async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/candidatures/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to create candidature' };
  }
},
};

export default apiService;