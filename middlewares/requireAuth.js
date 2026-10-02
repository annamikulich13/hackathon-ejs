module.exports = (req, res, next) => {
  // Если не авторизован — редирект на главную с ?auth=1
  if (!req.user) {
    return res.redirect("/?auth=1");
  }
  next();
};
