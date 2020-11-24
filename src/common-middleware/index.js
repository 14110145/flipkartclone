exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userID = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userID;
  next();
};