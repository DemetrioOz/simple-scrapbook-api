/// dependencies
const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

app.use(express.json());

// array DB
const scraps = [
  {
    name: "teste",
    message: "teste",
  },
];
// routes
app.get("/", (req, res) => {
  return scraps;
});

app.get("/:name", (req, res) => {
  const { name } = req.params;

  const scrapIndex = scraps.findIndex((scrap) => scrap.name == name);

  return scraps[scrapIndex];
});

app.post("/", (req, res) => {
  const { title, owner } = request.body;
  const scraps = { id: uuid(), title, owner };

  scraps.push(project);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  const { title, owner } = req.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return response.status(400).json({ error: "Scrap not found." });
  }
});

/// server port
const port = 3333;
app.listen(port, () => {
  console.log(`server running in localhost:${port}`);
});
