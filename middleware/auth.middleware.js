const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "roshan");

      if (decoded) {
          console.log(decoded)
        req.body.userID = decoded.userId;
        req.body.user = decoded.username;
        next();
       } else {
        res.json({ msg: "not Authorized" });
      }
    } catch (error) {
      res.send({ msg: error.message });
    }
  } else {
    res.json({ msg: "Please login!!" });
  }
};

module.exports = { authentication };
