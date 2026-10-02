module.exports = (req, res, next) => {
  if (req.query.auth === "1") {
    req.user = { name: "Админ", role: "admin" };
  } else {
    req.user = null;
  }
  next();
};
