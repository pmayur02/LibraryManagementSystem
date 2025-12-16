const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
};


module.exports = authMiddleware;