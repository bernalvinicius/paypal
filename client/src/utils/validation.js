import { MESSAGES } from '../constants/messages';

export const validationRules = {
  amount: {
    required: true,
    min: 0.01,
    type: 'number'
  },
  description: {
    required: true,
    minLength: 1,
    type: 'string'
  }
};

export const validateAmount = (amount) => {
  if (!amount) {
    return { isValid: false, message: MESSAGES.VALIDATION.AMOUNT_REQUIRED };
  }
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return { isValid: false, message: MESSAGES.VALIDATION.AMOUNT_INVALID };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, message: MESSAGES.VALIDATION.AMOUNT_POSITIVE };
  }
  
  return { isValid: true, value: numAmount };
};

export const validateDescription = (description) => {
  if (!description) {
    return { isValid: false, message: MESSAGES.VALIDATION.DESCRIPTION_REQUIRED };
  }
  
  if (typeof description !== 'string') {
    return { isValid: false, message: MESSAGES.VALIDATION.DESCRIPTION_EMPTY };
  }
  
  if (description.trim().length === 0) {
    return { isValid: false, message: MESSAGES.VALIDATION.DESCRIPTION_EMPTY };
  }
  
  return { isValid: true, value: description.trim() };
};
