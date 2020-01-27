const { getUserByProperty } = require("../auth/model.js");

module.exports = { validateUserPermissions };

/**
 * checks to see if that id exists in database
 * also checks if that id is the same user that is logged in.
 */
function validateUserPermissions(req, res, next) {
  const id = req.params.user_id;

  getUserByProperty(id)
    .then(user => {
      if (!user) res.status(400).json({ message: "That user does not exist." });
      else if (user.username !== req.session.username)
        res
          .status(401)
          .json({ message: "User does not have permission to do that." });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        message:
          "Sorry. Something went wrong in getting user by id. In validateUserPermissions",
        error: err,
        error_message: err.message
      })
    );
}
