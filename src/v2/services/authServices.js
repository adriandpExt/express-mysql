import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Auth } from "../model/authModel.js";

export const AuthServices = {
  userServices: async (username, connection) => {
    try {
      const user = await Auth.login(username, connection);

      if (!user) {
        throw new Error("User does not exist!");
      }

      return user;
    } catch (error) {
      console.error("Error while fetching user:", error);
      throw new Error("Internal server error");
    }
  },
  passwordServices: async (password, hashPassword) => {
    if (!password) {
      throw new Error("Password cannot be empty!");
    }
    
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      console.error("Error while comparing passwords:", error);
      throw new Error("Internal server error");
    }
  },

  generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
  },
};
