import express from "express"; 
import helmet, { contentSecurityPolicy } from "helmet"; 
import path from "path"; 
import { randomBytes } from "crypto"; 
import home from "./routes/home.js"; // Make sure to use .js extension with ES modules
import { json } from "express";

// Initialize the express app
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Explicitly set the views directory
app.set("views", path.join(__dirname, "views"));

// Use helmet to set security headers, including CSP
app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "https://vercel.live", 
        "https://trusted-cdn.com"
      ],
      styleSrc: [
        "'self'", 
        "https://trusted-styles.com",
      ],
      imgSrc: ["'self'", "https://trusted-images.com"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Express to serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(json()); 

// Redirect from the root to /home
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Use the routes for home
app.use("/home", home);  // This will use the home router defined in home.js

// Add a nonce for content security policy
app.use((req, res, next) => {
  res.locals.nonce = randomBytes(16).toString('base64');
  next();
});

// Start the server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening on port ${port}`));
