import jwt from "jsonwebtoken";

// protecting backend routes
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // user = decoded token data
    req.user = user;
    next();
  });
}
