const path = require("path");
const sequelize = require("./config/connection.js");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helper");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Handlebars.js sets up custom helpers
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3000;

// Creates session
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Informs template engine for Express.js
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Activates routes
app.use(routes);

// Actives connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port 3000. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});