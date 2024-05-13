import jwt from "jsonwebtoken";

import Auth from "../model/auth.js";

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Call the loginUser method from Auth object
    const { user, password: hashedPassword } = await Auth.loginUser(username);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare passwords
    const passwordMatch = await Auth.comparePasswords(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ error: `Database ${err.message}` });
  }
};
