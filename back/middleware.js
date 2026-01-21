const jwt = require("jsonwebtoken");
function Middleware(req, res, next) {
  const token = req?.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, "tushar1234", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.id;
    next();
    console.log(decoded);
  });
  res.cookie('name','tushar',{httpOnly:true});
  
}
module.exports = Middleware;