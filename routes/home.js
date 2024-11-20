const express = require("express");
const router = express.Router();

// GET Home Page
router.get("/home", (req, res) => {
  res.render("home", { title: "Welcome to Elif Cakmak's Blog" });
});

module.exports = router;