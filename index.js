import express from "express"; // Import express
import helmet, { contentSecurityPolicy } from "helmet"; // Import helmet for security headers
import path from "path"; // Import path for directory management
import { randomBytes } from "crypto"; // Import crypto for generating a nonce
import home from "./routes/home"; // Import your home routes
import { json } from "express"; // Import express's json() middleware

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
      defaultSrc: ["'self'"], // Only allow resources from your site
      scriptSrc: [
        "'self'", // Allow scripts from your own domain
        "https://vercel.live", // Allow scripts from Vercel
        "https://trusted-cdn.com" // Add other trusted sources here as needed
      ],
      styleSrc: [
        "'self'", // Allow styles from your own domain
        "https://trusted-styles.com", // Add other trusted sources for styles if needed
      ],
      imgSrc: ["'self'", "https://trusted-images.com"], // Allow images from your domain and trusted sources
      fontSrc: ["'self'"], // Only fonts from your site
      connectSrc: ["'self'"], // Only connections from your site (e.g., AJAX requests)
      objectSrc: ["'none'"], // Disallow Flash and other plugins
      upgradeInsecureRequests: [], // Force all resources to be loaded over HTTPS
    },
  })
);

// Express to serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(json()); // Use the express.json() middleware to parse JSON bodies

// Redirect from the root to /home
app.get("/", (req, res) => {
  res.redirect("/home"); // Redirects visitors to the /home path
});

// Serve the home page
app.get("/home", (req, res) => {
  res.render("home", { title: "Elif Cakmak's Blog" }); // Passing title to EJS
});

// Use routes for home
app.use("/home", home);

// Add a nonce for content security policy
app.use((req, res, next) => {
  res.locals.nonce = randomBytes(16).toString('base64');
  next();
});

// Start the server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening on port ${port}`));