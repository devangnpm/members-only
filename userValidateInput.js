const { body, validationResult } = require("express-validator");

function userValidateInput() {
  return [
    // Validate and sanitize input
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required."),
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required."),
    body("username")
      .trim()
      .isEmail()
      .withMessage("Username must be a valid email."),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long."),
    // Middleware to handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next(); // Call next() to pass control to the next middleware
    },
  ];
}

module.exports = userValidateInput;
