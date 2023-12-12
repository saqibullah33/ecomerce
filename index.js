// index.js

const express = require('express');
const app = express();

// Middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  // Simulated authentication (In reality, this would involve user authentication logic)
  const isLoggedIn = true; // Assume the user is authenticated
  if (isLoggedIn) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

// Import route files
const ecommerceRoutes = require('./routes/ecommerceRoutes');
const passwordStrengthRoutes = require('./routes/passwordStrengthRoutes');

// Mount routes
app.use('/ecommerce', authenticateUser, ecommerceRoutes);
app.use('/password', passwordStrengthRoutes);

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (req, res) =>{
  res.json({
    1:"To Check your password stength go to (/password/check-password )",
    2: "for product go to (/ecommerce/products)",
    3: "for single product go to (/ecommerce/products/:id)",
    4: "for login go to (/ecommerce/login)",
  });
});



// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
