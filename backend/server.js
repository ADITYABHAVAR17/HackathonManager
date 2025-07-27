// File: backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const teamRoutes = require("./routes/teamRoute");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
require("./middleware/googleAuth"); // import Google strategy
const session = require("express-session"); // ✅ ADD THIS
const passport = require("passport");

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Hackathon Portal API");
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/auth", authRoutes);

app.use("/api/teams", teamRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));
