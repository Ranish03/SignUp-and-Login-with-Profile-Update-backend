const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const path = require('path'); // Add this line to import the 'path' module

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual URI)
const dbURI = 'mongodb+srv://ranish:Sist*thrisha123@cluster0.2q74njn.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');

// Access your secret key from the configuration
const secretKey = config.secretKey;

// Use your secret key in JWT functions
const token = jwt.sign({ /* your payload here */ }, secretKey);
const decoded = jwt.verify(token, secretKey);

// Serve your API routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/profile', profileRoute);

// Serve your static frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle other routes by serving the index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});