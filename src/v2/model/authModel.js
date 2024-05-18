export const Auth = {
  login: (username, connection) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_users WHERE username = ?";

      connection.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            reject(new Error("User does not exist!"));
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  },
};
