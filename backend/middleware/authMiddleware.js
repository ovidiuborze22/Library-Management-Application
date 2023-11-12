const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user by decoded user_id
    const user = await User.findOne({
      _id: decoded.user_id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error(); // will be caught by the catch block below
    }

    // Attach user to request object
    req.user = user;
    req.token = token; // token available as well

    next(); // proceed to the next middleware or route handler
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
