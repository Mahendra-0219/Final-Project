const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname)));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/result.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
