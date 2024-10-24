// Import express
const express = require('express');

// Create an instance of express
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
