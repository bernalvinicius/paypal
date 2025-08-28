# PayPal Assessment - Transaction App

A simple web application that allows users to submit and manage monetary transactions. Built with React frontend and Node.js/Express backend.

## Why?

This project is part of the selection process for [PayPal](https://www.paypal.com/br/home). It involves developing a frontend and backend application transaction app using ReactJS and TypeScript.

![Application Screenshots](https://i.imgur.com/UCk6dht.png)

## Features

- **Frontend (React)**: Modern, responsive UI with form validation
- **Backend (Node.js + Express)**: RESTful API with in-memory storage
- **Transaction Management**: Submit, view, and track monetary transactions
- **Real-time Updates**: Automatic refresh of transaction list after submission
- **Error Handling**: Graceful error handling and user feedback
- **Responsive Design**: Mobile-friendly interface
- **Modular Architecture**: Clean separation of concerns with custom hooks and services

## Tech Stack

- **Frontend**: React 18, CSS3 with modern design
- **Backend**: Node.js, Express.js
- **Storage**: In-memory array (no database required)
- **Styling**: Custom CSS with gradients and animations
- **Architecture**: Custom hooks, services, and utility functions

## Project Structure

```
transaction-app/
├── package.json             # Main project configuration
├── server.js                # Express server with API endpoints
├── test.js                  # Simple API testing script
├── README.md                # This file
├── start-app.sh             # Startup script
└── client/                  # React frontend
    ├── package.json         # React dependencies
    ├── public/              # Static files
    │   └── index.html       # Main HTML file
    └── src/                 # React source code
        ├── config/          # Configuration files
        │   └── api.js       # API configuration
        ├── constants/       # Application constants
        │   └── messages.js  # Success/error messages
        ├── hooks/           # Custom React hooks
        │   ├── index.js     # Hooks exports
        │   ├── useTransactions.js    # Transaction management
        │   └── useTransactionForm.js # Form management
        ├── services/        # API services
        │   ├── index.js     # Services exports
        │   └── api.js       # Transaction API service
        ├── utils/           # Utility functions
        │   ├── index.js     # Utils exports
        │   ├── formatters.js # Currency and date formatting
        │   └── validation.js # Input validation
        ├── App.js           # Main React component
        ├── App.css          # Component-specific styles
        ├── index.js         # React entry point
        └── index.css        # Global styles
```

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install all dependencies** (both backend and frontend):
   ```bash
   npm run install-all
   ```

   Or install separately:
   ```bash
   # Install backend dependencies
   npm run install-server
   
   # Install frontend dependencies
   npm run install-client
   ```

### Running the Application

#### Option 1: Manual Execution

1. **Start the backend server** (in one terminal):
   ```bash
   npm run dev
   ```
   The server will start on port 3001

2. **Start the React frontend** (in another terminal):
   ```bash
   npm run client
   ```
   The React app will open in your browser at http://localhost:3000

#### Option 2: Automatic Startup Script

```bash
# Make the script executable
chmod +x start-app.sh

# Run the startup script
./start-app.sh
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health check**: http://localhost:3001/api/health
- **API endpoints**: http://localhost:3001/api/transactions

## API Endpoints

All endpoints are available at `http://localhost:3001/api/`

### GET /api/transactions
Retrieves all transactions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "amount": 99.99,
      "description": "Test transaction",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### POST /api/transactions
Creates a new transaction.

**Request Body:**
```json
{
  "amount": 99.99,
  "description": "Transaction description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "amount": 99.99,
    "description": "Transaction description",
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  "message": "Transaction created successfully"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Testing

### Manual Testing
1. Open the application in your browser
2. Submit a transaction with valid data
3. Verify the transaction appears in the list
4. Test form validation with invalid inputs

### API Testing
Run the included test script to verify API functionality:

```bash
# Install node-fetch if not available
npm install node-fetch

# Run tests
node test.js
```

The test script will:
- Check server health
- Test transaction creation
- Verify validation rules
- Test error handling

**Note**: Make sure the server is running on port 3001 before running the tests.

## Features in Detail

### Frontend Features
- **Responsive Form**: Input validation and error handling
- **Real-time Updates**: Automatic refresh after submission
- **Modern UI**: Gradient backgrounds, smooth animations
- **Mobile Friendly**: Responsive design for all screen sizes
- **Modular Components**: Clean separation of concerns

### Backend Features
- **Input Validation**: Amount must be positive, description required
- **Error Handling**: Graceful error responses with meaningful messages
- **CORS Support**: Cross-origin requests enabled
- **In-memory Storage**: No database setup required

### Architecture Features
- **Custom Hooks**: Reusable logic for transactions and forms
- **Service Layer**: Centralized API communication
- **Utility Functions**: Formatters and validation helpers
- **Configuration Management**: Environment-based settings
- **Constants Management**: Centralized messages and endpoints

### Validation Rules
- **Amount**: Must be a positive number greater than 0
- **Description**: Required, cannot be empty or whitespace only
- **Data Types**: Automatic type conversion and validation

## Troubleshooting

### Common Issues

1. **Port already in use**:
   - Change the port in `server.js` (line 7)
   - Kill processes using the port: `lsof -ti:3001 | xargs kill -9`

2. **CORS errors**:
   - Ensure the backend is running on port 3001
   - Check that the proxy setting in `client/package.json` is correct

3. **Frontend not connecting to backend**:
   - Verify both servers are running
   - Check browser console for error messages
   - Ensure the proxy configuration is correct

### Development Commands

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run frontend only
npm run client
```

## Development Guide

### Project Architecture

The application follows a modular architecture pattern:

- **Hooks** (`/client/src/hooks/`): Custom React hooks for state management
- **Services** (`/client/src/services/`): API communication layer
- **Utils** (`/client/src/utils/`): Helper functions and validations
- **Config** (`/client/src/config/`): Application configuration
- **Constants** (`/client/src/constants/`): Application constants and messages

### Adding New Features

1. **New API endpoints**: Add to `services/api.js`
2. **New hooks**: Create in `hooks/` directory
3. **New utilities**: Add to `utils/` directory
4. **New constants**: Update `constants/messages.js`

### Code Organization

- Keep components focused on UI rendering
- Move business logic to custom hooks
- Centralize API calls in services
- Use utility functions for reusable logic
- Maintain consistent error handling patterns

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- User authentication and authorization
- Transaction categories and tags
- Export functionality (CSV, PDF)
- Advanced filtering and search
- Real-time notifications

## License

MIT License - feel free to use this project for learning and development purposes.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Verify all dependencies are installed correctly
3. Ensure both frontend and backend are running
4. Check the browser console and server logs for error messages
5. Verify the API is accessible at http://localhost:3001/api/health
6. Check that the proxy configuration in `client/package.json` points to port 3001

### Getting Help

- **API Issues**: Check server logs and test endpoints with curl
- **Frontend Issues**: Check browser console and React DevTools
- **Build Issues**: Clear node_modules and reinstall dependencies
- **Port Conflicts**: Use `lsof -ti:3001` to find conflicting processes
