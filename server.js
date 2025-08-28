const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for transactions
let transactions = [];

// Routes
app.get('/api/transactions', (req, res) => {
  try {
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transactions' });
  }
});

app.post('/api/transactions', (req, res) => {
  try {
    const { amount, description } = req.body;
    
    // Validation
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount must be a positive number' 
      });
    }
    
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Description is required' 
      });
    }
    
    // Create transaction
    const transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description: description.trim(),
      timestamp: new Date().toISOString()
    };
    
    transactions.push(transaction);
    
    res.status(201).json({ 
      success: true, 
      data: transaction,
      message: 'Transaction created successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating transaction' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/transactions`);
  console.log(`  POST /api/transactions`);
});
