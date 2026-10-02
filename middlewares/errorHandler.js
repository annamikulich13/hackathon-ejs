exports.notFound = (req, res) => {
  res.status(404).render("404", {
    title: "404",
    message: "Страница не найдена",
    user: req.user,
  });
};

exports.serverError = (err, req, res, next) => {
  console.error("❌ Ошибка:", err.message);
  console.error(err.stack);

  res.status(500).render("500", {
    title: "500",
    message: "Внутренняя ошибка сервера",
    user: req.user,
  });
};
