// Server config Primary
const express = require("express");
const { addAbortSignal } = require("stream");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log("Server is running ✅");
});

// Games
const games = [];

// Routes
app.get("/games", (request, response) => {
  return response.json(games);
});

// Route Post
app.post("/games", (request, response) => {
  const { title, gender, owner } = request.body;
  const game = { id: uuid(), title, gender, owner };
  games.push(game);
  return response.json(game);
});
// End route post

// Rout Put
app.put("/games/:id", (request, response) => {
  const { id } = request.params;
  const { title, gender, owner } = request.body;
  const gameIndex = games.findIndex((game) => game.id === id);
  if (gameIndex < 0) {
    return response.status(400).json({ error: "Game Not Found." });
  }

  const game = {
    id,
    title,
    gender,
    owner,
  };

  games[gameIndex] = game;
  return response.json(game);
});

// End route put

//  Route Delete ===
app.delete("/games/:id", (request, response) => {
  const { id } = request.params;
  const gameIndex = games.findIndex((game) => game.id === id);
  if (gameIndex < 0) {
    return response.status(400).json({ error: "Game Not Found." });
  }

  games.splice(gameIndex, 1);
  return response.status(204).send();
});
// === End route delete
