/// dependencies
const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

app.use(express.json());

// array DB
const scraps = [];
// routes
app.get("/", (req, res) => {
  const { name } = req.query;

  const results = name
    ? scraps.filter((scrap) => scrap.name.includes(name))
    : scraps;

  return res.json(results);
});

app.post("/", (req, res) => {
  const { name, message } = req.body;
  const scrap = { id: uuid(), name, message };

  scraps.push(scrap);

  return res.json(scrap);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  const { name, message } = req.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return res.status(400).json({ error: "Scrap not found." });
  }

  const scrap = { id, name, message };

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

/// server port
const port = 3333;
app.listen(port, () => {
  console.log(`server running in localhost:${port}`);
});
