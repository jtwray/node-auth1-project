const express = require("express");
// hides what packages we're using.
const helmet = require("helmet");
// For Stretch
const cors = require("cors");
// really awesome logger, check it out on npm https://www.npmjs.com/package/morgan
const morgan = require("morgan");

// Tuesday's MVP
const session = require("express-session");

// importing routes
const AuthRouter = require("./auth/route.js");
const UsersRouter = require("./users/route.js");

const server = express();

// 12 - 22 is for Tuesday's MVP.
const sessionConfig = {
  name: "shortbreadalmondcookies",
  secret: process.env.SESSION_SECRET || "happybirthdayfrosty",
  cookie: {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

// all needed for MVP
server.use(helmet()); // protecting what packages we're using
// Global middleware
server.use(session(sessionConfig)); // for Tuesday's with sessions and cookies -- not recommended for build week.
server.use(express.json());
server.use(cors()); // needed for React App stretch.
server.use(morgan("dev"));

// test route -- has to be before restricted middleware.
server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Server is up and running</h1><p>Try hitting '/api/auth/register' next!</p>`
    );
});

// delcaring routes with middleware
server.use("/api/auth", AuthRouter);
server.use("/api/users", UsersRouter);

module.exports = server;
