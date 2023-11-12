const router = require("express").Router();
const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All input is required");
    }

    // Check if user already exists
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Create user in your database
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password, // the password will be hashed by the pre-save hook
    });

    // Save the user object to the database
    await user.save();

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h", // token will expire in 2 hours
      }
    );

    // Return new user with token
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h", // token will expire in 2 hours
        }
      );

      // save user token
      user.tokens = user.tokens.concat({ token });
      await user.save();

      // user
      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
