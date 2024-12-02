const API_URL = 'http://localhost:8000/auth';

export const authService = {
  async register(userData) {
    try {
      
      const formData = new FormData();
      
      // Add user data
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      
      // Add profile image if it exists
      if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
      }
      
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};