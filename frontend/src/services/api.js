const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
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

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.setToken(null);
    }
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async getProducts() {
    const result = await this.request('/products');
    console.log('API getProducts result:', result);
    return result;
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async getDishes() {
    const result = await this.request('/dishes');
    console.log('API getDishes result:', result);
    return result;
  }

  async createDish(dishData) {
    return this.request('/dishes', {
      method: 'POST',
      body: JSON.stringify(dishData),
    });
  }

  async updateDish(id, dishData) {
    return this.request(`/dishes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dishData),
    });
  }

  async deleteDish(id) {
    return this.request(`/dishes/${id}`, {
      method: 'DELETE',
    });
  }

  async getUsers() {
    return this.request('/users');
  }

  async updateUserRole(id, roleId) {
    return this.request(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role_id: roleId }),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
