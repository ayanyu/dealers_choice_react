const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/toyfundraiser", {logging: false});

const children = [
  "Bob",
  "Lee",
  "Samantha",
  "Amy",
];

const toys = [
  "Pokemon",
  "Bayblade",
  "Furby",
  "HitClips",
];

const Child = db.define("child", {
  name: {
    type: STRING,
    allowNull: false,
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  Toy: {
    type: STRING,
  },
});

const Toy = db.define("toy", {
  name: {
    type: STRING,
    allowNull: false,
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
});

Child.hasMany(Toy);
Toy.belongsTo(Child);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [Bob, Lee, Samantha, Amy] =
    await Promise.all(children.map((name) => Child.create({ name })));

  const [Pokemon, Bayblade, Furby, HitClips] =
    await Promise.all(toys.map((name) => Toy.create({ name })));


  Bob.toy = "Pokemon";
  Lee.toy = "Bayblade";
  Samantha.toy = "Furby";
  Amy.toy = "HitClips";
  await Promise.all([
    Bob.save(),
    Lee.save(),
    Samantha.save(),
    Amy.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    Child,
    Toy,
  },
};