// Import packages
const express = require("express");
const helmet = require("helmet"); // Import helmet for security headers
const home = require("./routes/home");

// Middlewares
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Use helmet to set security headers, including CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Only allow resources from your site
      scriptSrc: ["'self'"], // Only scripts from your site
      styleSrc: ["'self'"], // Only styles from your site
      imgSrc: ["'self'"], // Only images from your site
      fontSrc: ["'self'"], // Only fonts from your site
      connectSrc: ["'self'"], // Only connections from your site (e.g., AJAX requests)
      objectSrc: ["'none'"], // Disallow Flash and other plugins
      upgradeInsecureRequests: [], // Force all resources to be loaded over HTTPS
    },
  })
);

//Express to serve Static Files
app.use(express.static('public'));

// Body parsing middleware
app.use(express.json());

// Redirect from the root to /home
app.get("/", (req, res) => {
  res.redirect("/home"); // Redirects visitors to the /home path
});

// Serve the home page
app.get("/home", (req, res) => {
  res.render("home", { title: "Elif Cakmak's Blog" }); // Passing title to EJS
});

// Routes
app.use("/home", home);

// Connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening on port ${port}`));

