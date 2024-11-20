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

// Set the port for the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
