const logs = [];

module.exports = (req, res, next) => {
  const start = Date.now();
  const time = new Date().toLocaleString("ru-RU");

  console.log(`[${time}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;

    logs.push({
      time,
      event: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration} мс`,
    });

    console.log(`  → ${res.statusCode} (${duration} мс)`);
  });

  next();
};

module.exports.getLogs = () => logs;
