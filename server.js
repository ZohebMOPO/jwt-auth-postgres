const express = require("express");
const cors = require("cors");
const db = require("./auth/models");
const app = express();
const Role = db.role;
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db");
  intial();
});
app.get("/", function (req, res) {
  res.json({ Yo: "Hehe" });
});

require("./auth/routes/auth.routes")(app);
require("./auth/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

function intial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
