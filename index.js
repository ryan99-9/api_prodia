const express = require("express");
const app = express();
const port = 127;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(bodyParser.json());

// middleware folder upload
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Server running Api");
});
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://dev.myreport.tech",
  // domain
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Akses ditolak oleh kebijakan CORS"));
    }
  },
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// router
const usersRouter = require("./src/router/user");

// router path
app.use("/users/prodia", usersRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
