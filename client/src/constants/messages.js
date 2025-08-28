export const MESSAGES = {
  SUCCESS: {
    TRANSACTION_CREATED: 'Transaction created successfully',
    TRANSACTIONS_LOADED: 'Transactions loaded successfully'
  },
  ERROR: {
    FETCH_FAILED: 'Failed to fetch transactions',
    CREATE_FAILED: 'Failed to create transaction',
    CONNECTION_ERROR: 'Error connecting to server',
    VALIDATION_ERROR: 'Please check your input and try again'
  },
  VALIDATION: {
    AMOUNT_REQUIRED: 'Amount is required',
    AMOUNT_INVALID: 'Amount must be a valid number',
    AMOUNT_POSITIVE: 'Amount must be greater than 0',
    DESCRIPTION_REQUIRED: 'Description is required',
    DESCRIPTION_EMPTY: 'Description cannot be empty',
    FIELDS_REQUIRED: 'Please fill in all fields'
  }
};

export const API_ENDPOINTS = {
  TRANSACTIONS: '/api/transactions',
  HEALTH: '/api/health'
};
