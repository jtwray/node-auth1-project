const express = require("express");
// hides what packages we're using.
const helmet = require("helmet");
// For Stretch
const cors = require("cors");
// really awesome logger, check it out on npm https://www.npmjs.com/package/morgan
const morgan = require("morgan");

// Tuesday's MVP
const session = require("express-session");
// stretch
const KnexSessionStore = require("connect-session-knex")(session);

const dbConnection = require("./dbConfig.js");

// importing custom middleware
const { restricted } = require("./auth/middleware.js");

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
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000
  })
};

// all needed for MVP
server.use(helmet()); // protecting what packages we're using
// Global middleware
server.use(
  cors({
    credentials: true, // accept and send cookies to those cors requests
    origin: "http://localhost:3000" // normally set to * for anyone to make a request || set a spefic domain for cookies.
    // with this config we also need to have FE set up axios calls with
    // { withCredentials: true }  -- any request you want cookies to have access to.
  })
); // needed for React App stretch.
server.use(session(sessionConfig)); // for Tuesday's with sessions and cookies -- not recommended for build week.
server.use(express.json());
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
server.use(restricted);
server.use("/api/users", UsersRouter);

module.exports = server;
