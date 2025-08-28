import { useState } from 'react';
import { validateAmount, validateDescription } from '../utils/validation';

export const useTransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: ''
  });
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const amountValidation = validateAmount(formData.amount);
    if (!amountValidation.isValid) {
      return amountValidation;
    }
    
    const descriptionValidation = validateDescription(formData.description);
    if (!descriptionValidation.isValid) {
      return descriptionValidation;
    }
    
    return { isValid: true };
  };

  const resetForm = () => {
    setFormData({ amount: '', description: '' });
    setSuccess('');
  };

  const setSuccessMessage = (message) => {
    setSuccess(message);
  };

  const clearSuccess = () => {
    setSuccess('');
  };

  return {
    formData,
    success,
    handleInputChange,
    validateForm,
    resetForm,
    setSuccessMessage,
    clearSuccess
  };
};
