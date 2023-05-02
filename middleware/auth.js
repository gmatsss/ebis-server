const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;

  //if there is no token the request will not authorize
  if (!accessToken) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  let payload;
  try {
    //verify the token
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req._id = payload._id;

    //to run the next function
    next();
  } catch (e) {
    //unauthorized error
    return res.status(403).json({ error: "unauthorized" });
  }
};
