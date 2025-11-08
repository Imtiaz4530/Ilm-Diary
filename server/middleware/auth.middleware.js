const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized! Token Missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Not Authorized! Invalid Token" });
    }

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token Invalid or Expired" });
  }
};

module.exports = userAuth;
