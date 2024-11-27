import express from "express";
const router = express.Router();

// GET Home Page
router.get("/", (req, res) => {
  res.render("home", { title: "Welcome to Elif Cakmak's Blog" });
});

export default router;
