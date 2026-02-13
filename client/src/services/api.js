const API_URL = import.meta.env.VITE_API_URL || '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options.headers }
    });
    
    if (response.status === 401) {
      this.setToken(null);
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }

  auth = {
    login: (email, password) => this.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (userData) => this.request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    me: () => this.request('/auth/me'),
    agents: () => this.request('/auth/agents')
  };

  tickets = {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return this.request(`/tickets${query ? '?' + query : ''}`);
    },
    getById: (id) => this.request(`/tickets/${id}`),
    create: (ticketData) => this.request('/tickets', { method: 'POST', body: JSON.stringify(ticketData) }),
    update: (id, data) => this.request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => this.request(`/tickets/${id}`, { method: 'DELETE' })
  };

  messages = {
    getByTicketId: (ticketId, isPrivate = null) => {
      const params = isPrivate !== null ? `?isPrivate=${isPrivate}` : '';
      return this.request(`/messages/ticket/${ticketId}${params}`);
    },
    create: (data) => this.request('/messages', { method: 'POST', body: JSON.stringify(data) }),
    getCounts: (ticketId) => this.request(`/messages/counts/${ticketId}`)
  };
}

export default new ApiService();
