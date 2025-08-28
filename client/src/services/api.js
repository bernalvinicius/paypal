import { API_CONFIG } from '../config/api';
import { MESSAGES, API_ENDPOINTS } from '../constants/messages';

const API_BASE_URL = API_CONFIG.BASE_URL;

export const transactionService = {
  // Fetch all transactions
  async fetchTransactions() {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TRANSACTIONS}`);
      const result = await response.json();
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: MESSAGES.ERROR.FETCH_FAILED };
      }
    } catch (err) {
      return { success: false, message: MESSAGES.ERROR.CONNECTION_ERROR };
    }
  },

  // Create a new transaction
  async createTransaction(transactionData) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TRANSACTIONS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { success: true, data: result.data, message: result.message };
      } else {
        return { success: false, message: result.message || MESSAGES.ERROR.CREATE_FAILED };
      }
    } catch (err) {
      return { success: false, message: MESSAGES.ERROR.CONNECTION_ERROR };
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HEALTH}`);
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: 'Health check failed' };
    }
  }
};
