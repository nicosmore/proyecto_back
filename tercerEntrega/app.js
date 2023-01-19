const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const apiRoutes = require("./routers/app.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const env = require("./env.config");
const dbConfig = require("./DB/db.config");
const passport = require("./middlewares/passport");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

app.use(
  session({
    name: "coder-session",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.connectTo("ProyectoEntrega3"),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials"),
  })
);
app.set("views", "./views/layouts");
app.set("view engine", "hbs");

app.use("/api", apiRoutes);
app.use(errorMiddleware);

module.exports = app;
