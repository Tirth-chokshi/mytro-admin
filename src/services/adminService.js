const API_URL = 'http://localhost:8000';

export const adminService = {
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch admin profile');
      }
      console.log(response.json())
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Optional: Call logout endpoint if you need to invalidate token on server
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if server call fails
      localStorage.removeItem('token');
    }
  }
};