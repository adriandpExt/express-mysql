import bcrypt from "bcrypt";
import connection from "./index.js";

const Auth = {
  loginUser: async (username) => {
    try {
      const [rows] = await connection
        .promise()
        .execute(`SELECT * FROM tbl_users WHERE username = ?`, [username]);
      // Extract user's password from the database result
      const user = rows.length > 0 ? rows[0] : null;
      const password = user ? user.password : null;
      return { user, password };
    } catch (err) {
      throw err.message;
    }
  },

  comparePasswords: async (password, hashedPassword) => {
    try {
      // Compare the provided password with the hashed password stored in the database
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      throw err.message;
    }
  },
};

export default Auth;
