import connection from "../../config/db.js";

import { AuthServices } from "../services/authServices.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required." });
  }

  try {
    const user = await AuthServices.userServices(username, connection);

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const passwordMatch = await AuthServices.passwordServices(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const accessToken = AuthServices.generateAccessToken(user);

    return res.status(200).json({
      message: "Successfully logged in",
      username: user.username,
      id: user.id,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
