export const contentType = (req, res, next) => {
  res.setHeader("Authorization", req.headers.authorization);
  res.setHeader("Content-Type", req.headers.contentType);
  next();
};
