import jwt from "jsonwebtoken";

const tokenValidation = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization; //It first checks if the token is provided in the Authorization header (case-insensitive).

  //If a token is found in the headers and it starts with "Bearer", the code splits the header to extract the token itself.
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" });
      }

      req.user = decoded;
      next();
    });
  }

  if (!token) {
    return res.status(401).json({ message: "User not authorized" });
  }
};

export default tokenValidation;
