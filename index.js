const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (CSS, images, etc.) from the 'public' folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('index'); // This will render the 'views/index.ejs' file
});

// Export the app to be used by Vercel serverless functions
module.exports = app;
