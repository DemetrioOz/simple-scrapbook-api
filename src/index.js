/// dependencies
const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

app.use(express.json());

// array DB
const scraps = [
  {
    nome: "teste",
    mensagem: "teste",
  },
];
// routes
app.get("/", (req, res) => {
  return scraps;
});

/// server port
const port = 3333;
app.listen(port, () => {
  console.log(`server running in localhost:${port}`);
});
