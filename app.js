const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./passport")
require("./db")
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(passport.initialize());

app.use(require("./routes/apiRoutes"))
app.use(require("./routes/userRoutes"))
app.use(require("./routes/adminRoutes"))
app.use(require("./routes/libraryRoutes"))

module.exports = app;