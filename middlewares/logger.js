module.exports = (req, res, next) => {
  const start = Date.now();
  const time = new Date().toLocaleString("ru-RU");

  console.log(`\n[${time}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`  → ${res.statusCode} (${duration} мс)`);
  });

  next();
};
