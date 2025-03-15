const express = require('express');
const productRoutes = require('./routes/productRoutes');
const products = require('../models/Product');



const app = express();
app.use(express.json());



// Define routes
// Example: app.use('/api/products', require('./routes/productRoutes'));

app.use('/api/products', productRoutes);
app.get('/', (req, res) => res.send('E-Commerce API is running'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;

