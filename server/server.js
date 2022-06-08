const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models/index");
const app = express();
const i18 = require('i18n-iso-countries')

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  init();
});

function init(){
    const countries = i18.getSupportedLanguages()
    for (let i = 0; i < countries.length; i++) {
            if(i18.getName(countries[i].toUpperCase(),"en") !== undefined){
                db.country.create({ name: i18.getName(countries[i], 'en')})
            }
    }
    db.country.create({ name: 'Ukraine' })
}

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(
  cookieSession({
    name: "izzundali-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
