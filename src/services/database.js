// API service for connecting to backend
class DatabaseService {
  constructor() {
  this.baseURL = 'https://pim-pro-system-production.up.railway.app/api';
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.baseURL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getAttributeSets() {
    try {
      const response = await fetch(`${this.baseURL}/attribute-sets`);
      if (!response.ok) throw new Error('Failed to fetch attribute sets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching attribute sets:', error);
      return [];
    }
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/test`);
      const data = await response.json();
      console.log('API connection test:', data);
      return response.ok;
    } catch (error) {
      console.error('API connection failed:', error);
      return false;
    }
  }
}

export const db = new DatabaseService();