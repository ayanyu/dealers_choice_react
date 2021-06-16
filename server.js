const path = require("path");
const express = require("express");
const app = express();
const volleyball = require("volleyball");
const PORT = 3001;

const {
  syncAndSeed,
  models: { Child, Toy },
} = require("./db");

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/children", async (req, res) => {
  res.send(await Child.findAll({}));
});

app.get("/children/:id", async (req, res) => {
  res.send(
    await Child.findByPk(req.params.id)
  );
});
app.delete("/children/:id", async (req, res, next) => {
  try {
    const remove = await Child.findByPk(req.params.id);
    if (!remove) {
      res.sendStatus(404);
    }
    await remove.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const add = await User.create({ name: req.body.name });
    res.status(201).send(add);
  } catch (err) {
    res.sendStatus(409);
  }
});

const runIt = async () => {
  await syncAndSeed();
  const port = 3001;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

runIt();