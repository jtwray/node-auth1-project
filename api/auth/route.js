const router = require("express").Router();
const bcrypt = require("bcryptjs");

// database functions
const { getUserByProperty, getUserBy, addUser } = require("./model.js");

// middleware
const { registerReq, loginReq, uniqueUserReg } = require("./middleware.js");

router.post("/register", registerReq, uniqueUserReg, (req, res) => {
  const newUser = {
    ...req.body, // passing in other req.body requirements.
    password: bcrypt.hashSync(req.body.password, 12) // hashing password before it's added to database.
  };

  addUser(newUser)
    .then(user => res.status(201).json(user))
    .catch(err =>
      res.status(500).json({
        message: "Sorry. Something went wrong in registering that user.",
        error: err,
        error_message: err.message
      })
    );
});

router.post("/login", loginReq, (req, res) => {
  let { username, password } = req.body;

  getUserBy({ username })
    .then(user => {
      // middleware to check if user logged in successfully MVP requirement.
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username; // Tuesday's MVP setting session of user.
        return res.status(200).json({
          message: `Logged in ${user.username}`,
          username: req.session.username
        });
      } else res.status(401).json({ message: "You shall not pass." });
    })
    .catch(err =>
      res.status(500).json({
        message: "Sorry. Something went wrong in logging that user.",
        error: err,
        error_message: err.message
      })
    );
});

// Tuesday's project. Destroying session on log out, otherwise it expires after the maxAge of sessionConfig.
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "logged out" });
});

module.exports = router;
