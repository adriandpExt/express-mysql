import connection from "./index.js";

const User = {
  getAllUsers: async () => {
    // Return a promise to execute the SQL query
    try {
      return await connection.promise().execute("SELECT * FROM tbl_users");
    } catch (err) {
      throw err.message;
    }
  },

  userByIdGet: async (id) => {
    try {
      const [user] = await connection
        .promise()
        .execute(`SELECT * FROM tbl_users WHERE user_id = ?`, [id]);
      return user;
    } catch (err) {
      throw err.message;
    }
  },

  userPost: async (userData) => {
    return await connection
      .promise()
      .execute(
        "INSERT INTO tbl_users (firstname, lastname, address, username, password) VALUES (?, ?, ?, ?, ?)",
        [
          userData.firstname,
          userData.lastname,
          userData.address,
          userData.username,
          userData.password,
        ]
      );
  },

  updateByIduser: async (id, userData) => {
    const { firstname, lastname, address, username } = userData;

    return await connection
      .promise()
      .execute(
        `UPDATE tbl_users SET firstname = ?, lastname = ?, address = ?, username = ? WHERE user_id = ?`,
        [firstname, lastname, address, username, id]
      );
  },

  userDelete: async (id) => {
    const [user] = await connection
      .promise()
      .execute(`DELETE FROM tbl_users WHERE user_id = ?`, [id]);
    return user;
  },
};

export default User;
