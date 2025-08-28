import React from 'react';
import './App.css';
import { useTransactions, useTransactionForm } from './hooks';
import { formatCurrency, formatDate } from './utils';

function App() {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    setError
  } = useTransactions();

  const {
    formData,
    success,
    handleInputChange,
    validateForm,
    resetForm,
    setSuccessMessage,
    clearSuccess
  } = useTransactionForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    clearSuccess();
    
    // Validation
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }
    
    const amount = parseFloat(formData.amount);
    const result = await createTransaction({
      amount: amount,
      description: formData.description.trim()
    });
    
    if (result.success) {
      setSuccessMessage(result.message);
      resetForm();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Transaction App</h1>
          <p>Submit and manage your monetary transactions</p>
        </div>
        
        <div className="content">
          {/* Form Section */}
          <div className="form-section">
            <h2>Submit New Transaction</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Transaction Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Transaction Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter transaction description..."
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Transaction'}
              </button>
            </form>
          </div>
          
          {/* Transactions Section */}
          <div className="transactions-section">
            <h2>Transaction History</h2>
            
            {loading && <div className="loading">Loading transactions...</div>}
            
            {!loading && transactions.length === 0 && (
              <div className="no-transactions">
                No transactions found. Submit your first transaction above!
              </div>
            )}
            
            {!loading && transactions.length > 0 && (
              <div>
                {transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-header">
                      <div className="transaction-amount">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="transaction-id">
                        ID: {transaction.id}
                      </div>
                    </div>
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-timestamp">
                      {formatDate(transaction.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
