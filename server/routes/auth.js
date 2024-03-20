const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }).withMessage("Not a valid name"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Not a valid password"),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
      return  res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
       return res.status(500).send("Error occured");
    }
  }
);

module.exports = router;
