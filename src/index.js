/// dependencies
const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

app.use(express.json());

// array DB
const scraps = [];
// routes
// app.get("/scraps", (req, res) => {
//   return res.json(scraps);
// });

app.get("/", (req, res) => {
  const { name } = req.query;

  const results = name
    ? scraps.filter((scrap) => scrap.name.includes(name))
    : scraps;

  return res.json(results);
});

app.post("/:id", (req, res) => {
  const { title, owner } = req.body;
  const scraps = { id: uuid(), title, owner };

  scraps.push(project);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  const { title, owner } = req.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return res.status(400).json({ error: "Scrap not found." });
  }

  const scrap = { id, title, owner };

  scraps[scrapIndex] = scrap;

  return res.json(scrap);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return res.status(400).json({ error: "Scrap not found." });
  }
});

/// server port
const port = 3333;
app.listen(port, () => {
  console.log(`server running in localhost:${port}`);
});
