import { useState, useEffect } from 'react';
import { transactionService } from '../services/api';
import { MESSAGES } from '../constants/messages';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await transactionService.fetchTransactions();
      
      if (result.success) {
        setTransactions(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(MESSAGES.ERROR.CONNECTION_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      setLoading(true);
      setError('');
      
      const result = await transactionService.createTransaction(transactionData);
      
      if (result.success) {
        // Refresh transactions list after successful creation
        await fetchTransactions();
        return { success: true, message: result.message };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      const errorMessage = MESSAGES.ERROR.CREATE_FAILED;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    setError
  };
};
