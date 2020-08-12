/// dependencies
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { uuid, isUuid } = require("uuidv4");
const { response } = require("express");

app.use(cors());
app.use(express.json());

// array DB
const scraps = [];

// middlewares

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateScrapId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: `Param sent is not a valid UUid` });
  }
  next();
}

function validateScrapInfo(req, res, next) {
  const { title, message } = req.body;

  if (title !== "" && message !== "") {
    next();
  } else {
    return res.status(400).json({ error: `Scrap sent is empty` });
  }
}

app.use(logRequests);
app.use("/:id", validateScrapId);

// routes
app.get("/", (req, res) => {
  const { title } = req.query;

  const results = title
    ? scraps.filter((scrap) => scrap.title.includes(title))
    : scraps;

  return res.json(results);
});

app.post("/", validateScrapInfo, (req, res) => {
  const { title, message } = req.body;
  const scrap = { id: uuid(), title, message };

  scraps.push(scrap);

  return res.json(scrap);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  const { title, message } = req.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return res.status(400).json({ error: "Scrap not found." });
  }

  const scrap = { id, title, message };

  scraps[scrapIndex] = scrap;

  return res.json(scrap);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return res.status(400).json({ error: "Scrap not found." });
  }

  scraps.splice(scrapIndex, 1);

  return res.status(204).send();
});

/// port
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`server running in localhost:${port}`);
});

// process.env.DB_PASSWORD
