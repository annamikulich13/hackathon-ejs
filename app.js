const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const logger = require("./middlewares/logger");
const authMiddleware = require("./middlewares/auth");
const requireAuth = require("./middlewares/requireAuth");
const { notFound, serverError } = require("./middlewares/errorHandler");
app.use(logger);
app.use(authMiddleware);

const items = [
  {
    id: 1,
    title: "Минск AI Hack 2026",
    description:
      "Республиканский хакатон по искусственному интеллекту. Направления: компьютерное зрение, обработка естественного языка, рекомендательные системы. Команды до 5 человек.",
    date: "15 мая 2026",
    prize: "15 000 BYN",
  },
  {
    id: 2,
    title: "BelWeb Challenge",
    description:
      "Соревнование по веб-разработке для студентов и молодых специалистов. Задачи: SPA, REST API, интеграция с внешними сервисами. Длительность — 48 часов.",
    date: "20 июня 2026",
    prize: "10 000 BYN",
  },
  {
    id: 3,
    title: "Mobile Dev Cup",
    description:
      "Хакатон по мобильной разработке под iOS и Android. Приветствуются решения на React Native и Flutter. Судейство — представители IT-компаний Беларуси.",
    date: "10 июля 2026",
    prize: "8 000 BYN",
  },
  {
    id: 4,
    title: "Smart City BSU",
    description:
      "Хакатон по урбанистике и умным городам. Организатор — БГУ совместно с Мингорисполкомом. Кейсы: транспорт, экология, городские сервисы.",
    date: "5 августа 2026",
    prize: "12 000 BYN",
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
    items,
    user: req.user,
  });
});

app.get("/item/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return next();
  }

  res.render("item", {
    title: item.title,
    item,
    user: req.user,
  });
});

app.get("/add", requireAuth, (req, res) => {
  res.render("add", {
    title: "Добавить хакатон",
    user: req.user,
  });
});

app.post("/add", requireAuth, (req, res) => {
  const { title, description, date, prize } = req.body;

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    title,
    description,
    date,
    prize: prize || "Не указан",
  };

  items.push(newItem);
  res.redirect("/");
});

// Страница просмотра логов
app.get("/logs", (req, res) => {
  res.render("logs", {
    title: "Журнал запросов",
    logs: logger.getLogs(),
    user: req.user,
  });
});

app.use(notFound);

app.use(serverError);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
